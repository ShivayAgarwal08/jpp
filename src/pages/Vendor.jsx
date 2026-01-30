import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, CheckCircle, Clock, Download, Printer, Check, X, Bell, RefreshCw, TrendingUp, FileText, User, LogOut, Shield, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Vendor() {
    const { orders: ordersList, verifyOrderOtp, markAsPrinted, markAsCollected } = useOrder();
    const orders = ordersList || []; // Prevent crash if undefined
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('queue'); // queue, completed
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [newOrderAlert, setNewOrderAlert] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // Search State
    const audioRef = useRef(null);

    // Track previous orders to detect new ones
    const prevOrdersRef = useRef(orders.length);

    useEffect(() => {
        // Init audio
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // Simple ding sound
    }, []);

    useEffect(() => {
        setLastUpdated(new Date());

        const prevCount = prevOrdersRef.current;
        if (orders.length > prevCount) {
            // New Order Detected!
            const latest = orders[0]; // Assuming sorted DESC
            setNewOrderAlert(`New Order Received! #${latest.otp}`);

            // Play Sound
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed first):", e));
            }

            // Clear alert after 5s
            setTimeout(() => setNewOrderAlert(null), 5000);
        }
        prevOrdersRef.current = orders.length;
    }, [orders]);

    const handleVerify = (e) => {
        e.preventDefault();
        if (otpInput.length < 4) return;

        const matchingOrder = orders.find(o => o.otp === otpInput && o.status !== 'collected');

        if (matchingOrder) {
            setVerificationResult({ success: true, message: `Verified #${matchingOrder.id}!`, orderId: matchingOrder.id });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'Invalid OTP' });
            setTimeout(() => setVerificationResult(null), 2000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const queueOrders = orders.filter(o => o.status === 'paid' || o.status === 'printed');
    const completedOrders = orders.filter(o => o.status === 'collected');

    // Filter logic: If searching, search ALL orders. Else use tabs.
    const displayedOrders = searchQuery
        ? orders.filter(o =>
            o.otp.includes(searchQuery) ||
            o.id.includes(searchQuery) ||
            (o.userEmail && o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : (activeTab === 'queue' ? queueOrders : completedOrders);

    // Stats Check
    const totalEarnings = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const pendingOrdersCount = queueOrders.length;
    const completedOrdersCount = completedOrders.length;

    // Protection Logic
    const { user } = useAuth();
    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            navigate('/vendor-login');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'vendor') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <Shield size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-500 mb-6 max-w-md">
                    You do not have permission to view the Vendor Dashboard. Please log in with an Administrator account.
                </p>
                <Link to="/vendor-login" className="px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
                    Go to Vendor Login
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 selection:bg-orange-500 selection:text-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30 shadow-sm/50 backdrop-blur-md bg-white/80">
                <div className="container mx-auto max-w-5xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                            <Shield size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-lg leading-tight tracking-tight">JPRINT Admin v5.1<span className="text-orange-500">.</span></h1>
                                <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" /> Live
                                </span>
                                <span className="text-[10px] text-gray-400 font-mono ml-2">
                                    {lastUpdated.toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">JIIT SECTOR 128 • LOGGED IN</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/database" target="_blank" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-blue-600" title="Open Database View">
                            <Database size={20} />
                        </Link>
                        <button onClick={() => { fetchOrders && fetchOrders(); window.location.reload(); }} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-green-600" title="Force Refresh">
                            <RefreshCw size={20} />
                        </button>
                        <button onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-red-600">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* New Order Alert Toast */}
            <AnimatePresence>
                {newOrderAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 20 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-bold border border-gray-800"
                    >
                        <Bell className="animate-bounce text-orange-500" />
                        {newOrderAlert}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto max-w-5xl p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* OTP Verifier - Main Focus */}
                    <div className="md:col-span-1 bg-black text-white rounded-3xl p-6 shadow-xl shadow-black/10 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-lg font-bold mb-1">Verify Order</h2>
                            <p className="text-white/50 text-xs mb-6 font-medium">Enter 4-digit student code</p>

                            <form onSubmit={handleVerify}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="0 0 0 0"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value)}
                                        maxLength={4}
                                        className="w-full bg-white/10 border border-white/10 rounded-2xl py-4 px-4 text-center text-3xl font-mono tracking-[0.4em] focus:outline-none focus:bg-white/20 transition-all font-bold placeholder:text-white/20"
                                    />
                                </div>

                                <AnimatePresence>
                                    {verificationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            className={clsx(
                                                "p-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm",
                                                verificationResult.success ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                            )}
                                        >
                                            {verificationResult.success ? <CheckCircle size={16} /> : <X size={16} />}
                                            {verificationResult.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={otpInput.length !== 4}
                                    className="w-full mt-4 bg-white text-black font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    Verify
                                </button>
                            </form>
                        </div>
                        {/* Abstract blobs */}
                        <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-2 grid grid-cols-3 gap-4">
                        <StatCard label="Total Earnings" value={`₹${totalEarnings}`} icon={<TrendingUp size={24} />} color="bg-green-50 text-green-600" />
                        <StatCard label="In Queue" value={pendingOrdersCount} icon={<Clock size={24} />} color="bg-orange-50 text-orange-600" />
                        <StatCard label="Completed" value={completedOrdersCount} icon={<CheckCircle size={24} />} color="bg-blue-50 text-blue-600" />

                        {/* Quick Actions / Info */}
                        <div className="col-span-3 bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <Printer size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Printer Status</h3>
                                    <p className="text-xs text-green-600 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Online & Ready</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-gray-900 text-2xl">{orders.length}</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Total Orders</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & List */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
                    <div className="flex border-b border-gray-100 px-6 pt-2 items-center justify-between">
                        <div className="flex">
                            <TabButton active={activeTab === 'queue' && !searchQuery} onClick={() => { setActiveTab('queue'); setSearchQuery(''); }}>
                                Active Queue <span className="ml-2 bg-black text-white text-[10px] py-0.5 px-2 rounded-full">{queueOrders.length}</span>
                            </TabButton>
                            <TabButton active={activeTab === 'completed' && !searchQuery} onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}>
                                Order History
                            </TabButton>
                        </div>

                        {/* Search Input */}
                        <div className="mr-6 py-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search OTP, Name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-black/5 outline-none w-48 transition-all focus:w-64"
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50/50">
                        <AnimatePresence mode='popLayout'>
                            {displayedOrders.length === 0 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                                    <div className="w-20 h-20 bg-white border border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                        <FileText size={40} />
                                    </div>
                                    <h3 className="text-gray-900 font-bold">No orders found</h3>
                                    <p className="text-gray-400 text-sm mb-4">Waiting for new requests...</p>

                                    {/* Connection Check Hint */}
                                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        If you placed an order and don't see it, check if the Backend Server is running.
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="grid gap-4">
                                    {displayedOrders.map((order) => (
                                        <OrderCard
                                            key={order.id}
                                            order={order}
                                            onPrint={() => markAsPrinted(order.id)}
                                            onCollect={() => markAsCollected(order.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-full group hover:border-black/5 transition-colors">
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", color)}>
                {icon}
            </div>
            <div>
                <div className="text-3xl font-bold text-gray-900 leading-none mb-1 tracking-tight">{value}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</div>
            </div>
        </div>
    )
}

function TabButton({ children, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "pb-4 pt-4 px-4 font-bold text-sm transition-colors relative",
                active ? "text-black" : "text-gray-400 hover:text-gray-600"
            )}
        >
            {children}
            {active && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
        </button>
    )
}

function OrderCard({ order, onPrint, onCollect }) {
    const handleDownloadAll = () => {
        order.files.forEach(file => {
            if (file.dataVal) {
                const link = document.createElement('a');
                link.href = file.dataVal;
                link.download = file.name || `download_${Date.now()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert(`File ${file.name} is missing content.`);
            }
        });
    };

    const handleDownloadSingle = (file) => {
        if (file.dataVal) {
            const link = document.createElement('a');
            link.href = file.dataVal;
            link.download = file.name || `download_${Date.now()}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("File content missing.");
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm group hover:shadow-md transition-all"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className={clsx("w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold text-xl shrink-0 shadow-inner",
                        order.status === 'paid' ? "bg-blue-50 text-blue-600" :
                            order.status === 'printed' ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
                    )}>
                        <h4 className="text-2xl tracking-tighter leading-none">{order.otp}</h4>
                        <span className="text-[10px] uppercase font-bold opacity-50">Code</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 text-lg">Order #{order.id}</h3>
                            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <User size={10} /> {order.userEmail || 'Guest'}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-2">
                            <Clock size={12} /> {new Date(order.created_at).toLocaleString()}
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-green-600 font-bold">Paid ₹{order.totalAmount}</span>
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {order.files.map((file, i) => (
                                <div key={i} className="flex items-center gap-1.5 bg-gray-50 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium border border-gray-100 group/file">
                                    <FileText size={12} />
                                    <span className="truncate max-w-[100px]">{file.name}</span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">
                                        {(file.size / 1024 / 1024).toFixed(1)}MB
                                    </span>
                                    <button
                                        onClick={() => handleDownloadSingle(file)}
                                        className="ml-1 p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-black transition-colors"
                                        title="Download this file"
                                    >
                                        <Download size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                    <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-xs font-bold text-gray-900">{order.settings.color ? 'Color' : 'B&W'} • {order.settings.doubleSided ? 'Double' : 'Single'}</span>
                        <span className="text-xs text-gray-500 font-medium">{order.settings.copies} Copy</span>
                    </div>

                    <button
                        onClick={handleDownloadAll}
                        className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                        title="Download All Files"
                    >
                        <Download size={20} />
                    </button>

                    {order.status === 'paid' && (
                        <button onClick={onPrint} className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2 whitespace-nowrap">
                            <Printer size={18} /> Mark Printed
                        </button>
                    )}
                    {order.status === 'printed' && (
                        <button onClick={onCollect} className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2 whitespace-nowrap">
                            <Check size={18} /> Hand Over
                        </button>
                    )}
                    {order.status === 'collected' && (
                        <div className="px-6 py-3 rounded-xl bg-gray-50 text-green-600 font-bold text-sm flex items-center gap-2 border border-green-100">
                            <CheckCircle size={18} /> Completed
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
