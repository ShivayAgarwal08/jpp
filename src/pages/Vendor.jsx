import { useState, useEffect, useRef } from 'react';
import { useOrder } from '../context/OrderContext';
import { 
    Search, 
    CheckCircle, 
    Clock, 
    Download, 
    Printer, 
    Check, 
    X, 
    Bell, 
    RefreshCw, 
    TrendingUp, 
    FileText, 
    User, 
    LogOut, 
    Shield, 
    Database,
    ChevronRight,
    Zap,
    LayoutDashboard,
    MoreVertical,
    Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Vendor() {
    const { orders: ordersList, markAsPrinted, markAsCollected } = useOrder();
    const orders = ordersList || [];
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const [otpInput, setOtpInput] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [activeTab, setActiveTab] = useState('queue'); // queue, completed, stats
    const [searchQuery, setSearchQuery] = useState('');
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Stats
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
            setVerificationResult({ success: false, message: 'Invalid OTP' });
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
        <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-black selection:text-white">
            
            {/* Sidebar (Similar to Home but for Admin) */}
            <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 bg-black text-white z-50">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold text-2xl">J.</div>
                        <span className="font-bold text-xl tracking-tight">JPRINT Admin</span>
                    </div>
                    
                    <nav className="space-y-2">
                        <AdminNavItem icon={<LayoutDashboard size={20} />} label="Live Queue" active={activeTab === 'queue'} onClick={() => setActiveTab('queue')} />
                        <AdminNavItem icon={<Clock size={20} />} label="History" active={activeTab === 'completed'} onClick={() => setActiveTab('completed')} />
                        <AdminNavItem icon={<Database size={20} />} label="Terminal" onClick={() => navigate('/database')} />
                    </nav>
                </div>
                
                <div className="mt-auto p-8">
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                                <Coffee size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-white/40 font-bold uppercase">Vendor</p>
                                <p className="font-bold text-sm">{user?.name || 'Admin'}</p>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full bg-white text-black py-3 rounded-2xl font-bold text-xs hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                            <LogOut size={14} /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <main className="lg:pl-72 min-h-screen">
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Live System</span>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight lg:hidden flex items-center gap-2">
                             <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">J.</div>
                             Admin
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search OTP..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:bg-white focus:border-black/10 outline-none w-48 transition-all"
                            />
                        </div>
                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                <div className="p-8 pb-32 max-w-6xl mx-auto">
                    
                    {/* OTP Quick Verify */}
                    <section className="mb-10">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-1">Verify Student OTP</h2>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">Fast-trace orders using the 4-digit code provided by students.</p>
                            </div>
                            <form onSubmit={handleVerify} className="w-full md:w-auto flex items-center gap-3">
                                <input 
                                    type="text" 
                                    maxLength={4}
                                    placeholder="0 0 0 0"
                                    value={otpInput}
                                    onChange={(e) => setOtpInput(e.target.value)}
                                    className="w-48 bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 text-center text-2xl font-mono font-bold tracking-[0.3em] focus:bg-white focus:border-black outline-none transition-all"
                                />
                                <button 
                                    type="submit"
                                    className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
                                >
                                    Verify
                                </button>
                            </form>
                        </div>
                        
                        <AnimatePresence>
                            {verificationResult && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={clsx(
                                        "mt-4 p-4 rounded-2xl font-bold text-center",
                                        verificationResult.success ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                    )}
                                >
                                    {verificationResult.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* Stats Horizontal */}
                    <section className="grid md:grid-cols-4 gap-6 mb-12">
                        <StatsCard label="Pending" value={pendingOrders.length} color="bg-blue-500" />
                        <StatsCard label="Printed" value={printedOrders.length} color="bg-orange-500" />
                        <StatsCard label="Collected" value={collectedOrders.length} color="bg-green-500" />
                        <StatsCard label="Revenue" value={`₹${totalEarnings}`} color="bg-black" isMoney />
                    </section>

                    {/* Orders Queue */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex gap-8">
                                <button onClick={() => setActiveTab('queue')} className={clsx("pb-2 font-bold text-sm transition-colors relative", activeTab === 'queue' ? "text-black" : "text-gray-400")}>
                                    Active Queue
                                    {activeTab === 'queue' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                                </button>
                                <button onClick={() => setActiveTab('completed')} className={clsx("pb-2 font-bold text-sm transition-colors relative", activeTab === 'completed' ? "text-black" : "text-gray-400")}>
                                    Completed
                                    {activeTab === 'completed' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
                                </button>
                            </div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                Showing {filteredOrders.length} orders
                            </span>
                        </div>

                        <div className="p-4 bg-gray-50/30">
                            {filteredOrders.length === 0 ? (
                                <div className="py-24 text-center">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                        <Printer size={32} />
                                    </div>
                                    <p className="text-gray-400 font-bold">Queue is empty</p>
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

                {/* Mobile Tab Bar */}
                <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 px-10 py-4 flex justify-between z-50">
                    <button onClick={() => setActiveTab('queue')} className={clsx("flex flex-col items-center gap-1", activeTab === 'queue' ? 'text-black' : 'text-gray-300')}>
                        <Zap size={24} />
                        <span className="text-[10px] font-bold">Queue</span>
                    </button>
                    <button onClick={() => setActiveTab('completed')} className={clsx("flex flex-col items-center gap-1", activeTab === 'completed' ? 'text-black' : 'text-gray-300')}>
                        <Clock size={24} />
                        <span className="text-[10px] font-bold">History</span>
                    </button>
                    <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-400">
                        <LogOut size={24} />
                        <span className="text-[10px] font-bold">Exit</span>
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
                "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all",
                active ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white hover:bg-white/5"
            )}
        >
            <div className="flex items-center gap-3">
                {icon}
                {label}
            </div>
            {active && <ChevronRight size={14} />}
        </button>
    );
}

function StatsCard({ label, value, color, isMoney }) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm group hover:ring-2 ring-black/5 transition-all">
            <div className="flex items-center gap-2 mb-3">
                <div className={clsx("w-2 h-2 rounded-full", color)} />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            <div className="text-3xl font-black tracking-tight">{value}</div>
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
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-shadow group"
        >
            <div className="flex items-center gap-6">
                <div className={clsx(
                    "w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-mono font-black border group-hover:scale-105 transition-transform",
                    order.status === 'paid' ? "bg-blue-50 border-blue-100 text-blue-600" : 
                    order.status === 'printed' ? "bg-orange-50 border-orange-100 text-orange-600" :
                    "bg-green-50 border-green-100 text-green-600"
                )}>
                    <span className="text-2xl leading-none">{order.otp}</span>
                    <span className="text-[8px] font-sans uppercase tracking-[0.2em] opacity-40 mt-1">OTP</span>
                </div>
                
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">#{order.id.slice(-6)}</h4>
                        <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{order.userEmail?.split('@')[0]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1"><Printer size={12} /> {order.files?.length} Files</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="flex items-center gap-1"><FileText size={12} /> {order.settings?.color ? 'Color' : 'B&W'}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="text-black font-bold">₹{order.totalAmount}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button 
                    onClick={handleDownloadAll}
                    className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all shadow-sm"
                    title="Download Files"
                >
                    <Download size={20} />
                </button>
                
                {order.status === 'paid' && (
                    <button 
                        onClick={onPrint}
                        className="flex-1 md:flex-none px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Printer size={18} /> Mark Printed
                    </button>
                )}
                {order.status === 'printed' && (
                    <button 
                        onClick={onCollect}
                        className="flex-1 md:flex-none px-8 py-3.5 bg-green-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-200 hover:bg-green-600 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Check size={18} /> Complete Pick-up
                    </button>
                )}
                {order.status === 'collected' && (
                    <div className="flex-1 md:flex-none px-8 py-3.5 bg-gray-50 text-gray-400 rounded-2xl font-bold text-sm flex items-center gap-2 border border-gray-100">
                        <CheckCircle size={18} /> Collected
                    </div>
                )}
            </div>
        </motion.div>
    );
}
