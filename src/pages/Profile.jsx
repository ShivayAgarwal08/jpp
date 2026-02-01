import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    User, 
    Wallet, 
    History, 
    ChevronRight, 
    LogOut, 
    FileText, 
    CheckCircle, 
    Clock, 
    Printer, 
    Shield, 
    CreditCard, 
    Bell,
    Settings,
    HelpCircle,
    ShoppingBag,
    Zap,
    MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Profile() {
    const { user, logout } = useAuth();
    const { orders } = useOrder();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const myOrders = orders.filter(o => o.userId === user?.id || o.userId === user?.uid);
    const activeOrders = myOrders.filter(o => o.status !== 'collected');

    return (
        <div className="min-h-screen bg-[#FBFBFD] text-gray-950 font-sans selection:bg-blue-600/10 selection:text-blue-600 overflow-x-hidden">
            
            {/* Ambient Background */}
            <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] -z-0 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[120px] -z-0 pointer-events-none" />

            {/* Dynamic Sticky Header */}
            <header className="bg-white/40 backdrop-blur-3xl sticky top-0 z-40 px-6 h-20 border-b border-gray-100/50 flex items-center justify-between">
                <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate('/home')} 
                            className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-black transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <h1 className="font-black text-2xl tracking-tighter">Identity Terminal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-all">
                            <Bell size={20} />
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto p-6 md:p-12 lg:py-20 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Premium Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-4 space-y-8"
                    >
                        <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] border border-gray-100 text-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <motion.div 
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative inline-block mb-10"
                                >
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-black text-white flex items-center justify-center text-6xl font-black shadow-3xl ring-[8px] ring-white rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        {user?.name?.[0].toUpperCase() || 'U'}
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 border-[6px] border-white rounded-2xl shadow-xl flex items-center justify-center text-white">
                                        <Zap size={16} className="fill-current" />
                                    </div>
                                </motion.div>

                                <h2 className="text-3xl font-black mb-1 tracking-tighter text-gray-950">{user?.name || 'Authorized Personnel'}</h2>
                                <p className="text-gray-500 font-bold text-sm mb-10 lowercase tracking-tight">{user?.email}</p>
                                
                                <div className="flex flex-col gap-3 mb-12">
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Base Campus</span>
                                        <span className="text-xs font-black text-gray-900 border-b-2 border-blue-600/30">JIIT 128</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clearance</span>
                                        <span className="text-xs font-black text-blue-600">V3.0 ELITE</span>
                                    </div>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleLogout}
                                    className="w-full bg-black text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-black/10"
                                >
                                    <LogOut size={16} /> Terminate Session
                                </motion.button>
                            </div>
                            {/* Decorative blur */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
                        </div>

                        {/* Staggered Stats Cards */}
                        <div className="grid grid-cols-2 gap-6">
                            <StatCard 
                                value={myOrders.length} 
                                label="Logistics" 
                                icon={<History size={18} />}
                                delay={0.1}
                            />
                            <StatCard 
                                value={activeOrders.length} 
                                label="Active" 
                                icon={<Zap size={18} />} 
                                color="text-blue-600"
                                delay={0.2}
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: High Contrast Content */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* Section: Live Queue Status */}
                        {activeOrders.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                                            <Zap size={22} className="fill-current" />
                                        </div>
                                        Live Operations
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-time sync</span>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    {activeOrders.map((order, idx) => (
                                        <ProfileOrderCard key={order.id} order={order} active delay={idx * 0.1} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Section: Historical Records */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3 text-gray-950">
                                    <div className="w-10 h-10 rounded-2xl bg-gray-950 text-white flex items-center justify-center">
                                        <Clock size={22} />
                                    </div>
                                    Historical Logs
                                </h3>
                                <button className="text-[11px] font-black text-gray-500 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-2">
                                    Archive Access <ChevronRight size={14} />
                                </button>
                            </div>
                            
                            <div className="space-y-5">
                                {myOrders.filter(o => o.status === 'collected').length === 0 && activeOrders.length === 0 ? (
                                    <div className="py-28 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 text-center shadow-sm">
                                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                                            <ShoppingBag size={48} />
                                        </div>
                                        <p className="text-gray-500 font-black text-lg mb-8 tracking-tight">Terminal Database Empty</p>
                                        <Link to="/order" className="bg-black text-white px-10 py-4 rounded-[1.25rem] font-black text-sm shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-block uppercase tracking-widest">Initialize Print</Link>
                                    </div>
                                ) : (
                                    myOrders.filter(o => o.status === 'collected').slice(0, 5).map((order, idx) => (
                                        <ProfileOrderCard key={order.id} order={order} delay={idx * 0.05} />
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Core Controls Grid */}
                        <section>
                            <h3 className="text-2xl font-black mb-8 tracking-tighter">Terminal Controls</h3>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <ProfileMenuButton onClick={() => window.open('https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6', '_blank')} icon={<MessageCircle size={22} />} label="Priority Support" desc="WhatsApp Fleet Comms" />
                                <ProfileMenuButton icon={<Wallet size={22} />} label="Billing Ledger" desc="Transaction manifest" />
                                <ProfileMenuButton icon={<Shield size={22} />} label="Encryption" desc="Doc wiping settings" />
                                <ProfileMenuButton icon={<Settings size={22} />} label="Configuration" desc="System preferences" />
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ value, label, icon, delay = 0, color = "text-gray-950" }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] text-center group"
        >
            <div className={clsx("flex items-center justify-center gap-2 mb-2 transition-transform group-hover:scale-110", color)}>
                {icon}
                <p className="text-4xl font-black tracking-tighter">{value}</p>
            </div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{label}</p>
        </motion.div>
    );
}

function ProfileOrderCard({ order, active, delay = 0 }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.01 }}
            className={clsx(
                "p-8 rounded-[2.5rem] border transition-all flex items-center justify-between group cursor-pointer",
                active ? "bg-black text-white border-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]" : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-xl hover:shadow-black/[0.02]"
            )}
        >
            <div className="flex items-center gap-8">
                <div className={clsx(
                    "w-16 h-16 rounded-2xl flex items-center justify-center font-mono font-black text-2xl shadow-inner rotate-3 transition-transform group-hover:rotate-0",
                    active ? "bg-white/10 text-white" : "bg-gray-50 text-gray-500"
                )}>
                    {order.otp}
                </div>
                <div>
                    <h4 className="font-black text-xl tracking-tighter italic">₹{order.totalAmount} • {order.files?.length} Unit{order.files?.length > 1 ? 's' : ''}</h4>
                    <p className={clsx("text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-50", active ? "text-white" : "text-gray-500")}>
                        Manifest: {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                 <span className={clsx(
                    "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg",
                    active ? (order.status === 'printed' ? "bg-blue-600 text-white shadow-blue-600/30" : "bg-white text-black") : "bg-gray-50 text-gray-400"
                )}>
                    {active ? (order.status === 'printed' ? 'READY' : 'FLEET PRINTING') : 'RECORED'}
                </span>
                <ChevronRight size={22} className={clsx("transition-transform group-hover:translate-x-2", active ? "text-white/30" : "text-gray-200")} />
            </div>
        </motion.div>
    );
}

function ProfileMenuButton({ icon, label, desc, onClick }) {
    return (
        <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="w-full flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 text-left group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-500"
        >
            <div className="w-14 h-14 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-black text-base tracking-tighter text-gray-950 group-hover:text-black transition-colors">{label}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 opacity-60">{desc}</p>
            </div>
            <ChevronRight size={20} className="text-gray-100 group-hover:text-black transition-all group-hover:translate-x-1" />
        </motion.button>
    );
}
