import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, CheckCircle, Printer, FileText, ChevronRight, LayoutGrid, Sparkles } from 'lucide-react';
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
        <div className="min-h-screen bg-white pb-24 font-sans text-black overflow-x-hidden selection:bg-orange-500/20">
            {/* Header Unit */}
            <header className="glass-morphism border-b border-black/5 sticky top-0 z-50 px-6 py-5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-2xl border border-black/5 flex items-center justify-center hover:bg-neutral-50 transition-all group">
                             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform text-black" />
                        </button>
                        <div>
                            <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400 leading-none mb-1.5">Transaction Core</h1>
                            <p className="font-black text-xl tracking-tighter uppercase text-black">PRODUCTION LOGS<span className="text-orange-500">.</span></p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-xl mx-auto p-6 md:p-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Active Portfolio */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">LIVE BATCHES</h2>
                        <span className="px-3 py-1 bg-orange-500/5 text-orange-500 text-[8px] font-black uppercase tracking-widest rounded-full border border-orange-500/10">Synchronized</span>
                    </div>
                    
                    {activeOrders.length === 0 ? (
                        <div className="bg-neutral-50 rounded-[48px] p-16 text-center border border-dashed border-black/5">
                            <LayoutGrid size={40} className="mx-auto mb-6 text-neutral-200" />
                            <h3 className="font-black text-2xl tracking-tighter uppercase text-black">QUEUE VACANT</h3>
                            <Link to="/order" className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] mt-3 inline-block hover:bg-orange-500/5 px-6 py-3 rounded-full border border-orange-500/10 transition-all">INITIALIZE NEW ORDER</Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {activeOrders.map(order => (
                                <OrderCard key={order.id} order={order} active />
                            ))}
                        </div>
                    )}
                </section>

                {/* Historical Archive */}
                <section className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em]">ARCHIVED SEQUENCES</h2>
                    </div>
                    
                    {pastOrders.length === 0 ? (
                        <div className="text-center py-12 text-neutral-300 font-black text-[10px] uppercase tracking-[0.4em]">No architectural history found</div>
                    ) : (
                        <div className="space-y-6 opacity-60 hover:opacity-100 transition-opacity">
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
        paid: { color: 'text-orange-600', bg: 'bg-orange-500/5', border: 'border-orange-500/10', icon: <Clock size={16} />, label: 'PROCESSING' },
        printed: { color: 'text-blue-600', bg: 'bg-blue-500/5', border: 'border-blue-500/10', icon: <Printer size={16} />, label: 'PORTAL READY' },
        collected: { color: 'text-neutral-400', bg: 'bg-neutral-50', border: 'border-black/5', icon: <CheckCircle size={16} />, label: 'ARCHIVED' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={clsx(
                "bg-white p-8 rounded-[40px] shadow-premium border border-black/5 flex flex-col gap-8 relative overflow-hidden transition-all group",
                active && "hover:shadow-ultra hover:border-orange-500/20"
            )}
        >
            {/* Header Unit */}
            <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-5">
                    <div className={clsx("w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform", status.bg, status.color, status.border, "border")}>
                        {status.icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-lg tracking-tighter uppercase text-black">BATCH #{order.id.slice(-4)}</h3>
                            <span className={clsx("px-2.5 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border", status.bg, status.color, status.border)}>
                                {status.label}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] flex items-center gap-2">
                            <Clock size={12} className="text-orange-500" /> {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="font-black text-xl tracking-tighter text-black block mb-1">₹{order.totalAmount}</span>
                    <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">{order.files.length} ASSETS</span>
                </div>
            </div>

            {/* OTP Interface (Only for Active States) */}
            {active && (
                <div className="bg-neutral-50 rounded-[32px] p-6 flex justify-between items-center border border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-2xl pointer-events-none" />
                    <div>
                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-2">ACCESS OTP KEY</p>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.1em]">Show terminal operator for release</p>
                    </div>
                    <div className="text-4xl font-black italic text-black tracking-[0.2em] bg-white px-6 py-3 rounded-2xl shadow-xl border border-black/5">
                        {order.otp}
                    </div>
                </div>
            )}

            {/* Actions Unit */}
            <div className="flex justify-between items-center pt-6 border-t border-black/5 relative z-10">
                <div className="flex -space-x-3">
                    {order.files.map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-neutral-50 flex items-center justify-center">
                            <FileText size={12} className="text-orange-500" />
                        </div>
                    ))}
                </div>
                <button className="text-[10px] font-black text-neutral-400 hover:text-black transition-all uppercase tracking-[0.3em] flex items-center gap-2 group/btn">
                    Batch Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Decoration Elements */}
            {active && (
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/[0.02] rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-orange-500/[0.05] transition-all" />
            )}
        </motion.div>
    );
}
