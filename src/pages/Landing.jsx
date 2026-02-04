import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Lock, 
  School, 
  Zap, 
  Shield, 
  CheckCircle2,
  FileText,
  Clock,
  Printer,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [show128Options, setShow128Options] = useState(false);
    const [show62Popup, setShow62Popup] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handle128Click = () => {
        setShow128Options(true);
    };

    const handle62Click = () => {
        setShow62Popup(true);
        setTimeout(() => setShow62Popup(false), 3000);
    };

    const features = [
      {
        icon: <Zap className="text-amber-600" size={24} />,
        title: "Fast Turnaround",
        desc: "Upload your study materials and they'll be ready for pickup in minutes."
      },
      {
        icon: <Shield className="text-amber-600" size={24} />,
        title: "Simple & Secure",
        desc: "Pay online and use a unique code for a secure, contact-free pickup."
      },
      {
        icon: <Printer className="text-amber-600" size={24} />,
        title: "Quality Prints",
        desc: "Partnered with local outlets to ensure crisp, clear professional printing."
      }
    ];

    return (
        <div className="min-h-screen bg-white text-neutral-800 font-sans selection:bg-amber-100">
            
            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100 py-4">
              <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center font-bold text-white">J</div>
                  <span className="font-bold text-xl tracking-tight">JPRINT<span className="text-amber-600">.</span></span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
                  <a href="#features" className="hover:text-black transition-colors">Features</a>
                  <button onClick={() => navigate('/vendor-login')} className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                    <Lock size={14} /> Shop Access
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('selection');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-all active:scale-95"
                >
                  Start Now
                </button>
              </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full text-amber-700 text-xs font-bold mb-6 border border-amber-100 italic">
                        New version v3.0 is live!
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-neutral-900">
                        Reliable Campus Printing <br />
                        <span className="text-amber-600">Simplified.</span>
                    </h1>
                    
                    <p className="text-lg text-neutral-600 mb-10 leading-relaxed max-w-lg">
                        Upload your documents online and pick them up from the stationery shop. No more waiting in long lines at the shop.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                const el = document.getElementById('selection');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 bg-neutral-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-lg"
                        >
                            Order Your Prints <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white text-neutral-700 border border-neutral-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all">
                            How it works <ChevronDown size={18} />
                        </button>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-100">
                        <img 
                            src="/professional_printing_hero.png" 
                            alt="Professional Campus Printing" 
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Floating Info Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-neutral-50 hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">98% Success Rate</p>
                                <p className="text-xs text-neutral-500">Over 10,000+ prints delivered</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
              </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-neutral-50 mt-10">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why choose JPRINT?</h2>
                  <p className="text-neutral-500 max-w-2xl mx-auto font-medium">We've designed our service to be as efficient and helpful as possible for JIIT students.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((f, i) => (
                    <div key={i} className="card-professional">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-6">
                        {f.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-neutral-900">{f.title}</h3>
                      <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Campus Selection */}
            <section id="selection" className="py-32 bg-white">
              <div className="max-w-3xl mx-auto px-6 text-center">
                 <h2 className="text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Select Your Campus</h2>
                 <p className="text-neutral-500 mb-12 font-medium">Please choose your building to start your order.</p>
                 
                 <div className="grid gap-6">
                    {!show128Options ? (
                        <>
                            <button
                                onClick={handle128Click}
                                className="group w-full bg-white p-8 rounded-2xl border border-neutral-200 flex items-center justify-between hover:border-amber-600 hover:shadow-md transition-all text-left"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-900 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                        <School size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-neutral-900">Sector 128</h3>
                                        <p className="text-sm text-neutral-500 font-medium">Wish Town Campus</p>
                                    </div>
                                </div>
                                <ArrowRight size={20} className="text-neutral-300 group-hover:text-amber-600 transition-colors" />
                            </button>

                            <button
                                onClick={handle62Click}
                                className="w-full bg-neutral-50 p-8 rounded-2xl border border-neutral-100 flex items-center justify-between opacity-60 grayscale cursor-not-allowed group text-left"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-neutral-300">
                                        <Lock size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-neutral-300">Sector 62</h3>
                                        <p className="text-sm text-neutral-300">Noida Main Campus</p>
                                    </div>
                                </div>
                                <span className="bg-neutral-100 text-neutral-400 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">Coming Soon</span>
                            </button>
                        </>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-900 text-white p-10 rounded-3xl shadow-xl text-left relative overflow-hidden"
                        >
                            <button onClick={() => setShow128Options(false)} className="text-xs font-bold text-neutral-400 hover:text-white transition-opacity mb-6 block">← Change Campus</button>
                            <h3 className="text-3xl font-bold mb-8">Access Sector 128 Portal</h3>

                            <div className="flex flex-col sm:flex-row gap-4">
                              <button
                                  onClick={() => navigate('/login')}
                                  className="flex-1 bg-white text-neutral-900 p-5 rounded-xl flex items-center justify-between font-bold hover:bg-neutral-100 transition-all"
                              >
                                  <span>Login as Student</span>
                                  <ArrowRight size={18} />
                              </button>

                              <button
                                  onClick={() => navigate('/register')}
                                  className="flex-1 bg-amber-600 text-white p-5 rounded-xl flex items-center justify-between font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/20"
                              >
                                  <span>New Student Signup</span>
                                  <ArrowRight size={18} />
                              </button>
                            </div>
                        </motion.div>
                    )}
                 </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-neutral-100">
               <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center font-bold text-white">J</div>
                    <span className="font-bold text-neutral-900 text-xl tracking-tight">JPRINT<span className="text-amber-600">.</span></span>
                  </div>
                  <div className="flex gap-10 text-sm font-medium text-neutral-500">
                    <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-black transition-colors">Contact Support</a>
                  </div>
                  <p className="text-sm text-neutral-400 font-medium italic">Handcrafted for JIIT Students.</p>
               </div>
            </footer>

            {/* Toast Notification */}
            <AnimatePresence>
                {show62Popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-50 border border-neutral-800"
                    >
                        <Lock size={20} className="text-amber-500" />
                        <span className="text-sm font-semibold">Sector 62 services will be available soon!</span>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
