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
    Loader2
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
        <div className="min-h-screen bg-[#FBFBFD] text-gray-900 font-sans selection:bg-primary/10 selection:text-primary">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 bg-white/80 backdrop-blur-xl border-r border-gray-100 z-50">
                <div className="p-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-black/10">J.</div>
                        <span className="font-bold text-xl tracking-tighter">JPRINT</span>
                    </motion.div>
                    
                    <nav className="space-y-1">
                        <NavItem icon={<HomeIcon size={20} />} label="Home" active />
                        <NavItem icon={<Clock size={20} />} label="Orders" onClick={() => navigate('/orders')} />
                        <NavItem icon={<User size={20} />} label="Profile" onClick={() => navigate('/profile')} />
                        {user?.role === 'vendor' && (
                            <NavItem icon={<LayoutDashboard size={20} />} label="Vendor Panel" onClick={() => navigate('/vendor')} />
                        )}
                    </nav>
                </div>
                
                <div className="mt-auto p-6">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                    >
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Need Help?</p>
                        <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" className="text-sm font-bold text-black flex items-center gap-2 hover:text-primary transition-colors">
                            Support Team <ArrowRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:pl-64 min-h-screen">
                
                {/* Top Navbar */}
                <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-gray-100/50">
                    <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-xl font-bold tracking-tight lg:hidden flex items-center gap-2">
                                <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">J.</div>
                                JPRINT
                            </h1>
                            <div className="hidden lg:block">
                                <h1 className="text-2xl font-black tracking-tight">
                                    <span className="text-gray-400 font-medium">Hello,</span> {user?.name?.split(' ')[0] || 'Student'}
                                </h1>
                                <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase mt-0.5">Campus Hub • JIIT 128</p>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-4">
                            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all relative group">
                                <Bell size={20} />
                                {activeOrders.length > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white animate-ping"></span>}
                                {activeOrders.length > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>}
                            </button>
                            <motion.div 
                                onClick={() => navigate('/profile')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 text-white border border-gray-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-lg shadow-black/10 overflow-hidden"
                            >
                                {user?.name ? user.name[0].toUpperCase() : <User size={20} />}
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
                                            <div className="inline-flex items-center gap-2 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                <Zap size={14} className="fill-current" /> Live tracking
                                            </div>
                                            <h2 className="text-3xl font-black tracking-tight">{activeOrders.length} Order{activeOrders.length > 1 ? 's' : ''} in Progress</h2>
                                            <p className="text-white/50 text-sm font-medium">Head to the campus shop once your status hits 'Ready'.</p>
                                        </div>
                                        <button 
                                            onClick={() => navigate('/orders')}
                                            className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl"
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
                            color="bg-primary"
                            className="md:col-span-2"
                        />
                        <QuickCard 
                            to="/order"
                            title="Design"
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
                            color="bg-gray-800"
                            className="md:col-span-2"
                        />
                    </motion.div>

                    {/* Stationery Store Dynamic section */}
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black flex items-center gap-3">
                                <PenTool size={24} className="text-orange-500" /> Essentials Shop
                            </h3>
                            <button className="text-xs font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Explore All</button>
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
                {user?.role === 'vendor' && (
                    <MobileNavItem icon={<LayoutDashboard size={24} />} label="Stats" onClick={() => navigate('/database')} />
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
                            className="w-full lg:w-96 bg-primary text-white p-2 rounded-[2.25rem] font-bold shadow-2xl shadow-primary/30 group active:scale-95 transition-transform"
                        >
                            <div className="bg-white/10 rounded-[2rem] p-4 flex items-center justify-between px-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white text-primary rounded-xl flex items-center justify-center font-black">{cartCount}</div>
                                    <div className="text-left">
                                        <p className="text-xs opacity-60 uppercase tracking-widest font-black">Checkout</p>
                                        <p className="text-sm">In your cart</p>
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
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
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
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
}

function QuickCard({ title, desc, icon, color, to, className = "" }) {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(to)}
            className={`cursor-pointer rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden group border border-gray-100 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${className}`}
        >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">{title}</h3>
            <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">{desc}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        </div>
    );
}

function StationeryItem({ name, price, desc, onAdd }) {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center justify-between group hover:border-black/10 hover:shadow-xl transition-all">
            <div>
                <h4 className="font-bold text-gray-900 mb-0.5">{name}</h4>
                <p className="text-xs text-gray-400 font-medium">{desc}</p>
                <p className="text-sm font-black mt-2">₹{price}</p>
            </div>
            <button 
                onClick={onAdd}
                className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:shadow-lg transition-all active:scale-90"
            >
                <span className="text-2xl leading-none mb-1">+</span>
            </button>
        </div>
    );
}
