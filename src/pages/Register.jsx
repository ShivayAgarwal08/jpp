import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Mail, Lock, User, ArrowRight, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const role = 'user';
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(name, email, password, role);
            navigate('/home');
        } catch (err) {
            setError(err || 'Failed to initialize account. Email signature might already exist.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-gray-950 selection:bg-blue-600 selection:text-white">
            
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-float" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex justify-center mb-10">
                    <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-all font-black text-xs uppercase tracking-[0.2em] group bg-white/50 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
                    </Link>
                </div>

                <div className="bg-white/70 backdrop-blur-3xl p-10 md:p-12 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border border-white/50 relative">
                    <div className="mb-10 text-center">
                        <img src="/assets/logo.png" className="w-20 h-20 rounded-[2.25rem] shadow-2xl shadow-black/20 mx-auto mb-8 -rotate-6 object-cover" alt="Logo" />
                        <h1 className="text-4xl font-black tracking-tighter mb-4">Enroll.</h1>
                        <p className="text-gray-500 font-bold text-sm max-w-[200px] mx-auto leading-relaxed italic">Join the next-gen campus logistics network.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Full Identity</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-16 py-6 text-base font-black placeholder:text-gray-300 focus:bg-white focus:border-blue-600/20 focus:ring-8 focus:ring-blue-600/5 outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">JIIT Network Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@jiit.ac.in"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-16 py-6 text-base font-black placeholder:text-gray-300 focus:bg-white focus:border-blue-600/20 focus:ring-8 focus:ring-blue-600/5 outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">New Access Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-16 py-6 text-base font-black placeholder:text-gray-300 focus:bg-white focus:border-blue-600/20 focus:ring-8 focus:ring-blue-600/5 outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-red-50 text-red-600 p-5 rounded-[1.25rem] text-xs font-black leading-relaxed border border-red-100"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-6 rounded-[1.5rem] font-black text-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-6 group"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                                <span className="flex items-center gap-3 italic tracking-tighter">
                                    Initiate Enrollment <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-[9px] text-gray-400 text-center font-black leading-relaxed px-6 uppercase tracking-[0.2em] opacity-60">
                        Institutional Access Only • Fleet V3.0 • Verified Protocol
                    </p>
                </div>

                {/* Footer security badge */}
                <div className="mt-10 flex items-center justify-center gap-4 opacity-40">
                    <div className="flex items-center gap-1.5 grayscale">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">End-to-End</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1.5 grayscale">
                        <Zap size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Jaypee Certified</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
