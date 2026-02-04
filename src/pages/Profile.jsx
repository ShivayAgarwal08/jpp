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
        <div className="min-h-screen bg-white text-black transition-colors duration-500 pb-24 overflow-x-hidden font-sans">

            {/* Header */}
            <div className="sticky top-0 z-50 glass-morphism border-b border-black/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl border border-black/5 flex items-center justify-center hover:bg-neutral-50 transition-all group">
                         <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform text-black" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Identity Portal</h1>
                    </div>
                    <div className="w-12" />
                </div>
            </div>

            <main className="max-w-2xl mx-auto px-6 mt-16 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Identity Module */}
                <div className="flex flex-col items-center text-center">
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-32 h-32 rounded-[48px] bg-gradient-to-tr from-orange-500 to-amber-500 p-1.5 shadow-[0_40px_80px_-20px_rgba(249,115,22,0.3)] mb-8 relative group"
                    >
                        <div className="w-full h-full bg-white rounded-[44px] flex items-center justify-center overflow-hidden border border-black/5">
                             {user?.name?.[0]?.toUpperCase() ? (
                                <span className="text-5xl font-black text-black">{user.name[0]}</span>
                             ) : <User size={48} className="text-black" />}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-black border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                            <Shield size={16} className="text-orange-500" />
                        </div>
                    </motion.div>
                    
                    <div>
                        <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-3 text-black">{user?.name || 'Guest User'}</h2>
                        <div className="flex items-center gap-3 justify-center">
                             <span className="text-neutral-400 font-black text-[10px] uppercase tracking-widest">{user?.email || 'OFFLINE'}</span>
                             <div className="w-1.5 h-1.5 bg-neutral-100 rounded-full" />
                             <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.2em] bg-orange-500/5 px-3 py-1 rounded-full border border-orange-500/10">Authorized Member</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Bento */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-premium flex items-center gap-5 group">
                        <div className="w-14 h-14 bg-orange-500/5 text-orange-500 rounded-[22px] flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all border border-orange-500/10">
                             <Zap size={24} />
                        </div>
                        <div>
                             <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-2">Total Lab</p>
                             <p className="text-2xl font-black tracking-tighter uppercase text-black">{myOrders.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-premium flex items-center gap-5 group">
                        <div className="w-14 h-14 bg-neutral-100 text-black rounded-[22px] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all border border-black/5">
                             <Wallet size={24} />
                        </div>
                        <div>
                             <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-2">Credits</p>
                             <p className="text-2xl font-black tracking-tighter uppercase text-black">₹0.00</p>
                        </div>
                    </div>
                </div>

                {/* Management Suite */}
                <div className="bg-white rounded-[56px] border border-black/5 shadow-premium overflow-hidden">
                    <ListItem 
                      icon={<FileText size={20} />} 
                      label="OPEN NEW TICKET" 
                      desc="Start production sequence"
                      onClick={() => navigate('/order')}
                    />
                    <ListItem 
                      icon={<CreditCard size={20} />} 
                      label="FINANCIAL LOGS" 
                      desc="Transaction history"
                    />
                    <ListItem 
                      icon={<Shield size={20} />} 
                      label="SECURITY CORE" 
                      desc="Manage key protocols"
                    />
                    <button onClick={handleLogout} className="w-full text-left">
                        <ListItem 
                          icon={<LogOut size={20} />} 
                          label="TERMINATE SESSION" 
                          desc="Sign out of system"
                          isLast 
                          danger
                        />
                    </button>
                </div>

                {/* History Module */}
                <div className="space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 px-4">SEQUENCE LOGS</h3>

                    <div className="space-y-4">
                        {myOrders.length === 0 ? (
                            <div className="text-center py-20 bg-neutral-50 rounded-[48px] border-2 border-dashed border-black/5">
                                <History size={40} className="mx-auto mb-6 text-neutral-200" />
                                <h4 className="font-black text-2xl tracking-tighter uppercase mb-2 text-black">NO RECORDS</h4>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">System standby for new transactions</p>
                            </div>
                        ) : (
                            <AnimatePresence mode='popLayout'>
                                {myOrders.slice(0, 5).map((order) => (
                                    <motion.div 
                                        layout
                                        key={order.id} 
                                        className="bg-white p-6 rounded-[40px] border border-black/5 flex items-center justify-between group hover:border-orange-500/20 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={clsx(
                                                "w-16 h-16 rounded-[28px] flex flex-col items-center justify-center font-black transition-all group-hover:scale-110 shadow-xl",
                                                order.status === 'collected' ? "bg-neutral-50 text-neutral-400" : "bg-orange-500 text-white"
                                            )}>
                                                <span className="text-2xl tracking-tighter leading-none">{order.otp}</span>
                                                <span className="text-[8px] uppercase tracking-widest mt-1 opacity-60">OTP</span>
                                            </div>
                                            
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-black text-base tracking-tighter uppercase text-black">BATCH-{order.id.slice(0, 6)}</h4>
                                                    <div className={clsx("w-2 h-2 rounded-full",
                                                        order.status === 'collected' ? "bg-neutral-200" :
                                                        order.status === 'printed' ? "bg-blue-500" : "bg-green-500"
                                                    )} />
                                                </div>
                                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em]">
                                                    {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {order.files.length} ASSETS
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-black text-xl tracking-tighter uppercase leading-none mb-2 text-black">₹{order.totalAmount}</p>
                                            <span className={clsx("text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border",
                                                order.status === 'collected' ? "text-neutral-400 border-neutral-100" :
                                                order.status === 'printed' ? "text-blue-500 border-blue-100 bg-blue-50/50" : "text-green-500 border-green-100 bg-green-50/50"
                                            )}>
                                                {order.status === 'paid' ? 'In Queue' : order.status}
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
                "w-full flex items-center justify-between p-10 hover:bg-neutral-50 transition-all text-left group",
                !isLast && "border-b border-black/5"
           )}
        >
            <div className="flex items-center gap-6">
                <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6 shadow-xl", 
                    danger ? "bg-red-500 text-white" : "bg-black text-white"
                )}>
                    {icon}
                </div>
                <div>
                    <h4 className={clsx("font-black text-xs tracking-[0.3em] uppercase transition-colors", 
                        danger ? "text-red-500" : "text-black"
                    )}>{label}</h4>
                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.1em] mt-1.5 transition-colors">{desc}</p>
                </div>
            </div>
            <ChevronRight size={20} className={clsx("transition-transform group-hover:translate-x-1", danger ? "text-red-500" : "text-neutral-200")} />
        </button>
    );
}
