import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, CheckCircle, Printer, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function OrdersPage() {
    const { orders } = useOrder();
    const { user } = useAuth();

    // Filter orders (AuthContext/OrderContext already filters by user, but safety check)
    const myOrders = orders.filter(o => o.userId === user?.id || o.userId === user?.uid);

    const activeOrders = myOrders.filter(o => o.status !== 'collected');
    const pastOrders = myOrders.filter(o => o.status === 'collected');

    return (
        <div className="min-h-screen bg-[#FBFBFD] pb-32 font-sans text-gray-900 selection:bg-primary/10 selection:text-primary">
            {/* Dynamic Header */}
            <header className="bg-white/60 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-40 px-6 py-6 transition-all duration-300">
                <div className="max-w-xl mx-auto flex items-center gap-6">
                    <Link to="/home" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 shadow-sm">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Orders</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-0.5">Live History Tracking</p>
                    </div>
                </div>
            </header>

            <div className="container max-w-xl mx-auto p-6 space-y-12">

                {/* Active Orders Section */}
                <section>
                    <div className="flex items-center justify-between mb-8 ml-1">
                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Current Queue</h2>
                        {activeOrders.length > 0 && <span className="w-2 h-2 bg-primary rounded-full animate-ping" />}
                    </div>
                    {activeOrders.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[2.5rem] p-12 text-center border border-dashed border-gray-100 shadow-sm"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <Clock size={32} />
                            </div>
                            <p className="text-gray-400 font-bold mb-6">No pending prints</p>
                            <Link to="/order" className="bg-black text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-block">New Print</Link>
                        </motion.div>
                    ) : (
                        <div className="grid gap-6">
                            {activeOrders.map((order, idx) => (
                                <OrderCard key={order.id} order={order} active delay={idx * 0.1} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Past Orders Section */}
                <section>
                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 ml-1">Archive</h2>
                    {pastOrders.length === 0 ? (
                        <div className="text-center py-12 text-gray-300 font-bold text-sm lowercase italic">History empty</div>
                    ) : (
                        <div className="grid gap-6">
                            {pastOrders.map((order, idx) => (
                                <OrderCard key={order.id} order={order} delay={idx * 0.05} />
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}

function OrderCard({ order, active, delay = 0 }) {
    const statusConfig = {
        paid: { color: 'text-primary', bg: 'bg-primary/5', icon: <Clock size={20} />, label: 'In Queue' },
        printed: { color: 'text-orange-600', bg: 'bg-orange-50', icon: <Printer size={20} />, label: 'Ready for Pickup' },
        collected: { color: 'text-gray-400', bg: 'bg-gray-50', icon: <CheckCircle size={20} />, label: 'Collected' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={clsx(
                "bg-white p-6 rounded-[2.5rem] shadow-xl shadow-black/[0.02] border transition-all duration-500 relative overflow-hidden group",
                active ? (order.status === 'printed' ? "border-orange-200" : "border-primary/20") : "border-gray-100"
            )}
        >
            {/* Card Content Wrapper */}
            <div className="relative z-10 space-y-6">
                
                {/* Header Profile Info */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className={clsx(
                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-sm",
                            status.bg, status.color
                        )}>
                            {status.icon}
                        </div>
                        <div>
                            <h3 className="font-black text-gray-900 text-lg tracking-tight">Order #{order.id.slice(-4).toUpperCase()}</h3>
                            <div className="flex items-center gap-2 mt-1 opacity-40">
                                <Clock size={12} className="text-gray-400" />
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                    {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-gray-900 tracking-tighter">₹{order.totalAmount}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{order.files.length} Unit{order.files.length > 1 ? 's' : ''}</p>
                    </div>
                </div>

                {/* OTP Section (Only for Active) */}
                {active && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50/50 rounded-3xl p-6 flex justify-between items-center border border-gray-100/50 group-hover:bg-white transition-colors duration-500"
                    >
                        <div>
                            <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.2em] mb-1">Pick up token</p>
                            <p className="text-[11px] text-gray-400 font-bold">Present this to the shop</p>
                        </div>
                        <div className="text-4xl font-mono font-black text-gray-900 tracking-[0.1em] bg-white px-5 py-3 rounded-2xl shadow-xl shadow-black/[0.03] border border-gray-100 group-hover:scale-105 transition-transform duration-500">
                            {order.otp}
                        </div>
                    </motion.div>
                )}

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-2">
                    <div className={clsx(
                        "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm",
                        status.bg, status.color
                    )}>
                        <div className={clsx("w-1.5 h-1.5 rounded-full bg-current", active && "animate-pulse")} />
                        {status.label}
                    </div>
                    <button className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-black transition-all flex items-center gap-2 group/btn">
                        View Receipt <ArrowLeft size={14} className="rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Premium Decorative elements */}
            {active && (
                <div className={clsx(
                    "absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] -mr-24 -mt-24 pointer-events-none transition-colors duration-1000",
                    order.status === 'printed' ? "bg-orange-500/10" : "bg-primary/5"
                )} />
            )}
        </motion.div>
    );
}
