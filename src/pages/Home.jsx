import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Search, 
    User, 
    Zap, 
    FileText, 
    Image as ImageIcon, 
    PenTool, 
    Sparkles, 
    ArrowRight, 
    Home as HomeIcon, 
    Clock, 
    LayoutDashboard,
    Bell,
    Settings,
    LogOut,
    CheckCircle2,
    Loader2,
    MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
    const { user, logout } = useAuth();
    const { orders, currentOrder, addStationeryItem } = useOrder();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const activeOrders = orders.filter(o => o.status !== 'collected');
    const cartCount = currentOrder.files.length;

    const handleAddToCart = (name, price) => {
        addStationeryItem({ name, price });
    };

    return (
        <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-blue-600/10 transition-all duration-500 overflow-x-hidden">
            {/* Ambient Background Blobs */}
            <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-400/5 blur-[100px] -z-0 pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-purple-400/5 blur-[100px] -z-0 pointer-events-none" />

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 bg-white/40 backdrop-blur-3xl border-r border-gray-100/50 z-50">
                <div className="p-8">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 mb-12"
                    >
                        <img src="/assets/logo.png" className="w-12 h-12 rounded-2xl shadow-2xl shadow-black/20 rotate-3 object-cover" alt="Logo" />
                        <span className="font-black text-2xl tracking-tighter text-gray-950">JPRINT.</span>
                    </motion.div>
                    
                    <nav className="space-y-2">
                        <NavItem icon={<HomeIcon size={20} />} label="Home" active />
                        <NavItem icon={<Clock size={20} />} label="My Orders" onClick={() => navigate('/orders')} />
                        <NavItem icon={<User size={20} />} label="Identity" onClick={() => navigate('/profile')} />
                        {user?.role === 'vendor' && (
                            <NavItem icon={<LayoutDashboard size={20} />} label="Control Panel" onClick={() => navigate('/vendor')} />
                        )}
                    </nav>
                </div>
                
                <div className="mt-auto p-8">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-black text-white rounded-[2rem] p-6 shadow-2xl shadow-black/10 border border-white/10 overflow-hidden relative group"
                    >
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">Live Fleet</p>
                            <h4 className="font-bold text-sm mb-4">Need print support?</h4>
                            <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors">
                                Messenger <ArrowRight size={14} />
                            </a>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </motion.div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:pl-72 min-h-screen relative z-10">
                
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 bg-[#FBFBFD]/40 backdrop-blur-3xl border-b border-gray-100/50">
                    <div className="max-w-5xl mx-auto px-6 h-24 flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-2xl font-black tracking-tighter lg:hidden flex items-center gap-3">
                                <img src="/assets/logo.png" className="w-10 h-10 rounded-xl shadow-xl shadow-black/10 object-cover" alt="Logo" />
                                JPRINT
                            </h1>
                            <div className="hidden lg:block">
                                <h1 className="text-3xl font-black tracking-tight text-gray-950">
                                    <span className="text-gray-300 font-bold">Yo,</span> {user?.name?.split(' ')[0] || 'Student'}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase">Status: Fleet Active • JIIT 128</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-5">
                            <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:shadow-xl transition-all relative group shadow-sm">
                                <Bell size={22} />
                                {activeOrders.length > 0 && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white animate-pulse"></span>}
                            </button>
                            <motion.div 
                                onClick={() => navigate('/profile')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-lg cursor-pointer shadow-2xl shadow-black/20 overflow-hidden relative group"
                            >
                                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10">{user?.name ? user.name[0].toUpperCase() : <User size={22} />}</span>
                            </motion.div>
                        </div>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto px-6 py-10 pb-32">
                    
                    {/* Active Orders Dynamic Section */}
                    <AnimatePresence>
                        {activeOrders.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="mb-10"
                            >
                                <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-black/20">
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="space-y-2">
                                            <div className="inline-flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                <Zap size={14} className="fill-current" /> Live tracking
                                            </div>
                                            <h2 className="text-3xl font-black tracking-tight">{activeOrders.length} Order{activeOrders.length > 1 ? 's' : ''} in Progress</h2>
                                            <p className="text-white/50 text-sm font-medium">Head to the campus shop once your status hits 'Ready'.</p>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/orders')}
                                            className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl"
                                        >
                                            Track Orders <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none opacity-50" />
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -bottom-20 -right-20 w-64 h-64 border-[40px] border-white/5 rounded-full pointer-events-none"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Quick Access Grid (Staggered Entry) */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="grid md:grid-cols-3 gap-6 mb-16"
                    >
                        <QuickCard 
                            to="/order"
                            title="Print Documents"
                            desc="PDFs, Notes, Study Material"
                            icon={<FileText size={28} />}
                            color="bg-blue-600"
                            className="md:col-span-2"
                        />
                        <QuickCard 
                            to="/order"
                            title="Visual Design"
                            desc="Premium Posters"
                            icon={<ImageIcon size={28} />}
                            color="bg-purple-600"
                        />
                         <QuickCard 
                            to="/order"
                            title="Stationery"
                            desc="Pens, Files, Essentials"
                            icon={<PenTool size={28} />}
                            color="bg-orange-500"
                        />
                         <QuickCard 
                            to="/orders"
                            title="Recent History"
                            desc="Access previous orders"
                            icon={<Clock size={28} />}
                            color="bg-gray-900"
                            className="md:col-span-2"
                        />
                    </motion.div>

                    {/* Stationery Store Dynamic section */}
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-black flex items-center gap-3 tracking-tighter">
                                <PenTool size={28} className="text-orange-500" /> Essentials Shop
                            </h3>
                            <button className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Explore All</button>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <StationeryItem 
                                name="Pentonic Ball Pen" 
                                price={10} 
                                desc="Super smooth • Midnight Blue"
                                onAdd={() => handleAddToCart("Pentonic Ball Pen", 10)}
                            />
                            <StationeryItem 
                                name="Premium Stick File" 
                                price={20} 
                                desc="A4 Glass Finish • Transparent"
                                onAdd={() => handleAddToCart("Saddle Stick File", 20)}
                            />
                            <StationeryItem 
                                name="Apsara Platinum Set" 
                                price={5} 
                                desc="Extra Dark • Standard Graphite"
                                onAdd={() => handleAddToCart("Apsara Platinum", 5)}
                            />
                        </div>
                    </section>

                    <FeedbackForm />
                </div>
            </main>

            {/* Mobile Dynamic Bottom Bar */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 h-20 glass rounded-[2.5rem] border border-white/50 shadow-2xl flex items-center justify-around px-4 z-[60]">
                <MobileNavItem icon={<HomeIcon size={24} />} label="Home" active />
                <MobileNavItem icon={<Clock size={24} />} label="Orders" onClick={() => navigate('/orders')} />
                <div className="relative -top-6">
                    <motion.button 
                        onClick={() => navigate('/order')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-2xl shadow-black/30 group"
                    >
                        <Zap size={28} className="fill-current group-hover:scale-110 transition-transform" />
                    </motion.button>
                </div>
                {user?.role === 'vendor' ? (
                    <MobileNavItem icon={<LayoutDashboard size={24} />} label="Stats" onClick={() => navigate('/database')} />
                ) : (
                    <MobileNavItem 
                        icon={<MessageCircle size={24} />} 
                        label="Support" 
                        onClick={() => window.open('https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6', '_blank')} 
                    />
                )}
                <MobileNavItem icon={<User size={24} />} label="Me" onClick={() => navigate('/profile')} />
            </div>

            {/* Floating Dynamic Cart */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-32 left-8 right-8 lg:left-auto lg:right-12 lg:bottom-12 z-[70]"
                    >
                        <button 
                            onClick={() => navigate('/order')}
                            className="w-full lg:w-96 bg-blue-600 text-white p-2 rounded-[2.25rem] font-bold shadow-2xl shadow-blue-600/30 group active:scale-95 transition-transform"
                        >
                            <div className="bg-white/10 rounded-[2rem] p-4 flex items-center justify-between px-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center font-black">{cartCount}</div>
                                    <div className="text-left">
                                        <p className="text-xs opacity-60 uppercase tracking-widest font-black">Checkout</p>
                                        <p className="text-sm font-black">Ready to print</p>
                                    </div>
                                </div>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all ${active ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
        >
            {icon}
            {label}
        </button>
    );
}

function MobileNavItem({ icon, label, active, onClick }) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-black' : 'text-gray-300'}`}>
            {icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}

function QuickCard({ title, desc, icon, color, to, className = "" }) {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(to)}
            className={`cursor-pointer rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden group border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
        >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 ${color} text-white rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black mb-3 tracking-tighter text-gray-950">{title}</h3>
            <p className="text-gray-400 text-sm sm:text-base font-bold leading-relaxed">{desc}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none opacity-50" />
        </div>
    );
}

function StationeryItem({ name, price, desc, onAdd }) {
    return (
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center justify-between group hover:border-black/5 hover:shadow-xl transition-all relative overflow-hidden">
            <div className="relative z-10">
                <h4 className="font-black text-gray-950 mb-1 text-lg tracking-tight">{name}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{desc}</p>
                <p className="text-xl font-black mt-4 text-gray-900">₹{price}</p>
            </div>
            <button 
                onClick={onAdd}
                className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:shadow-2xl transition-all active:scale-90 relative z-10"
            >
                <span className="text-3xl leading-none mb-1">+</span>
            </button>
        </div>
    );
}
