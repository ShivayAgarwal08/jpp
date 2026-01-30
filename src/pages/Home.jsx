import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Zap, FileText, Image, PenTool, BookOpen, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

import { useOrder } from '../context/OrderContext';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
  const { user } = useAuth();
  const { addStationeryItem, currentOrder } = useOrder();
  const navigate = useNavigate();

  const handleAddToCart = (name, price) => {
    addStationeryItem({ name, price });
    // Navigate to order page to see cart or stay here? 
    // User said "just add to cart". Let's show a floating "Go to Cart" button.
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = currentOrder.files.length;

  return (
    <div className="min-h-screen bg-neutral-50 pb-28 font-sans text-gray-900 selection:bg-black selection:text-white">

      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="container max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl tracking-tighter shadow-lg shadow-black/20">
                J.
              </div>
              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight">JPRINT<span className="text-orange-500">.</span></h1>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide">JIIT <span className="text-green-600 font-bold ml-1">(Test Phase 1)</span></p>
              </div>
            </div>

            <Link to={user?.role === 'vendor' ? "/vendor" : (user ? "/profile" : "/login")}>
              <motion.div whileTap={{ scale: 0.9 }} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative overflow-hidden">
                {user ? (
                  user.role === 'vendor' ? (
                    <div className="w-full h-full bg-black text-white flex items-center justify-center font-bold text-xs">ADM</div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-green-400 to-green-600 text-white flex items-center justify-center font-bold text-sm">
                      {user.name?.[0].toUpperCase()}
                    </div>
                  )
                ) : (
                  <User size={20} className="text-gray-600" />
                )}
              </motion.div>
            </Link>
          </div>

          {/* Premium Membership Banner REMOVED */}


          {/* Search Bar - Apple Style */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search 'Lab Manual', 'Binding'..."
              className="w-full pl-11 pr-4 py-3.5 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all font-medium text-sm placeholder:text-gray-500"
            />
          </div>
        </div>
      </header>

      <div className="container max-w-md mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Hero Area - Bento Grid Style */}
        <section className="grid grid-cols-2 gap-3 h-48">
          <Link to="/order" className="bg-black rounded-3xl p-5 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-black/10">
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Flash Print</span>
              <h2 className="text-xl font-bold leading-tight">Instant <br />B&W</h2>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
              Start Order <ArrowRight size={14} />
            </div>
            <Zap className="absolute right-[-20px] bottom-[-20px] text-white/10 group-hover:text-white/20 transition-colors rotate-12" size={140} />
          </Link>

          <div className="grid grid-rows-2 gap-3">
            <Link to="/order" className="bg-green-100 rounded-3xl p-4 flex flex-col justify-center relative overflow-hidden group hover:bg-green-200 transition-colors">
              <h3 className="font-bold text-green-900 z-10">Color Print</h3>
              <p className="text-[10px] text-green-700 z-10 font-medium">For Projects</p>
              <Image className="absolute right-[-10px] bottom-[-10px] text-green-600/20 rotate-12" size={80} />
            </Link>
            <Link to="/order" className="bg-purple-100 rounded-3xl p-4 flex flex-col justify-center relative overflow-hidden group hover:bg-purple-200 transition-colors">
              <h3 className="font-bold text-purple-900 z-10">Spiral Bind</h3>
              <p className="text-[10px] text-purple-700 z-10 font-medium">₹30 Only</p>
              <PenTool className="absolute right-[-10px] bottom-[-10px] text-purple-600/20 rotate-12" size={80} />
            </Link>
          </div>
        </section>

        {/* Categories Scroller */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-lg tracking-tight flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-500 fill-yellow-500" /> Explore
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <Link to="/order"><CategoryPill icon={<Zap size={18} />} label="Instant" active /></Link>
            <button onClick={() => scrollToSection('stationery-store')}><CategoryPill icon={<PenTool size={18} />} label="Stationery" /></button>
            <Link to="/order"><CategoryPill icon={<FileText size={18} />} label="Docs" /></Link>
            <Link to="/order"><CategoryPill icon={<Image size={18} />} label="Posters" /></Link>
          </div>
        </section>

        {/* Stationery Items (Replaced Manuals) */}
        <section id="stationery-store" className="space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-lg px-1">
            <PenTool size={20} /> Stationery Store
          </div>

          <div className="bg-white rounded-3xl p-1 shadow-sm border border-gray-100">
            <ProductRow
              title="Pentonic Ball Pen"
              desc="Smooth Flow • Blue/Black"
              price="₹10"
              icon={<PenTool size={20} className="text-blue-500" />}
              bg="bg-blue-50"
              onClick={() => handleAddToCart("Pentonic Ball Pen", 10)}
            />
            <div className="h-px bg-gray-50 mx-4" />
            <ProductRow
              title="Saddle Stick File"
              desc="A4 Size • Clear Transparent"
              price="₹20"
              icon={<FileText size={20} className="text-green-600" />}
              bg="bg-green-100"
              onClick={() => handleAddToCart("Saddle Stick File", 20)}
            />
            <div className="h-px bg-gray-50 mx-4" />
            <ProductRow
              title="Apsara Platinum Pencil"
              desc="Extra Dark • High Quality"
              price="₹5"
              icon={<PenTool size={20} className="text-gray-500" />}
              bg="bg-gray-100"
              onClick={() => handleAddToCart("Apsara Platinum Pencil", 5)}
            />
          </div>
        </section>

        {/* Floating Cart Button (Only if items in cart) */}
        {cartCount > 0 && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <button onClick={() => navigate('/order')} className="bg-black text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <span>{cartCount} Items</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>Go to Cart <ArrowRight size={16} className="inline ml-1" /></span>
            </button>
          </div>
        )}

        <FeedbackForm />

        {/* Support Banner */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-1">Need Help?</h4>
            <p className="text-gray-400 text-sm mb-4">Contact the shop directly.</p>
            <a href="https://chat.whatsapp.com/KnC17YZEiB15oNV5S3bTO6" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform">
              Chat with Verified Vendor
            </a>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 to-transparent opacity-50"></div>
        </div>

      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Built for JIIT Student</p>
        <p className="text-xs font-medium text-gray-500 flex items-center justify-center gap-1">
          Made by <span className="text-gray-900 font-bold">Kartik Guleria</span>
        </p>
      </div>

    </div>
  );
}

function CategoryPill({ icon, label, active }) {
  return (
    <button className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${active ? 'bg-black text-white shadow-lg shadow-black/20' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'}`}>
      {icon} {label}
    </button>
  )
}

function ProductRow({ title, desc, price, icon, bg, onClick }) {
  return (
    <div onClick={onClick} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer group">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 font-medium">{desc}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-bold text-sm">{price}</span>
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors">
          <span className="text-lg leading-none mb-0.5">+</span>
        </button>
      </div>
    </div>
  )
}
