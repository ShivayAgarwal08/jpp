import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getApiUrl } from '../config';
import { getPdfPageCount } from '../utils/pdfUtils';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    // Order Creation State
    const [currentOrder, setCurrentOrder] = useState({
        files: [],
        settings: {
            copies: 1,
            color: false, // false = B/W, true = Color
            doubleSided: false,
        },
        status: 'draft',
    });

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // FETCH ORDERS (Polling)
    const fetchOrders = async () => {
        try {
            // Filter by userId if user is logged in (handled by server query param)
            let url = getApiUrl('api/orders');
            if (user && user.role !== 'vendor') {
                url += `?userId=${user.id}`;
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error(res.statusText);

            // Check content type to avoid JSON parse errors on 404 HTML responses
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.warn("Backend not returning JSON. Is the server running?");
                return;
            }

            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    // Initial Fetch & Polling
    useEffect(() => {
        fetchOrders();

        // Poll every 3 seconds for "Live" dashboard feeling
        const interval = setInterval(fetchOrders, 3000);
        return () => clearInterval(interval);
    }, [user]); // Re-run if user changes

    const addFile = async (file) => {
        // Validation: No Videos
        if (file.type.startsWith('video/')) {
            alert("Video files are not supported. Please upload Images (JPG, PNG) or PDFs.");
            return;
        }

        if (file.type.startsWith('video/')) {
            alert("Video files are not supported. Please upload Images (JPG, PNG) or PDFs.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const fileObj = {
                id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                name: file.name,
                type: file.type,
                size: file.size,
                previewUrl: null, // Could use reader.result for preview too
                dataVal: reader.result, // Base64 Data URL
                pageCount: file.type === 'application/pdf' ? 0 : 1, // 0 = Scanning, 1 = Default for images
                timestamp: Date.now()
            };

            setCurrentOrder(prev => ({
                ...prev,
                files: [...prev.files, fileObj]
            }));

            // Perform async processing for PDFs
            if (file.type === 'application/pdf') {
                // Timeout wrapper for PDF counting
                const countPromise = getPdfPageCount(file);
                const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(1), 3000)); // Default to 1 after 3s

                Promise.race([countPromise, timeoutPromise]).then(count => {
                    updateFilePageCount(fileObj.id, count);
                }).catch(() => {
                    updateFilePageCount(fileObj.id, 1);
                });
            }
        };
        reader.onerror = () => {
            console.error("Failed to read file");
            alert("Failed to read file.");
        };
        reader.readAsDataURL(file);
    };

    const addStationeryItem = (item) => {
        const itemObj = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            name: item.name,
            type: 'stationery',
            price: item.price,
            size: 0,
            timestamp: Date.now()
        };
        setCurrentOrder(prev => ({
            ...prev,
            files: [...prev.files, itemObj]
        }));
    };

    const removeFile = (fileId) => {
        setCurrentOrder(prev => ({
            ...prev,
            files: prev.files.filter(f => f.id !== fileId)
        }));
    };

    const updateFilePageCount = (fileId, count) => {
        setCurrentOrder(prev => ({
            ...prev,
            files: prev.files.map(f => f.id === fileId ? { ...f, pageCount: Math.max(1, parseInt(count) || 1) } : f)
        }));
    };

    const updateSettings = (key, value) => {
        setCurrentOrder(prev => ({
            ...prev,
            settings: { ...prev.settings, [key]: value }
        }));
    };

    const placeOrder = async (totalAmount) => {
        setIsProcessingPayment(true);

        const filesData = currentOrder.files.map(f => ({
            name: f.name,
            size: f.size,
            type: f.type,
            pageCount: f.pageCount,
            dataVal: f.dataVal // Send the actual content
        }));

        const orderData = {
            userId: user?.id,
            userEmail: user?.email,
            files: filesData,
            settings: currentOrder.settings,
            totalAmount: totalAmount || 0,
            // OTP is generated on Server Side
        };

        try {
            console.log("Sending Order Data:", orderData);

            const response = await fetch(getApiUrl('api/orders'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                // Check if we are accidentally hitting the frontend (HTML response)
                console.error("Received non-JSON response:", text.substring(0, 100));
                throw new Error("Backend connection failed. Please check if VITE_API_URL is set in Vercel settings. The React app is serving HTML instead of reaching the API.");
            }

            const result = await response.json();

            if (response.ok) {
                // Clear order on success
                // Optimistically add to list
                setOrders(prev => [result, ...prev]);

                setCurrentOrder({ files: [], settings: { copies: 1, color: false, doubleSided: false } });
                setIsProcessingPayment(false);
                return { success: true, otp: result.otp };
            } else {
                throw new Error(result.error || "Order failed");
            }
        } catch (err) {
            console.error("Place Order Error:", err);
            setIsProcessingPayment(false);
            throw err;
        }
    };

    const calculateTotal = () => {
        let total = 0;
        const printFiles = currentOrder.files.filter(f => f.type !== 'stationery');
        if (printFiles.length > 0) {
            const baseRate = currentOrder.settings.color ? 10 : 2;
            // Total = (Sum of all pages across all files) * Copies * Rate
            const totalPages = printFiles.reduce((acc, file) => acc + (file.pageCount || 1), 0);
            total += totalPages * currentOrder.settings.copies * baseRate;
        }
        const stationeryItems = currentOrder.files.filter(f => f.type === 'stationery');
        stationeryItems.forEach(item => {
            total += (item.price || 0);
        });
        return total;
    };

    // Vendor Actions
    const verifyOrderOtp = (orderId, otpInput) => {
        // Verification is just checking local list (which is synced via polling)
        const order = orders.find(o => o.id === orderId);
        if (!order) return { success: false, message: 'Order not found' };
        if (order.otp === otpInput) {
            return { success: true, order };
        }
        return { success: false, message: 'Invalid OTP' };
    };

    const markAsPrinted = async (orderId) => {
        // Optimistic UI update
        const updated = orders.map(o => o.id === orderId ? { ...o, status: 'printed' } : o);
        setOrders(updated);

        await fetch(getApiUrl(`api/orders/${orderId}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'printed' })
        });
    };

    const markAsCollected = async (orderId) => {
        const updated = orders.map(o => o.id === orderId ? { ...o, status: 'collected' } : o);
        setOrders(updated);

        await fetch(getApiUrl(`api/orders/${orderId}`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'collected' })
        });
    };

    return (
        <OrderContext.Provider value={{
            orders,
            currentOrder,
            addFile,
            addStationeryItem,
            removeFile,
            updateFilePageCount,
            updateSettings,
            placeOrder,
            calculateTotal,
            verifyOrderOtp,
            markAsPrinted,
            markAsCollected,
            isProcessingPayment
        }}>
            {children}
        </OrderContext.Provider>
    );
};
