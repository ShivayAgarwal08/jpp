import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Clock, CheckCircle, Printer, FileText, Zap, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function OrdersPage() {
    const { orders, loading, error } = useOrder();
    const { user } = useAuth();
    const navigate = useNavigate();

    const myOrders = (orders || []).filter(o => o.userId === user?.id || o.userId === user?.uid);
    const activeOrders = myOrders.filter(o => o?.status !== 'collected');
    const pastOrders = myOrders.filter(o => o?.status === 'collected');

    return (
        <div className="min-h-screen bg-[#FDFDFF] pb-32 font-sans text-gray-950 selection:bg-blue-600/10 transition-all duration-500 overflow-x-hidden">
            
            {/* Ambient Background */}
            <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] -z-0 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-purple-600/5 blur-[120px] -z-0 pointer-events-none" />

            {/* Premium Header */}
            <header className="bg-white/40 backdrop-blur-3xl border-b border-gray-100/50 sticky top-0 z-40 px-6 h-24 flex items-center justify-between">
                <div className="max-w-xl mx-auto w-full flex items-center gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/home')}
                        className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-all shadow-sm group"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </motion.button>
                    <div>
                        <h1 className="text-3xl font-black tracking-tighter">Logistics Archive.</h1>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1">Real-time Terminal Sync</p>
                    </div>
                </div>
            </header>

            <div className="max-w-xl mx-auto p-6 space-y-16 relative z-10 pt-12">

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col items-center gap-4 text-center"
                    >
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                            <Clock className="rotate-180" size={24} />
                        </div>
                        <div>
                            <p className="text-red-950 font-black tracking-tight text-lg mb-1">Terminal Link Severed</p>
                            <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">{error}</p>
                        </div>
                    </motion.div>
                )}

                {loading && orders.length === 0 && !error && (
                    <div className="py-20 flex flex-col items-center justify-center gap-6">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Synching with Terminal...</p>
                    </div>
                )}

                {/* Active Orders Section */}
                <section>
                    <div className="flex items-center justify-between mb-10 ml-1">
                        <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping" /> Active Operations
                        </h2>
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{activeOrders.length} Objects</span>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {activeOrders.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-gray-100 shadow-sm"
                            >
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
                                    <Clock size={40} />
                                </div>
                                <p className="text-gray-400 font-black text-lg mb-8 tracking-tight uppercase tracking-widest">Terminal Queue Empty</p>
                                <Link to="/order" className="bg-black text-white px-10 py-4 rounded-[1.25rem] font-black text-sm shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-block uppercase tracking-widest">Initial Shipment</Link>
                            </motion.div>
                        ) : (
                            <div className="grid gap-8">
                                {activeOrders.map((order, idx) => (
                                    <OrderCard key={order.id} order={order} active delay={idx * 0.1} />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Past Orders Section */}
                <section>
                    <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-10 ml-1">Historical Logs</h2>
                    {pastOrders.length === 0 ? (
                        <div className="text-center py-20 text-gray-300 font-black text-xs uppercase tracking-widest opacity-40">No historical data available</div>
                    ) : (
                        <div className="grid gap-8">
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
        paid: { color: 'text-blue-600', bg: 'bg-blue-600/5', icon: <Zap size={22} className="fill-current" />, label: 'IN OPERATION' },
        printed: { color: 'text-orange-600', bg: 'bg-orange-50', icon: <Printer size={22} />, label: 'ASSET READY' },
        collected: { color: 'text-gray-400', bg: 'bg-gray-50', icon: <CheckCircle size={22} />, label: 'DEPLOYED' }
    };

    const status = statusConfig[order.status] || statusConfig.paid;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className={clsx(
                "bg-white p-8 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] border transition-all duration-500 relative overflow-hidden group",
                active ? (order.status === 'printed' ? "border-orange-200 ring-4 ring-orange-500/5" : "border-blue-600/20 ring-4 ring-blue-600/5") : "border-gray-100"
            )}
        >
            <div className="relative z-10 space-y-8">
                
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                        <div className={clsx(
                            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6 duration-500 shadow-sm shadow-inner",
                            status.bg, status.color
                        )}>
                            {status.icon}
                        </div>
                        <div>
                            <h3 className="font-black text-gray-950 text-xl tracking-tighter">ORDER PIN: {order.otp}</h3>
                            <div className="flex items-center gap-3 mt-1.5 grayscale group-hover:grayscale-0 transition-all">
                                <Clock size={14} className="text-gray-400" />
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                {order.created_at ? new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date Unavailable'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black text-gray-950 tracking-tighter">₹{order.totalAmount}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1.5 bg-gray-50 px-3 py-1 rounded-full">{(order.files || []).length} UNIT{(order.files || []).length !== 1 ? 'S' : ''}</p>
                    </div>
                </div>

                {active && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-[2rem] p-8 flex justify-between items-center border border-gray-100 group-hover:bg-white group-hover:border-blue-600/10 transition-all duration-700"
                    >
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Hardware Auth PIN</p>
                            <p className="text-xs text-gray-400 font-bold">Present at Terminal</p>
                        </div>
                        <div className="text-5xl font-mono font-black text-gray-950 tracking-[0.1em] bg-white px-6 py-4 rounded-2xl shadow-xl shadow-black/[0.04] border border-gray-100 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-700 leading-none">
                            {order.otp}
                        </div>
                    </motion.div>
                )}

                <div className="flex justify-between items-center">
                    <div className={clsx(
                        "px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg",
                        status.bg, status.color
                    )}>
                        <div className={clsx("w-2 h-2 rounded-full", active ? "bg-current animate-pulse shadow-[0_0_10px_currentColor]" : "bg-current")} />
                        {status.label}
                    </div>
                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-all flex items-center gap-2 group/btn">
                        Order Assets <ChevronRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>

            {active && (
                <div className={clsx(
                    "absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none transition-colors duration-1000 opacity-60",
                    order.status === 'printed' ? "bg-orange-500/10" : "bg-blue-600/10"
                )} />
            )}
        </motion.div>
    );
}
