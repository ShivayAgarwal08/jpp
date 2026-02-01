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
    Zap
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

    const myOrders = orders.filter(o => o.userId === user?.id);
    const activeOrders = myOrders.filter(o => o.status !== 'collected');

    return (
        <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-primary/10 selection:text-primary">
            
            {/* Dynamic Sticky Header */}
            <header className="bg-white/60 backdrop-blur-xl sticky top-0 z-40 px-6 py-4 border-b border-gray-100/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/home')} 
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </motion.button>
                    <h1 className="font-black text-xl tracking-tight">Account</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                        <Bell size={20} />
                    </button>
                    <button 
                        onClick={handleLogout}
                        className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto p-6 md:p-12 lg:py-20">
                <div className="grid lg:grid-cols-3 gap-12">
                    
                    {/* Left Column: Dynamic Profile Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1 space-y-8"
                    >
                        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl shadow-black/[0.02] border border-gray-100/50 text-center relative overflow-hidden group">
                            <div className="relative z-10">
                                <motion.div 
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative inline-block mb-8"
                                >
                                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white flex items-center justify-center text-5xl font-black shadow-2xl ring-[6px] ring-white">
                                        {user?.name?.[0].toUpperCase() || 'U'}
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                                </motion.div>
                                <h2 className="text-2xl font-black mb-1 tracking-tight">{user?.name || 'Student'}</h2>
                                <p className="text-gray-400 text-sm font-medium mb-8 lowercase opacity-60">{user?.email}</p>
                                
                                <div className="flex gap-2 justify-center mb-10">
                                    <span className="bg-gray-50 text-gray-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-gray-100">Jaypee 128</span>
                                    <span className="bg-primary/5 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">Member</span>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleLogout}
                                    className="w-full bg-gray-50 text-red-500 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-3"
                                >
                                    <LogOut size={16} /> Secure Logout
                                </motion.button>
                            </div>
                            {/* Decorative blur */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                        </div>

                        {/* Staggered Stats Cards */}
                        <div className="grid grid-cols-2 gap-6">
                            <StatCard 
                                value={myOrders.length} 
                                label="Prints" 
                                icon={<History size={16} />}
                                delay={0.1}
                            />
                            <StatCard 
                                value={activeOrders.length} 
                                label="Active" 
                                icon={<Zap size={16} />} 
                                color="text-primary"
                                delay={0.2}
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: History & Custom Settings */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* Section: Dynamic Pickup Queue */}
                        {activeOrders.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center">
                                            <Zap size={18} className="fill-current" />
                                        </div>
                                        Live Status
                                    </h3>
                                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest animate-pulse">Updated Live</span>
                                </div>
                                <div className="space-y-4">
                                    {activeOrders.map((order, idx) => (
                                        <ProfileOrderCard key={order.id} order={order} active delay={idx * 0.1} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Section: Staggered History */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                                        <Clock size={18} />
                                    </div>
                                    Print History
                                </h3>
                                <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Export .CSV</button>
                            </div>
                            
                            <div className="space-y-4">
                                {myOrders.filter(o => o.status === 'collected').length === 0 && activeOrders.length === 0 ? (
                                    <div className="py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-100/50 text-center shadow-sm">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
                                            <ShoppingBag size={40} />
                                        </div>
                                        <p className="text-gray-400 font-bold mb-6">No prints found yet</p>
                                        <Link to="/order" className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-block">Start Printing</Link>
                                    </div>
                                ) : (
                                    myOrders.filter(o => o.status === 'collected').slice(0, 5).map((order, idx) => (
                                        <ProfileOrderCard key={order.id} order={order} delay={idx * 0.05} />
                                    ))
                                )}
                            </div>
                        </section>

                        {/* Premium Menu Grid */}
                        <section>
                            <h3 className="text-xl font-black mb-8 tracking-tight">System Controls</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <ProfileMenuButton icon={<Settings size={20} />} label="Security" desc="PIN & MFA" />
                                <ProfileMenuButton icon={<Wallet size={20} />} label="Billing" desc="Payment logs" />
                                <ProfileMenuButton icon={<Bell size={20} />} label="Privacy" desc="Incognito mode" />
                                <ProfileMenuButton icon={<HelpCircle size={20} />} label="Support" desc="Help center" />
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ value, label, icon, delay = 0, color = "text-black" }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/[0.01] text-center"
        >
            <div className={clsx("flex items-center justify-center gap-1.5 mb-1", color)}>
                {icon}
                <p className="text-3xl font-black tracking-tighter">{value}</p>
            </div>
            <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em]">{label}</p>
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
                "p-6 rounded-[2rem] border transition-all flex items-center justify-between group cursor-pointer",
                active ? "bg-black text-white border-black shadow-2xl shadow-black/20" : "bg-white border-gray-100 hover:border-gray-200"
            )}
        >
            <div className="flex items-center gap-6">
                <div className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg shadow-inner",
                    active ? "bg-white/10 text-white" : "bg-gray-50 text-gray-400"
                )}>
                    {order.otp}
                </div>
                <div>
                    <h4 className="font-black text-base tracking-tight">₹{order.totalAmount} • {order.files?.length} Unit{order.files?.length > 1 ? 's' : ''}</h4>
                    <p className={clsx("text-[10px] font-black uppercase tracking-widest mt-1 opacity-40", active ? "text-white" : "text-gray-400")}>
                        {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                 <span className={clsx(
                    "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                    active ? (order.status === 'printed' ? "bg-primary text-white" : "bg-blue-500 text-white") : "bg-gray-50 text-gray-300"
                )}>
                    {active ? (order.status === 'printed' ? 'READY' : 'PRINTING') : 'HISTORY'}
                </span>
                <ChevronRight size={18} className={clsx("transition-transform group-hover:translate-x-1", active ? "text-white/20" : "text-gray-200")} />
            </div>
        </motion.div>
    );
}

function ProfileMenuButton({ icon, label, desc }) {
    return (
        <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-gray-100 text-left group hover:shadow-xl hover:shadow-black/[0.02] transition-all"
        >
            <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-black text-sm tracking-tight group-hover:text-black transition-colors">{label}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{desc}</p>
            </div>
            <ChevronRight size={18} className="text-gray-100 group-hover:text-black transition-colors" />
        </motion.button>
    );
}
