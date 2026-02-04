import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Zap, 
  FileText, 
  Image as ImageIcon, 
  PenTool, 
  TrendingUp, 
  ArrowRight,
  ShoppingCart,
  LayoutGrid,
  Bell,
  Printer,
  ChevronRight,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../context/OrderContext';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
  const { user } = useAuth();
  const { addStationeryItem, currentOrder } = useOrder();
  const navigate = useNavigate();

  const handleAddToCart = (name, price) => {
    addStationeryItem({ name, price });
  };

  const cartCount = currentOrder.files.length;

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-800 font-sans pb-20 selection:bg-amber-100">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-neutral-900 rounded-lg flex items-center justify-center font-bold text-white">J</div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">JPRINT<span className="text-amber-600">.</span></h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 rounded-lg hover:bg-neutral-50 transition-colors relative text-neutral-400">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
             </button>
             <Link to={user?.role === 'vendor' ? "/vendor" : (user ? "/profile" : "/login")}>
                <div className="flex items-center gap-3 p-1 rounded-full bg-neutral-100 transition-all border border-neutral-200 hover:bg-neutral-200">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-600 font-bold border border-amber-100">
                     {user?.name?.[0].toUpperCase() || <User size={16} />}
                   </div>
                   <span className="text-xs font-bold mr-3 hidden sm:block">My Account</span>
                </div>
             </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 space-y-12">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
              Sector 128 Campus Hub
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              What would you like <br />to <span className="text-amber-600">print today?</span>
            </h2>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search services or products..." 
              className="w-full pl-11 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600/30 transition-all font-medium text-sm"
            />
          </div>
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/order" className="md:col-span-2 group relative overflow-hidden bg-neutral-900 rounded-[32px] p-10 flex flex-col justify-between h-[300px] shadow-lg shadow-neutral-200">
             <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[60px] rounded-full -mr-20 -mt-20" />
             <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-6">
                  <Printer size={26} />
                </div>
                <h3 className="text-4xl font-bold text-white tracking-tight mb-2">Print Documents</h3>
                <p className="text-neutral-400 font-medium text-sm">Upload PDF, DOCX or Images for immediate printing.</p>
             </div>
             <div className="relative z-10 flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                Start Order <ArrowRight size={18} className="text-amber-500" />
             </div>
          </Link>

          <div className="space-y-6">
             <Link to="/profile" className="block group bg-white border border-neutral-200 rounded-[32px] p-8 h-[140px] flex flex-col justify-between hover:border-amber-600/30 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-xl bg-neutral-50 text-neutral-900 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <History size={22} />
                  </div>
                  <ChevronRight size={18} className="text-neutral-300 group-hover:text-amber-600 transition-all group-hover:translate-x-1" />
                </div>
                <div className="font-bold text-sm text-neutral-700">Order History</div>
             </Link>
             <Link to="/order" className="block group bg-white border border-neutral-200 rounded-[32px] p-8 h-[140px] flex flex-col justify-between hover:border-amber-600/30 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-xl bg-neutral-50 text-neutral-900 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <FileText size={22} />
                  </div>
                  <ChevronRight size={18} className="text-neutral-300 group-hover:text-amber-600 transition-all group-hover:translate-x-1" />
                </div>
                <div className="font-bold text-sm text-neutral-700">Lab Manuals</div>
             </Link>
          </div>
        </section>

        {/* Quick Links */}
        <section className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide py-2">
          {['Academic', 'Stationery', 'Manuals', 'Posters', 'ID Cards'].map((label, i) => (
            <button key={i} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-neutral-200 text-sm font-semibold text-neutral-600 hover:border-amber-600 hover:text-amber-600 transition-all whitespace-nowrap shadow-sm">
              {label}
            </button>
          ))}
        </section>

        {/* Stationery Section */}
        <section className="space-y-8 bg-white border border-neutral-100 rounded-[40px] p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">Stationery Store</h3>
              <p className="text-sm text-neutral-500 font-medium mt-1">Order essential materials for your coursework.</p>
            </div>
            <button className="text-xs font-bold text-neutral-400 hover:text-amber-600 transition-colors">View All Inventory</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <ProductCard 
                title="Black Ball Pen (Pentonic)"
                desc="Smooth writing for long exams."
                price="10"
                icon={<PenTool size={20} className="text-neutral-700" />}
                onClick={() => handleAddToCart("Pentonic Pen", 10)}
             />
             <ProductCard 
                title="Stick File (JIIT Format)"
                desc="Standard file for lab manual submissions."
                price="25"
                icon={<FileText size={20} className="text-neutral-700" />}
                onClick={() => handleAddToCart("Lab Manual File", 25)}
             />
             <ProductCard 
                title="Drawing Pencil Set (H-HB-B)"
                desc="Essential for Engineering Graphics."
                price="45"
                icon={<PenTool size={20} className="text-neutral-700" />}
                onClick={() => handleAddToCart("Pencil Set", 45)}
             />
             <ProductCard 
                title="Glossy A4 Sheets (10pk)"
                desc="High quality sheets for reports."
                price="85"
                icon={<ImageIcon size={20} className="text-neutral-700" />}
                onClick={() => handleAddToCart("A4 Glossy Pack", 85)}
             />
          </div>
        </section>

        {/* Operator Support */}
        <section className="bg-amber-600 rounded-[32px] p-12 text-white relative overflow-hidden shadow-xl shadow-amber-200">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[100px] rounded-full -mr-40 -mt-20" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="space-y-3 text-center md:text-left">
                <h4 className="text-3xl font-bold tracking-tight">Need custom help?</h4>
                <p className="text-amber-100 font-medium text-sm max-w-sm">Contact the shop operator directly for special printing requirements or bulk orders.</p>
             </div>
             <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-neutral-900 text-white rounded-xl font-bold text-sm flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-lg active:scale-95">
               WhatsApp Operator <ChevronRight size={18} />
             </a>
          </div>
        </section>

        <FeedbackForm />

      </main>

      {/* Floating Cart */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-6"
          >
            <button onClick={() => navigate('/order')} className="w-full bg-neutral-900 text-white p-5 rounded-3xl font-bold shadow-2xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center font-bold text-lg">
                  {cartCount}
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Items in Order</p>
                  <p className="text-sm">Proceed to Checkout</p>
                </div>
              </div>
              <ArrowRight size={24} className="mr-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-neutral-100 mt-20">
        <p className="text-xs font-bold text-neutral-900 mb-2">JPRINT Student Portal</p>
        <p className="text-[10px] font-medium text-neutral-400">© 2026 JIIT Noida • Sector 128 Campus</p>
      </footer>

    </div>
  );
}

function ProductCard({ title, desc, price, icon, onClick }) {
  return (
    <div onClick={onClick} className="group bg-white p-5 rounded-2x border border-neutral-200 flex items-center gap-5 cursor-pointer hover:border-amber-600/30 hover:shadow-sm transition-all">
      <div className="w-14 h-14 rounded-xl bg-neutral-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm text-neutral-900">{title}</h4>
        <p className="text-[10px] font-medium text-neutral-400 mt-0.5">{desc}</p>
        <div className="mt-2 text-xs font-bold text-amber-700">₹{price}</div>
      </div>
      <button className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-all font-bold">
        +
      </button>
    </div>
  )
}

function History({ size, className }) {
  return <Clock size={size} className={className} />
}
