import { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { 
    Search, 
    CheckCircle, 
    Clock, 
    Download, 
    Printer, 
    Check, 
    Bell, 
    FileText, 
    LogOut, 
    Database,
    ChevronRight,
    Zap,
    LayoutDashboard,
    Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Vendor() {
    const { orders: ordersList, markAsPrinted, markAsCollected } = useOrder();
    const orders = ordersList || [];
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [otpInput, setOtpInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('queue'); 
    const [searchQuery, setSearchQuery] = useState('');

    const totalEarnings = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'paid');
    const printedOrders = orders.filter(o => o.status === 'printed');
    const collectedOrders = orders.filter(o => o.status === 'collected');

    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            navigate('/vendor-login');
        }
    }, [user, navigate]);

    const handleVerify = (e) => {
        e.preventDefault();
        const matchingOrder = orders.find(o => o.otp === otpInput && o.status !== 'collected');
        if (matchingOrder) {
            setVerificationResult({ success: true, message: `Verified #${matchingOrder.otp}`, orderId: matchingOrder.id });
            setOtpInput('');
            setTimeout(() => setVerificationResult(null), 3000);
        } else {
            setVerificationResult({ success: false, message: 'Terminal Auth Failed: Invalid OTP' });
            setTimeout(() => setVerificationResult(null), 2000);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o.otp.includes(searchQuery) || o.userEmail?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === 'queue' ? (o.status === 'paid' || o.status === 'printed') : (o.status === 'collected');
        return matchesSearch && matchesTab;
    });

    if (!user || user.role !== 'vendor') return null;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-600 selection:text-white">
            
            {/* Desktop Sidebar - Dark & Elite */}
            <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 bg-[#0F0F0F] border-r border-white/5 z-50">
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-14 px-2">
                        <img src="/assets/logo.png" className="w-12 h-12 rounded-2xl shadow-2xl shadow-blue-600/20 object-cover border border-blue-600/20" alt="Logo" />
                        <span className="font-black text-2xl tracking-tighter">FLEET HUB.</span>
                    </div>
                    
                    <nav className="space-y-2">
                        <AdminNavItem icon={<LayoutDashboard size={20} />} label="Live Queue" active={activeTab === 'queue'} onClick={() => setActiveTab('queue')} />
                        <AdminNavItem icon={<Clock size={20} />} label="Archive" active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} />
                        <AdminNavItem icon={<Database size={20} />} label="Terminal" onClick={() => navigate('/database')} />
                    </nav>
                </div>
                
                <div className="mt-auto p-8">
                    <div className="bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                    <Coffee size={22} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Operator</p>
                                    <p className="font-black text-sm text-white">{user?.name || 'Admin'}</p>
                                </div>
                            </div>
                            <button onClick={handleLogout} className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                                <LogOut size={16} /> Secure Exit
                            </button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="lg:pl-72 min-h-screen">
                <header className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-3xl border-b border-white/5 px-8 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 bg-blue-600/10 text-blue-500 px-4 py-1.5 rounded-full border border-blue-600/20 shadow-sm">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Fleet Operational</span>
                        </div>
                        <h1 className="text-2xl font-black tracking-tighter lg:hidden flex items-center gap-3">
                             <img src="/assets/logo.png" className="w-10 h-10 rounded-xl shadow-xl shadow-blue-600/10 object-cover border border-blue-600/10" alt="Logo" />
                             HUB
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Scan OTP..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-6 py-3 bg-white/[0.03] border border-white/5 rounded-2xl text-sm font-black text-white focus:bg-white/[0.05] focus:border-blue-600/50 outline-none w-64 transition-all"
                            />
                        </div>
                        <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
                            <Bell size={22} />
                        </button>
                    </div>
                </header>

                <div className="p-8 pb-32 max-w-6xl mx-auto">
                    
                    {/* OTP Quick Verify - Premium Card */}
                    <section className="mb-12">
                        <div className="bg-[#111] rounded-[3rem] p-10 md:p-12 shadow-2xl border border-white/5 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden group">
                            <div className="flex-1 relative z-10">
                                <div className="inline-flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                    <Zap size={14} className="fill-current" /> Fast track
                                </div>
                                <h2 className="text-4xl font-black mb-3 tracking-tighter italic">Verify Clearances.</h2>
                                <p className="text-white/40 text-base font-bold leading-relaxed max-w-md">Input the 4-digit sequence from the personnel's terminal to release print assets.</p>
                            </div>
                            <form onSubmit={handleVerify} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4 relative z-10">
                                <input 
                                    type="text" 
                                    maxLength={4}
                                    placeholder="0 0 0 0"
                                    value={otpInput}
                                    onChange={(e) => setOtpInput(e.target.value)}
                                    className="w-full sm:w-56 bg-white/[0.03] border-2 border-white/10 rounded-[2rem] py-8 px-8 text-center text-4xl font-mono font-black tracking-[0.4em] text-blue-500 focus:bg-white/[0.05] focus:border-blue-600 outline-none transition-all shadow-inner"
                                />
                                <button 
                                    type="submit"
                                    className="w-full sm:w-auto bg-white text-black px-12 py-8 rounded-[2rem] font-black text-lg hover:scale-[1.05] transition-all active:scale-95 shadow-2xl shadow-white/5 flex items-center justify-center gap-3 uppercase tracking-widest"
                                >
                                    Auth <ChevronRight size={24} />
                                </button>
                            </form>
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                        </div>
                        
                        <AnimatePresence>
                            {verificationResult && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={clsx(
                                        "mt-6 p-6 rounded-3xl font-black text-center tracking-widest uppercase text-xs shadow-2xl",
                                        verificationResult.success ? "bg-green-600 text-white shadow-green-600/20" : "bg-red-600 text-white shadow-red-600/20"
                                    )}
                                >
                                    {verificationResult.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Dashboard Metrics */}
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <StatsCard label="Pending" value={pendingOrders.length} color="bg-blue-600" />
                        <StatsCard label="Printed" value={printedOrders.length} color="bg-orange-500" />
                        <StatsCard label="Completed" value={collectedOrders.length} color="bg-green-500" />
                        <StatsCard label="Manifest Tot." value={`₹${totalEarnings}`} color="bg-white" />
                    </section>

                    {/* Orders Terminal */}
                    <div className="bg-[#111] rounded-[3.5rem] shadow-2xl border border-white/5 overflow-hidden">
                        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex gap-10">
                                <button onClick={() => setActiveTab('queue')} className={clsx("pb-4 font-black text-xs uppercase tracking-[0.2em] transition-all relative", activeTab === 'queue' ? "text-white" : "text-white/30 hover:text-white/60")}>
                                    Active Queue
                                    {activeTab === 'queue' && <motion.div layoutId="admintab" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />}
                                </button>
                                <button onClick={() => setActiveTab('completed')} className={clsx("pb-4 font-black text-xs uppercase tracking-[0.2em] transition-all relative", activeTab === 'completed' ? "text-white" : "text-white/30 hover:text-white/60")}>
                                    History Arch.
                                    {activeTab === 'completed' && <motion.div layoutId="admintab" className="absolute bottom-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />}
                                </button>
                            </div>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] font-mono">
                                LOADED: {filteredOrders.length} OBJECTS
                            </span>
                        </div>

                        <div className="p-6 space-y-5">
                            {filteredOrders.length === 0 ? (
                                <div className="py-32 text-center opacity-30">
                                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Printer size={32} />
                                    </div>
                                    <p className="text-white font-black uppercase tracking-widest text-sm italic">System Standby: No Orders</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredOrders.map(order => (
                                        <AdminOrderCard 
                                            key={order.id} 
                                            order={order} 
                                            onPrint={() => markAsPrinted(order.id)} 
                                            onCollect={() => markAsCollected(order.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Navigation - Elite Style */}
                <div className="lg:hidden fixed bottom-6 left-6 right-6 h-20 bg-black/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-3xl flex items-center justify-around px-4 z-[60]">
                    <button onClick={() => setActiveTab('queue')} className={clsx("flex flex-col items-center gap-1.5 transition-all", activeTab === 'queue' ? 'text-blue-500 scale-110' : 'text-white/30')}>
                        <Zap size={24} className={activeTab === 'queue' ? 'fill-current' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Queue</span>
                    </button>
                    <button onClick={() => setActiveTab('completed')} className={clsx("flex flex-col items-center gap-1.5 transition-all", activeTab === 'completed' ? 'text-green-500 scale-110' : 'text-white/30')}>
                        <Clock size={24} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Archive</span>
                    </button>
                    <button onClick={handleLogout} className="flex flex-col items-center gap-1.5 text-red-500/50 hover:text-red-500 transition-colors">
                        <LogOut size={24} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Exit</span>
                    </button>
                </div>
            </main>
        </div>
    );
}

function AdminNavItem({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={clsx(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all group",
                active ? "bg-blue-600 text-white shadow-2xl shadow-blue-600/30 ring-1 ring-white/20" : "text-white/30 hover:text-white hover:bg-white/5"
            )}
        >
            <div className="flex items-center gap-4">
                <div className={clsx("transition-transform group-hover:scale-110", active ? "text-white" : "text-white/30 group-hover:text-white")}>
                    {icon}
                </div>
                {label}
            </div>
            {active && <ChevronRight size={14} className="animate-pulse" />}
        </button>
    );
}

function StatsCard({ label, value, color }) {
    return (
        <div className="bg-[#151515] p-8 rounded-[2.5rem] border border-white/5 shadow-xl group hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className={clsx("w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]", color)} />
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className="text-4xl font-black tracking-tighter text-white italic">{value}</div>
        </div>
    );
}

function AdminOrderCard({ order, onPrint, onCollect }) {
    const handleDownloadAll = () => {
        order.files?.forEach(file => {
            if (file.dataVal) {
                const link = document.createElement('a');
                link.href = file.dataVal;
                link.download = file.name;
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
            className="bg-[#1A1A1A] p-8 rounded-[2.5rem] border border-white/5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-[#1E1E1E] hover:border-white/10 transition-all group"
        >
            <div className="flex items-center gap-8">
                <div className={clsx(
                    "w-24 h-24 rounded-3xl flex flex-col items-center justify-center font-mono font-black border-2 transition-transform group-hover:rotate-3",
                    order.status === 'paid' ? "bg-blue-600/10 border-blue-600/30 text-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]" : 
                    order.status === 'printed' ? "bg-orange-500/10 border-orange-500/30 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]" :
                    "bg-green-600/10 border-green-600/30 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                )}>
                    <span className="text-3xl leading-none italic">{order.otp}</span>
                    <span className="text-[9px] font-sans font-black uppercase tracking-[0.3em] opacity-40 mt-2">PIN</span>
                </div>
                
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-black text-2xl tracking-tighter text-white italic">#{order.id.slice(-6).toUpperCase()}</h4>
                        <span className="bg-white/10 text-white/50 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{order.userEmail?.split('@')[0]}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-5 text-[11px] font-black uppercase tracking-widest text-white/30">
                        <span className="flex items-center gap-2"><Printer size={16} className="text-blue-500" /> {order.files?.length} Assests</span>
                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                        <span className="flex items-center gap-2 italic">{order.settings?.color ? 'Full Color' : 'Grayscale'}</span>
                        <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                        <span className="text-white text-base tracking-tighter normal-case">₹{order.totalAmount}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={handleDownloadAll}
                    className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:bg-white hover:text-black transition-all shadow-xl group/btn"
                    title="Initialize Download"
                >
                    <Download size={24} className="group-hover/btn:scale-110 transition-transform" />
                </button>
                
                {order.status === 'paid' && (
                    <button 
                        onClick={onPrint}
                        className="flex-1 md:flex-none px-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                        <Printer size={20} /> Deploy Print
                    </button>
                )}
                {order.status === 'printed' && (
                    <button 
                        onClick={onCollect}
                        className="flex-1 md:flex-none px-10 py-5 bg-green-600 text-white rounded-[1.5rem] font-black text-sm shadow-[0_15px_30px_-5px_rgba(34,197,94,0.4)] hover:bg-green-500 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                    >
                        <Check size={20} /> Release Asset
                    </button>
                )}
                {order.status === 'collected' && (
                    <div className="flex-1 md:flex-none px-10 py-5 bg-white/5 text-white/20 rounded-[1.5rem] font-black text-sm flex items-center gap-3 border border-white/10 uppercase tracking-widest italic">
                        <CheckCircle size={20} /> Deployed
                    </div>
                )}
            </div>
        </motion.div>
    );
}
