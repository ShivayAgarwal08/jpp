import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Wallet, History, ChevronRight, LogOut, FileText, CheckCircle, Clock, Shield, CreditCard, Zap, ChevronLeft } from 'lucide-react';
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

    const myOrders = (orders || []).filter(o => o.userId === user?.id || o.userId === user?.uid);

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-24 font-sans">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 py-4">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors group">
                         <ChevronLeft size={24} className="text-neutral-500 group-hover:text-black" />
                    </button>
                    <h1 className="font-bold text-neutral-800">My Account</h1>
                    <div className="w-10" />
                </div>
            </header>

            <main className="max-w-xl mx-auto px-6 mt-12 space-y-10">
                
                {/* Profile Header */}
                <div className="flex flex-col items-center text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-24 h-24 rounded-3xl bg-amber-500 p-1 mb-6 relative group"
                    >
                        <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center border border-amber-200 overflow-hidden shadow-inner">
                             {user?.name?.[0]?.toUpperCase() ? (
                                <span className="text-4xl font-bold text-amber-600">{user.name[0]}</span>
                             ) : <User size={40} className="text-neutral-300" />}
                        </div>
                    </motion.div>
                    
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold text-neutral-900">{user?.name || 'Student User'}</h2>
                        <div className="flex items-center gap-2 justify-center text-sm font-medium text-neutral-500">
                             <span>{user?.email || 'N/A'}</span>
                             <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                             <span className="text-amber-700 font-bold">JIIT Student</span>
                        </div>
                    </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                             <Zap size={20} />
                        </div>
                        <div>
                             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Total Prints</p>
                             <p className="text-xl font-bold text-neutral-900">{myOrders.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-neutral-50 text-neutral-400 rounded-xl flex items-center justify-center border border-neutral-100">
                             <Wallet size={20} />
                        </div>
                        <div>
                             <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Balance</p>
                             <p className="text-xl font-bold text-neutral-900">₹0.00</p>
                        </div>
                    </div>
                </div>

                {/* Control Menu */}
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm divide-y divide-neutral-100 overflow-hidden">
                    <ListItem 
                      icon={<FileText size={18} />} 
                      label="Start New Print Order" 
                      onClick={() => navigate('/order')}
                    />
                    <ListItem 
                      icon={<CreditCard size={18} />} 
                      label="Payment History" 
                    />
                    <ListItem 
                      icon={<Shield size={18} />} 
                      label="Account Security" 
                    />
                    <button onClick={handleLogout} className="w-full text-left">
                        <ListItem 
                          icon={<LogOut size={18} />} 
                          label="Sign Out" 
                          isLast 
                          danger
                        />
                    </button>
                </div>

                {/* Recent Orders */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Recent Pickup History</h3>
                        <Link to="/orders" className="text-xs font-bold text-amber-600 hover:underline">View All</Link>
                    </div>

                    <div className="space-y-3">
                        {myOrders.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-neutral-200">
                                <History size={32} className="mx-auto mb-4 text-neutral-200" />
                                <p className="text-sm font-medium text-neutral-400">Your print history will appear here.</p>
                            </div>
                        ) : (
                            <AnimatePresence mode='popLayout'>
                                {myOrders.slice(0, 3).map((order) => (
                                    <motion.div 
                                        key={order.id} 
                                        className="bg-white p-5 rounded-2xl border border-neutral-100 flex items-center justify-between group hover:border-neutral-300 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={clsx(
                                                "w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold",
                                                order.status === 'collected' ? "bg-neutral-50 text-neutral-400" : "bg-amber-600 text-white shadow-sm"
                                            )}>
                                                <span className="text-xl leading-none">{order.otp}</span>
                                                <span className="text-[7px] uppercase tracking-wider mt-0.5 opacity-70 font-semibold">OTP</span>
                                            </div>
                                            
                                            <div>
                                                <h4 className="font-bold text-sm text-neutral-800 uppercase tracking-tight">Order #{order.id.slice(-6).toUpperCase()}</h4>
                                                <p className="text-[10px] font-medium text-neutral-400 mt-0.5">
                                                    {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} • {order.files.length} Document(s)
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-sm text-neutral-900">₹{order.totalAmount}</p>
                                            <span className={clsx("text-[9px] font-bold uppercase tracking-wider",
                                                order.status === 'collected' ? "text-neutral-400" :
                                                order.status === 'printed' ? "text-blue-600" : "text-amber-700"
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

function ListItem({ icon, label, onClick, isLast, danger }) {
    return (
        <button 
           onClick={onClick}
           className="w-full flex items-center justify-between p-5 hover:bg-neutral-50 transition-colors text-left group"
        >
            <div className="flex items-center gap-4">
                <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", 
                    danger ? "bg-red-50 text-red-500" : "bg-neutral-50 text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white"
                )}>
                    {icon}
                </div>
                <span className={clsx("font-bold text-sm", 
                    danger ? "text-red-500" : "text-neutral-700 group-hover:text-black"
                )}>{label}</span>
            </div>
            <ChevronRight size={18} className={clsx("transition-transform group-hover:translate-x-1", danger ? "text-red-300" : "text-neutral-300")} />
        </button>
    );
}
