import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, CheckCircle, Clock, Download, Printer, Check, X, Bell, RefreshCw, TrendingUp, FileText, User, LogOut, Shield, Database, Activity, Zap, ChevronRight, LayoutGrid, ShieldAlert } from 'lucide-react';
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
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [newOrderAlert, setNewOrderAlert] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const audioRef = useRef(null);
    const prevOrdersRef = useRef(orders.length);

    useEffect(() => {
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    }, []);

    useEffect(() => {
        setLastUpdated(new Date());
        const prevCount = prevOrdersRef.current;
        if (orders.length > prevCount) {
            const latest = orders[0];
            setNewOrderAlert(`NEW PRODUCTION REQUEST: #${latest.otp}`);
            if (audioRef.current) {
                audioRef.current.play().catch(() => {});
            }
            setTimeout(() => setNewOrderAlert(null), 5000);
        }
        prevOrdersRef.current = orders.length;
    }, [orders]);

    const handleVerify = (e) => {
        e.preventDefault();
        if (otpInput.length < 4) return;
        const matchingOrder = orders.find(o => o.otp === otpInput && o.status !== 'collected');
        if (matchingOrder) {
            setVerificationResult({ success: true, message: `AUTHORIZED: #${matchingOrder.id.slice(0,4)}`, orderId: matchingOrder.id });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'DENIED: INVALID OTP' });
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
        <div className="min-h-screen bg-white text-black font-sans transition-colors duration-500 overflow-x-hidden">
            
            {/* Header */}
            <header className="sticky top-0 z-50 glass-morphism border-b border-black/5 px-6 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center font-black text-white shadow-xl rotate-3">V</div>
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-2">
                                <h1 className="font-black text-lg tracking-tighter uppercase">OPERATIONS CONTROL<span className="text-orange-500">.</span></h1>
                                <span className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">System Live</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/database" target="_blank" className="p-3 rounded-2xl hover:bg-neutral-50 transition-all text-neutral-400 hover:text-orange-500 border border-transparent hover:border-black/5">
                             <Database size={20} />
                        </Link>
                        <button onClick={() => window.location.reload()} className="p-3 rounded-2xl hover:bg-neutral-50 transition-all text-neutral-400 hover:text-green-500 border border-transparent hover:border-black/5">
                             <RefreshCw size={20} />
                        </button>
                        <div className="w-px h-8 bg-black/5 mx-2" />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/20">
                           <LogOut size={16} />
                           TERMINATE
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Security & Analytics */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* OTP Terminal */}
                        <div className="bg-white p-10 rounded-[48px] border border-black/5 shadow-premium">
                             <div className="flex items-center justify-between mb-10">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">Terminal Authorization</h2>
                                <Shield size={20} className="text-orange-500" />
                             </div>

                             <form onSubmit={handleVerify} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-neutral-400 ml-1 uppercase tracking-[0.2em]">Enter Production OTP</label>
                                    <input
                                        type="text"
                                        placeholder="0000"
                                        value={otpInput}
                                        onChange={(e) => setOtpInput(e.target.value)}
                                        maxLength={4}
                                        className="w-full bg-neutral-50 border border-transparent rounded-[32px] py-12 text-center text-6xl font-black tracking-[0.2em] focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/20 transition-all placeholder:text-neutral-200 text-black"
                                    />
                                </div>

                                <AnimatePresence>
                                    {verificationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className={clsx(
                                                "p-6 rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 border",
                                                verificationResult.success ? "bg-green-500/5 text-green-500 border-green-500/20" : "bg-red-500/5 text-red-500 border-red-500/20"
                                            )}
                                        >
                                            {verificationResult.success ? <CheckCircle size={18} /> : <ShieldAlert size={18} />}
                                            {verificationResult.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={otpInput.length !== 4}
                                    className="w-full bg-black text-white font-black py-6 rounded-[28px] uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 shadow-2xl"
                                >
                                    Execute Access
                                </button>
                             </form>
                        </div>

                        {/* Bento Stats */}
                        <div className="grid grid-cols-1 gap-4">
                            <StatCard label="Total Revenue" value={`₹${totalEarnings}`} icon={<Zap size={20} />} color="bg-orange-500" />
                            <StatCard label="Active Queue" value={queueOrders.length} icon={<Clock size={20} />} color="bg-black" />
                            <StatCard label="Completed" value={completedOrders.length} icon={<CheckCircle size={20} />} color="bg-neutral-400" />
                        </div>
                    </div>

                    {/* Production Queue */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[56px] border border-black/5 shadow-premium flex flex-col h-full overflow-hidden">
                            
                            {/* Toolbar */}
                            <div className="px-10 py-8 flex items-center justify-between border-b border-black/5">
                                <div className="flex gap-10">
                                    <Tab active={activeTab === 'queue'} onClick={() => { setActiveTab('queue'); setSearchQuery(''); }}>
                                        ACTIVE QUEUE 
                                        {queueOrders.length > 0 && <span className="ml-3 px-2.5 py-0.5 bg-orange-500 text-white text-[9px] font-black rounded-full">{queueOrders.length}</span>}
                                    </Tab>
                                    <Tab active={activeTab === 'completed'} onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}>
                                        ARCHIVE
                                    </Tab>
                                </div>

                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-black transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH IDS..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-neutral-50 border border-transparent rounded-[20px] pl-12 pr-6 py-4 text-[10px] font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-black/5 transition-all w-48 focus:w-64"
                                    />
                                </div>
                            </div>

                            {/* List Module */}
                            <div className="flex-1 p-8 md:p-10 overflow-y-auto custom-scrollbar min-h-[600px] bg-neutral-50/30">
                                <AnimatePresence mode='popLayout'>
                                    {displayedOrders.length === 0 ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
                                            <div className="w-24 h-24 bg-white border border-black/5 rounded-[40px] flex items-center justify-center mb-6 text-neutral-200 shadow-sm">
                                                <LayoutGrid size={32} />
                                            </div>
                                            <h3 className="text-2xl font-black uppercase tracking-tight text-black">QUEUE VACANT</h3>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mt-2">Standing by for production requests</p>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-6">
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

            {/* Alert System */}
            <AnimatePresence>
                {newOrderAlert && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        className="fixed bottom-10 right-10 z-[100] bg-black text-white pl-8 pr-10 py-6 rounded-[32px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] flex items-center gap-5 border border-white/10"
                    >
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white animate-pulse shadow-lg shadow-orange-500/40">
                            <Bell size={24} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1">Incoming Transaction</span>
                            <span className="text-xs font-black uppercase tracking-widest">{newOrderAlert}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className="bg-white p-8 rounded-[40px] border border-black/5 flex items-center justify-between group shadow-sm hover:shadow-premium transition-all">
            <div className="flex items-center gap-5">
                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-110 shadow-lg", color)}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] leading-none mb-2">{label}</p>
                    <p className="text-3xl font-black tracking-tighter uppercase leading-none text-black">{value}</p>
                </div>
            </div>
            <ChevronRight size={18} className="text-neutral-200 group-hover:translate-x-1 transition-transform" />
        </div>
    );
}

function Tab({ children, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "pb-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative border-b-2",
                active ? "text-black border-orange-500" : "text-neutral-300 border-transparent hover:text-black"
            )}
        >
            {children}
        </button>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white p-8 rounded-[40px] border border-black/5 shadow-premium relative overflow-hidden"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                <div className="flex items-start gap-6">
                    <div className={clsx("w-20 h-20 rounded-[32px] flex flex-col items-center justify-center font-black transition-all group-hover:scale-105 shadow-xl",
                        order.status === 'paid' ? "bg-orange-500 text-white" :
                        order.status === 'printed' ? "bg-black text-white" : "bg-neutral-100 text-neutral-400"
                    )}>
                        <span className="text-3xl tracking-tighter leading-none">{order.otp}</span>
                        <span className="text-[8px] uppercase tracking-[0.4em] mt-1.5 opacity-60">OTP</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-black text-lg tracking-tighter uppercase text-black">BATCH #{order.id.slice(0,8)}</h3>
                            <div className="px-3 py-1 bg-neutral-50 rounded-lg flex items-center gap-2 border border-black/5">
                                <User size={12} className="text-neutral-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{order.userEmail?.split('@')[0] || 'GUEST'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-orange-500" />
                                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="w-1.5 h-1.5 bg-neutral-200 rounded-full" />
                            <div className="text-orange-600">₹{order.totalAmount} PAYABLE</div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {order.files.map((file, i) => (
                                <div key={i} className="flex items-center gap-2 bg-neutral-50 border border-black/5 px-4 py-2 rounded-2xl text-neutral-500 text-[10px] font-black uppercase tracking-tight">
                                    <FileText size={12} className="text-orange-500" />
                                    {file.name.slice(0, 15)}...
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDownloadAll}
                        className="p-5 rounded-[24px] bg-neutral-50 hover:bg-black hover:text-white transition-all text-neutral-400 border border-black/5 shadow-sm"
                    >
                        <Download size={24} />
                    </button>

                    {order.status === 'paid' && (
                        <button onClick={onPrint} className="flex-1 md:flex-none px-10 py-5 rounded-[24px] bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-2xl">
                            INITIALIZE PRINT
                        </button>
                    )}
                    {order.status === 'printed' && (
                        <button onClick={onCollect} className="flex-1 md:flex-none px-10 py-5 rounded-[24px] bg-orange-500 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/20">
                            CONFIRM DELIVERY
                        </button>
                    )}
                    {order.status === 'collected' && (
                        <div className="px-10 py-5 rounded-[24px] bg-green-500/10 text-green-600 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 border border-green-500/20">
                            <CheckCircle size={18} /> ARCHIVED
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
