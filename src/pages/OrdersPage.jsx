import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, CheckCircle, Printer, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export default function OrdersPage() {
    const { orders } = useOrder();
    const { user } = useAuth();

    // Filter orders (AuthContext/OrderContext already filters by user, but safety check)
    const myOrders = orders.filter(o => o.userId === user?.id || o.userId === user?.uid);

    const activeOrders = myOrders.filter(o => o.status !== 'collected');
    const pastOrders = myOrders.filter(o => o.status === 'collected');

    return (
        <div className="min-h-screen bg-neutral-50 pb-24 font-sans text-gray-900 selection:bg-black selection:text-white">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-30 px-6 py-5">
                <div className="flex items-center gap-4">
                    <Link to="/profile" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold">My Orders</h1>
                </div>
            </header>

            <div className="container max-w-md mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Active Orders Section */}
                <section>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Active Orders</h2>
                    {activeOrders.length === 0 ? (
                        <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-gray-200">
                            <p className="text-gray-400 text-sm font-medium">No active orders</p>
                            <Link to="/order" className="text-blue-600 font-bold text-sm mt-2 inline-block hover:underline">Start a new order</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeOrders.map(order => (
                                <OrderCard key={order.id} order={order} active />
                            ))}
                        </div>
                    )}
                </section>

                {/* Past Orders Section */}
                <section>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Past History</h2>
                    {pastOrders.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 text-sm">No past orders found</div>
                    ) : (
                        <div className="space-y-4">
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
        paid: { color: 'text-blue-600', bg: 'bg-blue-50', icon: <Clock size={16} />, label: 'Processing' },
        printed: { color: 'text-amber-600', bg: 'bg-amber-50', icon: <Printer size={16} />, label: 'Ready to Collect' },
        collected: { color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle size={16} />, label: 'Collected' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={clsx(
                "bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 relative overflow-hidden",
                active && order.status === 'printed' && "ring-2 ring-amber-500/20"
            )}
        >
            {/* Header */}
            <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-3">
                    <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", status.bg, status.color)}>
                        {status.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">Order #{order.id.slice(-4)}</h3>
                        <p className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-2">
                            <Clock size={12} /> {new Date(order.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-bold text-gray-900 block text-sm">₹{order.totalAmount}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{order.files.length} items</span>
                </div>
            </div>

            {/* OTP Section (Only for Active) */}
            {active && (
                <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center border border-gray-100/50">
                    <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">One Time Password</p>
                        <p className="text-xs text-gray-500 font-medium">Show at counter</p>
                    </div>
                    <div className="text-3xl font-mono font-bold text-gray-900 tracking-widest bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                        {order.otp}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center pt-2 border-t border-gray-50 z-10">
                <div className={clsx("text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1.5", status.bg, status.color)}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {status.label}
                </div>
                <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                    View Details
                </button>
            </div>

            {/* Decoration */}
            {active && order.status === 'printed' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            )}
        </motion.div>
    );
}
