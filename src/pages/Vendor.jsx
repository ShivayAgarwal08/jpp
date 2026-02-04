import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, CheckCircle, Clock, Download, Printer, Check, X, Bell, RefreshCw, FileText, User, LogOut, Shield, Database, LayoutGrid, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Vendor() {
    const { orders: ordersList, markAsPrinted, markAsCollected } = useOrder();
    const orders = ordersList || [];
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [otpInput, setOtpInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('queue');
    const [searchQuery, setSearchQuery] = useState('');
    const audioRef = useRef(null);
    const prevOrdersRef = useRef(orders.length);

    useEffect(() => {
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    }, []);

    useEffect(() => {
        const prevCount = prevOrdersRef.current;
        if (orders.length > prevCount) {
            if (audioRef.current) {
                audioRef.current.play().catch(() => {});
            }
        }
        prevOrdersRef.current = orders.length;
    }, [orders]);

    const handleVerify = (e) => {
        e.preventDefault();
        if (otpInput.length < 4) return;
        const matchingOrder = orders.find(o => o.otp === otpInput && o.status !== 'collected');
        if (matchingOrder) {
            setVerificationResult({ success: true, message: `OTP Verified: Order #${matchingOrder.id.slice(0,6).toUpperCase()}` });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'Invalid OTP. Please try again.' });
            setTimeout(() => setVerificationResult(null), 2000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const queueOrders = orders.filter(o => o.status === 'paid' || o.status === 'printed');
    const completedOrders = orders.filter(o => o.status === 'collected');

    const displayedOrders = searchQuery
        ? orders.filter(o =>
            o.otp.includes(searchQuery) ||
            o.id.includes(searchQuery) ||
            (o.userEmail && o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : (activeTab === 'queue' ? queueOrders : completedOrders);

    const totalEarnings = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            navigate('/vendor-login');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'vendor') return null;

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 px-6 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center font-bold text-white shadow-md">V</div>
                        <div className="hidden sm:block">
                            <h1 className="font-bold text-lg text-neutral-900">Vendor Dashboard</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">System Online</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/database" target="_blank" className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                             <Database size={20} />
                        </Link>
                        <button onClick={() => window.location.reload()} className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors">
                             <RefreshCw size={20} />
                        </button>
                        <div className="w-px h-6 bg-neutral-200 mx-2" />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-bold text-sm hover:bg-neutral-200 transition-all">
                           <LogOut size={16} />
                           Log Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* OTP Check */}
                        <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                             <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Verify Customer OTP</h2>
                                <Shield size={18} className="text-amber-600" />
                             </div>

                             <form onSubmit={handleVerify} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Pickup OTP Code</label>
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value)}
                                        maxLength={4}
                                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-6 text-center text-4xl font-bold tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-600/30 transition-all text-neutral-900"
                                    />
                                </div>

                                <AnimatePresence>
                                    {verificationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={clsx(
                                                "p-4 rounded-xl font-bold text-xs flex items-center justify-center gap-3 border text-center",
                                                verificationResult.success ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
                                            )}
                                        >
                                            {verificationResult.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                            {verificationResult.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={otpInput.length !== 4}
                                    className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl text-sm hover:bg-neutral-800 transition-all disabled:opacity-30 shadow-md"
                                >
                                    Verify Pickup
                                </button>
                             </form>
                        </div>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 gap-4">
                            <StatCard label="Total Revenue" value={`₹${totalEarnings}`} color="bg-amber-600" />
                            <StatCard label="Current Queue" value={queueOrders.length} color="bg-neutral-900" />
                            <StatCard label="Completed Orders" value={completedOrders.length} color="bg-neutral-400" />
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col h-full overflow-hidden">
                            
                            {/* Navbar */}
                            <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-100 gap-4">
                                <div className="flex gap-8">
                                    <button
                                        onClick={() => { setActiveTab('queue'); setSearchQuery(''); }}
                                        className={clsx("pb-6 text-sm font-bold tracking-tight transition-all relative border-b-2 -mb-6", 
                                            activeTab === 'queue' ? "text-neutral-900 border-amber-600" : "text-neutral-400 border-transparent hover:text-neutral-600")}
                                    >
                                        Active Queue
                                        {queueOrders.length > 0 && <span className="ml-2 px-2 py-0.5 bg-neutral-900 text-white text-[10px] rounded-full">{queueOrders.length}</span>}
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}
                                        className={clsx("pb-6 text-sm font-bold tracking-tight transition-all relative border-b-2 -mb-6", 
                                            activeTab === 'completed' ? "text-neutral-900 border-amber-600" : "text-neutral-400 border-transparent hover:text-neutral-600")}
                                    >
                                        Order History
                                    </button>
                                </div>

                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 w-full md:w-56"
                                    />
                                </div>
                            </div>

                            {/* List Content */}
                            <div className="flex-1 p-6 lg:p-8 overflow-y-auto custom-scrollbar min-h-[500px]">
                                <AnimatePresence mode='popLayout'>
                                    {displayedOrders.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-24 text-center">
                                            <div className="w-20 h-20 bg-neutral-50 rounded-2xl flex items-center justify-center mb-6 text-neutral-200">
                                                <LayoutGrid size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-neutral-900">No Orders Found</h3>
                                            <p className="text-sm text-neutral-400 mt-1 font-medium">Any new orders will show up here as they come in.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
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
            </main>
        </div>
    );
}

function StatCard({ label, value, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 flex items-center gap-5 shadow-sm">
            <div className={clsx("w-3 h-12 rounded-full", color)} />
            <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-2xl font-bold text-neutral-900">{value}</p>
            </div>
        </div>
    );
}

function OrderCard({ order, onPrint, onCollect }) {
    const handleDownloadAll = () => {
        order.files.forEach(file => {
            if (file.dataVal) {
                const link = document.createElement('a');
                link.href = file.dataVal;
                link.download = file.name || `asset_${Date.now()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-neutral-300 transition-all"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-5">
                    <div className={clsx("w-16 h-16 rounded-xl flex flex-col items-center justify-center font-bold text-white shadow-md",
                        order.status === 'paid' ? "bg-amber-600" :
                        order.status === 'printed' ? "bg-neutral-900" : "bg-neutral-300"
                    )}>
                        <span className="text-2xl">{order.otp}</span>
                        <span className="text-[8px] uppercase tracking-wider opacity-70">OTP</span>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-neutral-900">Order #{order.id.slice(-6).toUpperCase()}</h3>
                            <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded uppercase">
                                {order.userEmail?.split('@')[0] || 'Guest'}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                            <div className="flex items-center gap-1.5 text-amber-700">
                                <Clock size={14} />
                                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="w-1 h-1 bg-neutral-200 rounded-full" />
                            <div className="font-bold text-neutral-900">₹{order.totalAmount}</div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {order.files.map((file, i) => (
                                <div key={i} className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 px-3 py-1 rounded-lg text-neutral-500 text-[10px] font-medium">
                                    <FileText size={10} className="text-amber-600" />
                                    {file.name.length > 12 ? file.name.slice(0, 10) + '...' : file.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDownloadAll}
                        className="p-3.5 rounded-xl bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-all border border-neutral-200"
                        title="Download Document"
                    >
                        <Download size={20} />
                    </button>

                    {order.status === 'paid' && (
                        <button onClick={onPrint} className="flex-1 md:flex-none px-8 py-3.5 bg-neutral-900 text-white rounded-xl font-bold text-xs uppercase hover:bg-neutral-800 transition-all shadow-md">
                            Start Printing
                        </button>
                    )}
                    {order.status === 'printed' && (
                        <button onClick={onCollect} className="flex-1 md:flex-none px-8 py-3.5 bg-amber-600 text-white rounded-xl font-bold text-xs uppercase hover:bg-amber-700 transition-all shadow-md">
                            Ready for Pickup
                        </button>
                    )}
                    {order.status === 'collected' && (
                        <div className="px-6 py-3.5 rounded-xl bg-neutral-100 text-neutral-500 font-bold text-xs uppercase flex items-center gap-2">
                            <CheckCircle size={16} /> Completed
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
