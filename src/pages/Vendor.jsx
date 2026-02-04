import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, CheckCircle, Clock, Download, Printer, Check, X, Bell, RefreshCw, TrendingUp, FileText, User, LogOut, Shield, Database, Activity, Zap, ChevronRight, LayoutGrid } from 'lucide-react';
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
            setNewOrderAlert(`New Order Received: #${latest.otp}`);
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
            setVerificationResult({ success: true, message: `Access Authorized: #${matchingOrder.id}`, orderId: matchingOrder.id });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'Invalid Credentials' });
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
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-500 overflow-x-hidden">
            
            {/* Header */}
            <header className="sticky top-0 z-50 glass-morphism border-b border-black/5 dark:border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center font-black text-white dark:text-black shadow-xl">V</div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-bold text-lg tracking-tighter uppercase">VENDOR PANEL.</h1>
                                <span className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/database" target="_blank" className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-400 hover:text-orange-500">
                             <Database size={20} />
                        </Link>
                        <button onClick={() => window.location.reload()} className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-400 hover:text-green-500">
                             <RefreshCw size={20} />
                        </button>
                        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-2" />
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                           <LogOut size={14} />
                           Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column */}
                    <div className="lg:col-span-4 space-y-6">
                        
                        {/* OTP Verification */}
                        <div className="glass-morphism p-8 md:p-10 rounded-[48px] border border-black/5 dark:border-white/5 shadow-3xl">
                             <div className="flex items-center justify-between mb-8">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Security Access</h2>
                                <Shield size={16} className="text-orange-500" />
                             </div>

                             <form onSubmit={handleVerify} className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="0000"
                                    value={otpInput}
                                    onChange={(e) => setOtpInput(e.target.value)}
                                    maxLength={4}
                                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-[32px] py-10 text-center text-5xl font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/30 transition-all placeholder:text-neutral-200 dark:placeholder:text-neutral-800"
                                />

                                <AnimatePresence>
                                    {verificationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={clsx(
                                                "p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 border",
                                                verificationResult.success ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                                            )}
                                        >
                                            {verificationResult.success ? <CheckCircle size={14} /> : <X size={14} />}
                                            {verificationResult.message}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="submit"
                                    disabled={otpInput.length !== 4}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-[24px] uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl"
                                >
                                    Verify Code
                                </button>
                             </form>
                        </div>

                        {/* Analytic Bento */}
                        <div className="grid grid-cols-1 gap-4">
                            <StatCard label="Earnings" value={`₹${totalEarnings}`} icon={<Zap size={18} />} color="bg-orange-500" />
                            <StatCard label="Pending" value={queueOrders.length} icon={<Clock size={18} />} color="bg-blue-500" />
                            <StatCard label="Archived" value={completedOrders.length} icon={<Database size={18} />} color="bg-neutral-500" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8">
                        <div className="glass-morphism rounded-[48px] border border-black/5 dark:border-white/5 flex flex-col h-full overflow-hidden shadow-3xl">
                            
                            {/* Controller */}
                            <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                                <div className="flex gap-6">
                                    <Tab active={activeTab === 'queue'} onClick={() => { setActiveTab('queue'); setSearchQuery(''); }}>
                                        QUEUE 
                                        {queueOrders.length > 0 && <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-[8px] rounded-full">{queueOrders.length}</span>}
                                    </Tab>
                                    <Tab active={activeTab === 'completed'} onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}>
                                        ARCHIVE
                                    </Tab>
                                </div>

                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors" size={14} />
                                    <input
                                        type="text"
                                        placeholder="SEARCH..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-black/5 dark:bg-white/5 border border-transparent rounded-full pl-10 pr-6 py-2.5 text-[10px] font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all w-40 focus:w-56"
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar min-h-[500px]">
                                <AnimatePresence mode='popLayout'>
                                    {displayedOrders.length === 0 ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-3xl flex items-center justify-center mb-4 text-neutral-300 dark:text-neutral-800">
                                                <LayoutGrid size={24} />
                                            </div>
                                            <h3 className="text-xl font-black uppercase tracking-tight">No Active Assets</h3>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Waiting for production requests</p>
                                        </motion.div>
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

            {/* Notification */}
            <AnimatePresence>
                {newOrderAlert && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed bottom-8 right-8 z-[100] bg-black dark:bg-white text-white dark:text-black pl-6 pr-8 py-5 rounded-[24px] shadow-3xl flex items-center gap-4 font-black uppercase tracking-widest text-[10px] border border-white/10 dark:border-black/10"
                    >
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white animate-pulse">
                            <Bell size={16} />
                        </div>
                        {newOrderAlert}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function StatCard({ label, value, icon, color }) {
    return (
        <div className="glass-morphism p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
                <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110", color)}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                    <p className="text-2xl font-black tracking-tighter uppercase leading-none">{value}</p>
                </div>
            </div>
            <ChevronRight size={16} className="text-neutral-300 dark:text-neutral-800" />
        </div>
    );
}

function Tab({ children, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative border-b-2",
                active ? "text-black dark:text-white border-orange-500" : "text-neutral-400 border-transparent hover:text-black dark:hover:text-white"
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group glass-morphism dark:bg-white/[0.01] p-6 rounded-[32px] border border-black/5 dark:border-white/5 hover:border-orange-500/20 transition-all"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-5">
                    <div className={clsx("w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black transition-transform group-hover:scale-105 shadow-xl",
                        order.status === 'paid' ? "bg-orange-500 text-white" :
                        order.status === 'printed' ? "bg-blue-500 text-white" : "bg-neutral-800 text-neutral-400"
                    )}>
                        <span className="text-2xl tracking-tighter leading-none">{order.otp}</span>
                        <span className="text-[8px] uppercase tracking-widest mt-1 opacity-60">ID</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h3 className="font-black text-base tracking-tighter uppercase">ORDER #{order.id.slice(0,8)}</h3>
                            <div className="px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-md flex items-center gap-1.5 border border-black/5 dark:border-white/5">
                                <User size={10} className="text-neutral-400" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-500">{order.userEmail?.split('@')[0] || 'GUEST'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            <div className="flex items-center gap-1.5">
                                <Clock size={12} className="text-orange-500" />
                                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="w-1 h-1 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
                            <div className="text-green-500">₹{order.totalAmount}</div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                            {order.files.map((file, i) => (
                                <div key={i} className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-3 py-1.5 rounded-xl text-neutral-500 text-[8px] font-black uppercase tracking-widest">
                                    <FileText size={10} />
                                    {file.name.slice(0, 10)}...
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleDownloadAll}
                        className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 transition-all text-neutral-400 border border-black/5 dark:border-white/5"
                    >
                        <Download size={20} />
                    </button>

                    {order.status === 'paid' && (
                        <button onClick={onPrint} className="flex-1 px-8 py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all shadow-xl">
                            Initialize Print
                        </button>
                    )}
                    {order.status === 'printed' && (
                        <button onClick={onCollect} className="flex-1 px-8 py-4 rounded-2xl bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
                            Deliver Asset
                        </button>
                    )}
                    {order.status === 'collected' && (
                        <div className="px-8 py-4 rounded-2xl bg-green-500/10 text-green-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-green-500/20">
                            <CheckCircle size={16} /> Completed
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}


