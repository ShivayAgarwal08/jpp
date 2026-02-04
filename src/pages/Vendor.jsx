import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { Search, CheckCircle, Clock, Download, Printer, Check, X, Bell, RefreshCw, TrendingUp, FileText, User, LogOut, Shield, Database, ChevronRight, Activity, Zap } from 'lucide-react';
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
            setNewOrderAlert(`NEW ASSET RECEIVED: #${latest.otp}`);
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
            setVerificationResult({ success: true, message: `AUTHORIZED: #${matchingOrder.id}`, orderId: matchingOrder.id });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'ACCESS DENIED' });
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
        <div className="min-h-screen bg-neutral-50 dark:bg-[#050505] text-black dark:text-white font-sans transition-colors duration-500 overflow-x-hidden">
            
            {/* Command Header */}
            <header className="sticky top-0 z-50 glass-morphism border-b border-black/5 dark:border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <motion.div 
                          whileHover={{ rotate: 90 }}
                          className="w-12 h-12 bg-black dark:bg-white rounded-[16px] flex items-center justify-center shadow-2xl"
                        >
                            <Shield size={24} className="text-white dark:text-black" />
                        </motion.div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-black tracking-tighter uppercase italic">COMMAND CENTER</h1>
                                <div className="flex items-center gap-2 bg-green-500/10 px-2 py-0.5 rounded-full">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">System Live</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mt-0.5">Terminal ID: JIIT-128-VNDR</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/database" target="_blank" className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-400 hover:text-orange-500">
                            <Database size={20} />
                        </Link>
                        <button onClick={() => window.location.reload()} className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-neutral-400 hover:text-green-500">
                            <RefreshCw size={20} />
                        </button>
                        <div className="w-px h-8 bg-black/10 dark:bg-white/10 mx-2" />
                        <button onClick={handleLogout} className="flex items-center gap-3 pl-4 pr-6 py-3 bg-red-500/10 text-red-500 rounded-full font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group">
                           <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                           Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-8 space-y-12">
                
                {/* Tactical Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Stats & Verify */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Biometric Verification */}
                        <div className="glass-morphism dark:bg-white/[0.02] p-8 rounded-[48px] border border-black/5 dark:border-white/5 relative overflow-hidden group">
                           <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400">Security Gate</h2>
                                    <Zap size={16} className="text-orange-500" />
                                </div>

                                <form onSubmit={handleVerify} className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="0000"
                                            value={otpInput}
                                            onChange={(e) => setOtpInput(e.target.value)}
                                            maxLength={4}
                                            className="w-full bg-black/5 dark:bg-white/5 border border-transparent rounded-[32px] py-8 text-center text-5xl font-mono tracking-[0.5em] font-black focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all placeholder:text-neutral-200 dark:placeholder:text-neutral-800"
                                        />
                                    </div>

                                    <AnimatePresence>
                                        {verificationResult && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className={clsx(
                                                    "p-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 border",
                                                    verificationResult.success ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
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
                                        className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-[24px] uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 shadow-2xl"
                                    >
                                        Authorize Asset
                                    </button>
                                </form>
                           </div>
                           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>

                        {/* Analytic Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            <TacStatCard label="Revenue Yield" value={`₹${totalEarnings}`} icon={<TrendingUp size={20} />} trend="+12.5%" />
                            <TacStatCard label="Active Assets" value={queueOrders.length} icon={<Activity size={20} />} active />
                            <TacStatCard label="Archive Count" value={completedOrders.length} icon={<Database size={20} />} />
                        </div>
                    </div>

                    {/* Right Column: Asset Queue */}
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="glass-morphism dark:bg-white/[0.02] rounded-[48px] border border-black/5 dark:border-white/5 flex flex-col h-full overflow-hidden">
                            
                            {/* Queue Controller */}
                            <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <TacticalTab active={activeTab === 'queue'} onClick={() => { setActiveTab('queue'); setSearchQuery(''); }}>
                                        ACTIVE QUEUE
                                        <span className="ml-3 bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{queueOrders.length}</span>
                                    </TacticalTab>
                                    <TacticalTab active={activeTab === 'completed'} onClick={() => { setActiveTab('completed'); setSearchQuery(''); }}>
                                        ARCHIVE
                                    </TacticalTab>
                                </div>

                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="FILTER BY OTP..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-black/5 dark:bg-white/5 border border-transparent rounded-full pl-12 pr-6 py-3 text-[10px] font-black tracking-widest focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 transition-all w-48 focus:w-64"
                                    />
                                </div>
                            </div>

                            {/* Queue List */}
                            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                                <AnimatePresence mode='popLayout'>
                                    {displayedOrders.length === 0 ? (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
                                            <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-[32px] flex items-center justify-center mb-6 text-neutral-300 dark:text-neutral-700 border border-dashed border-neutral-200 dark:border-neutral-800">
                                                <FileText size={32} />
                                            </div>
                                            <h3 className="text-xl font-black tracking-tighter uppercase italic mb-2">Queue Empty</h3>
                                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest max-w-[200px]">Waiting for tactical printing requests</p>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-4">
                                            {displayedOrders.map((order) => (
                                                <TacticalOrderCard
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

            {/* Tactical Toast Alert */}
            <AnimatePresence>
                {newOrderAlert && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-8 right-8 z-[100] bg-orange-500 text-white pl-6 pr-8 py-5 rounded-[24px] shadow-3xl flex items-center gap-6 font-black uppercase tracking-widest text-xs border border-white/20"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="opacity-70 text-[9px]">CRITICAL NOTIFICATION</p>
                            <p>{newOrderAlert}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TacStatCard({ label, value, icon, trend, active }) {
    return (
        <div className="glass-morphism dark:bg-white/[0.02] p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex items-center justify-between group hover:border-orange-500/30 transition-colors">
            <div className="flex items-center gap-5">
                <div className={clsx("w-14 h-14 rounded-[20px] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110", 
                    active ? "bg-orange-500 text-white" : "bg-black/5 dark:bg-white/5 text-neutral-500")}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">{label}</p>
                    <p className="text-2xl font-black tracking-tighter uppercase italic leading-none">{value}</p>
                </div>
            </div>
            {trend && (
                <div className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                    {trend}
                </div>
            )}
        </div>
    );
}

function TacticalTab({ children, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "pb-4 pt-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative border-b-2",
                active ? "text-black dark:text-white border-orange-500" : "text-neutral-400 border-transparent hover:text-black dark:hover:text-white"
            )}
        >
            {children}
        </button>
    );
}

function TacticalOrderCard({ order, onPrint, onCollect }) {
    const handleDownloadAll = () => {
        order.files.forEach(file => {
            if (file.dataVal) {
                const link = document.createElement('a');
                link.href = file.dataVal;
                link.download = file.name || `download_${Date.now()}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
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
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="group relative"
        >
            <div className="glass-morphism dark:bg-white/[0.01] p-6 rounded-[32px] border border-black/5 dark:border-white/5 hover:border-orange-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-start gap-6">
                    {/* OTP Shield */}
                    <div className={clsx("w-20 h-20 rounded-[24px] flex flex-col items-center justify-center font-black shrink-0 shadow-2xl relative overflow-hidden transition-transform group-hover:scale-105",
                        order.status === 'paid' ? "bg-orange-500 text-white" :
                        order.status === 'printed' ? "bg-blue-500 text-white" : "bg-neutral-800 text-neutral-400"
                    )}>
                        <span className="text-3xl tracking-tighter italic leading-none">{order.otp}</span>
                        <span className="text-[10px] uppercase font-black opacity-60 tracking-widest mt-1">ID</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h3 className="font-black text-xl tracking-tighter uppercase italic">Asset #{order.id.slice(0,8)}</h3>
                            <div className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full flex items-center gap-2 border border-black/5 dark:border-white/5">
                                <User size={12} className="text-neutral-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{order.userEmail?.split('@')[0] || 'GUEST'}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-black text-neutral-400 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-orange-500" />
                                {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="w-1 h-1 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
                            <div className="text-green-500">₹{order.totalAmount} PAYLOAD</div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {order.files.map((file, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleDownloadSingle(file)}
                                    className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-2 rounded-2xl hover:bg-orange-500/10 hover:border-orange-500/20 transition-all text-neutral-500 hover:text-orange-500 group/file"
                                >
                                    <FileText size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">{file.name.slice(0, 12)}...</span>
                                    <Download size={12} className="opacity-0 group-hover/file:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pl-6 border-l border-black/5 dark:border-white/5">
                    <div className="hidden lg:flex flex-col items-end mr-6 space-y-1">
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Config Specs</span>
                        <div className="flex items-center gap-2">
                             <div className={clsx("px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest", order.settings.color ? "bg-red-500/10 text-red-500" : "bg-neutral-500/10 text-neutral-400")}>
                                {order.settings.color ? 'RGB' : 'MONO'}
                             </div>
                             <div className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest">
                                {order.settings.doubleSided ? 'X2' : 'X1'}
                             </div>
                        </div>
                        <span className="text-xs font-black tracking-tighter uppercase italic">{order.settings.copies} Units</span>
                    </div>

                    <button
                        onClick={handleDownloadAll}
                        className="p-4 rounded-[20px] bg-black/5 dark:bg-white/5 hover:bg-orange-500/10 hover:text-orange-500 transition-all text-neutral-400 border border-black/5 dark:border-white/5"
                        title="EXTRACT ALL"
                    >
                        <Download size={24} />
                    </button>

                    {order.status === 'paid' && (
                        <button 
                          onClick={onPrint} 
                          className="px-8 py-4 rounded-[20px] bg-orange-500 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center gap-3"
                        >
                            <Printer size={18} /> INITIALIZE PRINT
                        </button>
                    )}
                    {order.status === 'printed' && (
                        <button 
                          onClick={onCollect} 
                          className="px-8 py-4 rounded-[20px] bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3"
                        >
                            <Check size={18} /> ASSET DISPATCH
                        </button>
                    )}
                    {order.status === 'collected' && (
                        <div className="px-8 py-4 rounded-[20px] bg-green-500/10 text-green-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 border border-green-500/20">
                            <CheckCircle size={18} /> ARCHIVED
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

