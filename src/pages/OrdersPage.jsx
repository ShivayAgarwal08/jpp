import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Clock, CheckCircle, Printer, FileText, ChevronRight, LayoutGrid, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function OrdersPage() {
    const { orders } = useOrder();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Filter orders (AuthContext/OrderContext already filters by user, but safety check)
    const myOrders = orders.filter(o => o.userId === user?.id || o.userId === user?.uid);

    const activeOrders = myOrders.filter(o => o.status !== 'collected');
    const pastOrders = myOrders.filter(o => o.status === 'collected');

    return (
        <div className="min-h-screen bg-neutral-50 pb-24 font-sans text-neutral-800 overflow-x-hidden selection:bg-amber-100">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-50 px-6 py-4">
                <div className="max-w-xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-neutral-50 transition-colors text-neutral-500">
                         <ChevronLeft size={24} />
                    </button>
                    <div className="text-center">
                        <h1 className="font-bold text-neutral-900">My Orders</h1>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Order Tracking</p>
                    </div>
                    <div className="w-10" />
                </div>
            </header>

            <div className="max-w-xl mx-auto p-6 space-y-12 mt-4">

                {/* Active Orders */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Active Orders</h2>
                        {activeOrders.length > 0 && <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md border border-amber-100">In Progress</span>}
                    </div>
                    
                    {activeOrders.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-neutral-200 shadow-sm">
                            <LayoutGrid size={32} className="mx-auto mb-4 text-neutral-100" />
                            <h3 className="font-bold text-neutral-900">No Active Orders</h3>
                            <p className="text-xs text-neutral-400 mt-1 mb-6 font-medium">You don't have any ongoing print orders.</p>
                            <Link to="/order" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-all">
                                Place New Order <ChevronRight size={14} />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {activeOrders.map(order => (
                                <OrderCard key={order.id} order={order} active />
                            ))}
                        </div>
                    )}
                </section>

                {/* Past Orders */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Picked Up Recently</h2>
                    </div>
                    
                    {pastOrders.length === 0 ? (
                        <div className="text-center py-10 text-neutral-300 font-medium text-xs">No previous order history.</div>
                    ) : (
                        <div className="space-y-4 opacity-70 hover:opacity-100 transition-opacity">
                            {pastOrders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}

function OrderCard({ order, active }) {
    const statusConfig = {
        paid: { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', icon: <Clock size={16} />, label: 'PROCESSING' },
        printed: { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', icon: <Printer size={16} />, label: 'READY FOR PICKUP' },
        collected: { color: 'text-neutral-400', bg: 'bg-neutral-50', border: 'border-neutral-100', icon: <CheckCircle size={16} />, label: 'COLLECTED' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "bg-white p-6 rounded-[28px] shadow-sm border border-neutral-200 transition-all group",
                active && "hover:shadow-md hover:border-amber-600/20"
            )}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center font-bold border", status.bg, status.color, status.border)}>
                        {status.icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-bold text-neutral-900 uppercase tracking-tight text-sm">Order #{order.id.slice(-6).toUpperCase()}</h3>
                        </div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock size={10} className="text-amber-600" /> {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-bold text-neutral-900 block mb-0.5">₹{order.totalAmount}</span>
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{order.files.length} Item(s)</span>
                </div>
            </div>

            {/* OTP Key */}
            {active && (
                <div className="bg-neutral-50 rounded-2xl p-5 flex justify-between items-center border border-neutral-100 mb-6">
                    <div>
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Pickup Code</p>
                        <p className="text-[10px] font-medium text-neutral-500 max-w-[120px]">Show this code to the shopkeeper</p>
                    </div>
                    <div className="text-3xl font-bold italic text-neutral-900 tracking-widest bg-white px-5 py-2 rounded-xl border border-neutral-100 shadow-sm">
                        {order.otp}
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center pt-5 border-t border-neutral-100">
                <div className={clsx("text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider flex items-center gap-2", status.bg, status.color, status.border)}>
                    <div className={clsx("w-1.5 h-1.5 rounded-full animate-pulse", order.status === 'collected' ? "bg-neutral-300" : "bg-current")} />
                    {status.label}
                </div>
                <button className="text-xs font-bold text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-1 group/btn">
                    Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}
