import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowRight, 
    Lock, 
    School, 
    Store, 
    User, 
    Printer, 
    Zap, 
    ShieldCheck, 
    Clock,
    FileText,
    CheckCircle2,
    Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showSelection, setShowSelection] = useState(false);
    const [show62Popup, setShow62Popup] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const handle128Click = () => {
        navigate('/login');
    };

    const handle62Click = () => {
        setShow62Popup(true);
        setTimeout(() => setShow62Popup(false), 3000);
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-primary/20">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl">J.</div>
                        <span className="font-bold text-xl tracking-tight">JPRINT</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
                        <a href="#features" className="hover:text-black transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
                        <a href="#campuses" className="hover:text-black transition-colors">Campuses</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/login')} className="text-sm font-semibold hover:text-primary transition-colors">Log in</button>
                        <button 
                            onClick={() => setShowSelection(true)}
                            className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                            <Zap size={14} />
                            <span>Campus Printing Reimagined</span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Print your docs <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">without the wait.</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-medium mb-10 max-w-lg leading-relaxed">
                            The fastest way to get your assignments, notes, and documents printed on campus. No queues, no hassle.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => setShowSelection(true)}
                                className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-black/10 group"
                            >
                                Start Printing <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button 
                                onClick={() => navigate('/vendor-login')}
                                className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                            >
                                Vendor Portal
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold`}>
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-black">500+ Students</span>
                                <p className="text-gray-400">trust JPRINT every day</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border-8 border-white">
                            <img 
                                src="/hero.png" 
                                alt="JPrint Hero" 
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        
                        {/* Floating elements */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
                        >
                            <div className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center">
                                <Check size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold">Status</p>
                                <p className="text-sm font-bold">Printed & Ready</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
                        >
                            <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center">
                                <Printer size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold">Queue</p>
                                <p className="text-sm font-bold">Instant Access</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight mb-4">Why use JPRINT?</h2>
                        <p className="text-gray-500 font-medium">Streamlining your campus printing experience.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Clock className="text-blue-500" />,
                                title: "Save Time",
                                desc: "No more waiting in long queues at the stationary shop. Order from your room."
                            },
                            {
                                icon: <ShieldCheck className="text-green-500" />,
                                title: "Secure Payments",
                                desc: "Smooth and secure payment integration for a hassle-free checkout experience."
                            },
                            {
                                icon: <FileText className="text-orange-500" />,
                                title: "Any Document",
                                desc: "Upload PDFs, Word docs, or images. Choose B/W or Color, and specific pages."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="py-24">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">Three simple steps</h2>
                    
                    <div className="space-y-12">
                        {[
                            { step: "01", title: "Upload your Files", desc: "Select the documents you need to print and customize your settings." },
                            { step: "02", title: "Pay Online", desc: "Securely complete your payment through your preferred method." },
                            { step: "03", title: "Pick up with OTP", desc: "Go to the campus shop, show your OTP, and collect your prints." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-8 group">
                                <div className="text-5xl font-black text-gray-100 group-hover:text-primary/20 transition-colors uppercase select-none">{item.step}</div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl">J.</div>
                        <span className="font-bold text-xl tracking-tight">JPRINT</span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium">© 2024 JPRINT. Made for Jaypee Students.</p>
                    <div className="flex gap-6 text-sm font-bold text-gray-400">
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms</a>
                        <a href="#" className="hover:text-black transition-colors">Contact</a>
                    </div>
                </div>
            </footer>

            {/* Selection Modal */}
            <AnimatePresence>
                {showSelection && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSelection(false)} />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden relative z-10 p-8 shadow-2xl"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-black text-white rounded-3xl flex items-center justify-center font-bold text-3xl mx-auto mb-4 rotate-3">
                                    J.
                                </div>
                                <h2 className="text-2xl font-bold truncate">Select your campus</h2>
                                <p className="text-gray-500 font-medium text-sm mt-1">Which portal would you like to access?</p>
                            </div>

                            <div className="grid gap-4">
                                <button
                                    onClick={handle128Click}
                                    className="group w-full bg-gray-50 p-6 rounded-3xl flex items-center justify-between hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-sm group-hover:bg-white/10 group-hover:text-white transition-colors">
                                            <School size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-lg">Sector 128</h3>
                                            <p className="text-xs text-gray-400 group-hover:text-white/60 font-bold uppercase tracking-wider">Jaypee Wish Town</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="text-gray-300 group-hover:text-white transition-colors" />
                                </button>

                                <button
                                    onClick={handle62Click}
                                    className="group w-full bg-white border border-gray-100 p-6 rounded-3xl flex items-center justify-between opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                                            <Lock size={24} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-lg text-gray-500 group-hover:text-gray-900 transition-colors">Sector 62</h3>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Noida</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-full uppercase">Soon</span>
                                </button>
                            </div>

                            <button 
                                onClick={() => setShowSelection(false)}
                                className="w-full mt-6 text-center text-sm font-bold text-gray-400 hover:text-black transition-colors"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Notification */}
            <AnimatePresence>
                {show62Popup && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-10 left-1/2 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap z-[200]"
                    >
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="font-bold text-sm">Coming Soon to Sector 62</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
