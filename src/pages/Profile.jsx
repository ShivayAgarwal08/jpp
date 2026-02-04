import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Wallet, History, ChevronRight, LogOut, FileText, CheckCircle, Clock, Printer, Shield, CreditCard, Bell, Sparkles, Zap, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function Profile() {
    const { user, logout } = useAuth();
    const { orders } = useOrder();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const myOrders = (orders || []).filter(o => o.userId === user?.id);

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-500 pb-24 overflow-x-hidden font-sans">

            {/* Premium Header Container */}
            <div className="sticky top-0 z-50 glass-morphism border-b border-black/5 dark:border-white/5 py-6">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all group">
                         <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">IDENTITY PORTAL</h1>
                    </div>
                    <div className="w-12" /> {/* Spacer */}
                </div>
            </div>

            <main className="max-w-2xl mx-auto px-6 mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                
                {/* Identity Card */}
                <div className="flex flex-col items-center text-center">
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-32 h-32 rounded-[40px] bg-gradient-to-tr from-orange-500 to-amber-400 p-1.5 shadow-3xl mb-8 relative group"
                    >
                        <div className="w-full h-full bg-black dark:bg-black rounded-[36px] flex items-center justify-center overflow-hidden">
                             {user?.name?.[0]?.toUpperCase() ? (
                                <span className="text-5xl font-black text-white italic tracking-tighter">{user.name[0]}</span>
                             ) : <User size={48} className="text-white" />}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white dark:border-black rounded-full flex items-center justify-center shadow-lg">
                            <Shield size={16} className="text-white" />
                        </div>
                    </motion.div>
                    
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-2">{user?.name || 'GUEST AGENT'}</h2>
                        <div className="flex items-center gap-2 justify-center">
                             <span className="text-neutral-500 font-bold text-xs">{user?.email || 'OFFLINE ACCESS'}</span>
                             <div className="w-1 h-1 bg-neutral-300 dark:bg-neutral-800 rounded-full" />
                             <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest">JIIT-128 PRINTER CO.</span>
                        </div>
                    </div>
                </div>

                {/* Tactical Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-morphism dark:bg-white/[0.02] p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all">
                             <Zap size={20} />
                        </div>
                        <div>
                             <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Total Assets</p>
                             <p className="text-xl font-black tracking-tighter uppercase italic">{myOrders.length}</p>
                        </div>
                    </div>
                    <div className="glass-morphism dark:bg-white/[0.02] p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                             <Wallet size={20} />
                        </div>
                        <div>
                             <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Balance</p>
                             <p className="text-xl font-black tracking-tighter uppercase italic">₹0.00</p>
                        </div>
                    </div>
                </div>

                {/* Core Menu */}
                <div className="glass-morphism dark:bg-white/[0.02] rounded-[48px] border border-black/5 dark:border-white/5 overflow-hidden">
                    <ListItem 
                      icon={<FileText size={20} />} 
                      label="NEW PRINT OPERATION" 
                      desc="Queue assets for production"
                      onClick={() => navigate('/order')}
                    />
                    <ListItem 
                      icon={<CreditCard size={20} />} 
                      label="PAYMENT LOGS" 
                      desc="Transaction & wallet history"
                    />
                    <ListItem 
                      icon={<Shield size={20} />} 
                      label="ENCRYPTION KEYS" 
                      desc="Manage session & security"
                    />
                    <button onClick={handleLogout} className="w-full text-left">
                        <ListItem 
                          icon={<LogOut size={20} />} 
                          label="TERMINATE SESSION" 
                          desc="Logout from JIIT network"
                          isLast 
                          danger
                        />
                    </button>
                </div>

                {/* Asset History */}
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 px-2 mt-4">RECENT DEPLOYMENTS</h3>

                    <div className="space-y-4">
                        {myOrders.length === 0 ? (
                            <div className="text-center py-20 glass-morphism dark:bg-white/[0.02] rounded-[40px] border border-dashed border-black/5 dark:border-white/5">
                                <History size={32} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-800" />
                                <h4 className="font-black text-lg tracking-tight uppercase italic mb-1">NO LOGS FOUND</h4>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">System idle. Start a new print operation.</p>
                            </div>
                        ) : (
                            <AnimatePresence mode='popLayout'>
                                {myOrders.slice(0, 5).map((order) => (
                                    <motion.div 
                                        layout
                                        key={order.id} 
                                        className="glass-morphism dark:bg-white/[0.01] p-6 rounded-[32px] border border-black/5 dark:border-white/5 flex items-center justify-between group hover:border-orange-500/20 transition-all"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={clsx(
                                                "w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black relative overflow-hidden transition-transform group-hover:scale-110 shadow-2xl",
                                                order.status === 'collected' ? "bg-black/5 dark:bg-white/5 text-neutral-400" : "bg-orange-500 text-white"
                                            )}>
                                                <span className="text-xl italic leading-none">{order.otp}</span>
                                                <span className="text-[7px] uppercase tracking-widest mt-0.5 opacity-60">OTP</span>
                                            </div>
                                            
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-black text-sm tracking-tighter uppercase italic">#{order.id.slice(0, 8)}</h4>
                                                    <div className={clsx("w-1 h-1 rounded-full",
                                                        order.status === 'collected' ? "bg-neutral-400" :
                                                        order.status === 'printed' ? "bg-blue-500" : "bg-green-500"
                                                    )} />
                                                </div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
                                                    {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {order.files.length} ASSETS
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-black text-sm tracking-tighter uppercase italic leading-none mb-1">₹{order.totalAmount}</p>
                                            <span className={clsx("text-[9px] font-black uppercase tracking-widest",
                                                order.status === 'collected' ? "text-neutral-500" :
                                                order.status === 'printed' ? "text-blue-500" : "text-green-500"
                                            )}>
                                                {order.status === 'paid' ? 'ACTIVE' : order.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>

            </main>
        </div>
    );
}

function ListItem({ icon, label, desc, onClick, isLast, danger }) {
    return (
        <button 
           onClick={onClick}
           className={clsx(
                "w-full flex items-center justify-between p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left group",
                !isLast && "border-b border-black/5 dark:border-white/5"
           )}
        >
            <div className="flex items-center gap-6">
                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xl", 
                    danger ? "bg-red-500/10 text-red-500" : "bg-black dark:bg-white text-white dark:text-black"
                )}>
                    {icon}
                </div>
                <div>
                    <h4 className={clsx("font-black text-sm tracking-[0.2em] uppercase transition-colors italic", 
                        danger ? "text-red-500" : "text-black dark:text-white"
                    )}>{label}</h4>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-500 transition-colors">{desc}</p>
                </div>
            </div>
            <ChevronRight size={20} className={clsx("transition-transform group-hover:translate-x-1", danger ? "text-red-500" : "text-neutral-300 dark:text-neutral-700")} />
        </button>
    );
}

