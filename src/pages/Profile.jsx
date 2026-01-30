import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Wallet, History, ChevronRight, LogOut, FileText, CheckCircle, Clock, Printer, Shield, CreditCard, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export default function Profile() {
    const { user, logout } = useAuth();
    const { orders } = useOrder();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const walletBalance = 150.00;
    const myOrders = orders.filter(o => o.userId === user?.id);

    return (
        <div className="min-h-screen bg-neutral-50 pb-24 font-sans text-gray-900">

            {/* Premium Header */}
            <div className="bg-white px-6 pt-8 pb-6 sticky top-0 z-30 border-b border-gray-100/50 backdrop-blur-xl bg-white/80">
                <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600">
                        <ArrowLeft size={18} />
                    </Link>
                    <h1 className="font-bold text-sm uppercase tracking-widest text-gray-400">Account</h1>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600 relative">
                        <Bell size={18} />
                        <span className="w-2 h-2 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-white" />
                    </button>
                </div>

                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 text-white flex items-center justify-center text-3xl font-bold shadow-xl ring-4 ring-white">
                        {user?.name?.[0].toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name || 'Guest User'}</h2>
                        <p className="text-gray-500 font-medium text-sm">{user?.email || 'Sign in to view orders'}</p>
                        <div className="mt-2 flex gap-2">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Student</span>
                            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">verified</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container max-w-md mx-auto px-4 mt-6 space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-700">

                {/* Wallet Card */}
                <div className="bg-black text-white p-6 rounded-3xl shadow-xl shadow-black/20 relative overflow-hidden">
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total Balance</p>
                            <h3 className="text-4xl font-bold tracking-tight opacity-50">₹ --.--</h3>
                            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white font-medium mt-1 inline-block">Coming Soon</span>
                        </div>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Wallet size={20} />
                        </div>
                    </div>
                    <div className="mt-8 flex gap-3 relative z-10">
                        <button className="flex-1 bg-white text-black py-2.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors">
                            + Add Money
                        </button>
                        <Link to="/orders" className="flex-1 bg-white/10 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 flex items-center justify-center">
                            History
                        </Link>
                    </div>
                    {/* Decorative */}
                    <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-green-500/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Menu List */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                    <ListItem icon={<FileText size={18} />} color="text-blue-600" bg="bg-blue-50" label="Start New Order" to="/order" />
                    <ListItem icon={<CreditCard size={18} />} color="text-purple-600" bg="bg-purple-50" label="Payment Methods" />
                    <ListItem icon={<Shield size={18} />} color="text-orange-600" bg="bg-orange-50" label="Privacy & Security" />
                    <button onClick={handleLogout} className="w-full text-left">
                        <ListItem icon={<LogOut size={18} />} color="text-red-600" bg="bg-red-50" label="Sign Out" isLast />
                    </button>
                </div>

                {/* Order History */}
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4 ml-1">Recent Activity</h3>

                    <div className="space-y-4">
                        {myOrders.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                                    <History size={24} />
                                </div>
                                <p className="text-gray-900 font-bold text-sm">No orders yet</p>
                                <p className="text-gray-400 text-xs">Your print history will appear here.</p>
                            </div>
                        ) : (
                            myOrders.map(order => (
                                <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex gap-4 group hover:border-black/5 transaction-colors">
                                    <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                                        order.status === 'collected' ? "bg-green-100 text-green-600" :
                                            order.status === 'printed' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                    )}>
                                        {order.status === 'collected' ? <CheckCircle size={20} /> :
                                            order.status === 'printed' ? <Printer size={20} /> : <Clock size={20} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <h4 className="font-bold text-gray-900 text-sm">Print Order</h4>
                                            <span className="font-bold text-sm">₹{order.totalAmount}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">{new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {order.files.length} Item(s)</p>

                                        <div className="flex items-center gap-2">
                                            {order.status !== 'collected' && (
                                                <div className="bg-gray-900 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-md">
                                                    OTP: {order.otp}
                                                </div>
                                            )}
                                            <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide",
                                                order.status === 'collected' ? "bg-green-50 text-green-700" :
                                                    order.status === 'printed' ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                                            )}>
                                                {order.status === 'paid' ? 'Processing' : order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

function ListItem({ icon, color, bg, label, to, isLast }) {
    const Content = (
        <div className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${!isLast ? '' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center font-bold`}>
                    {icon}
                </div>
                <span className="font-bold text-gray-700 text-sm">{label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
        </div>
    );

    if (to) return <Link to={to}>{Content}</Link>;
    return Content;
}
