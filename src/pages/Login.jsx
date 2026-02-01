import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Loader2, Mail, Lock, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password, 'user');
            navigate('/home');
        } catch (err) {
            setError(typeof err === 'string' ? err : 'Invalid credentials. Please verify your details.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-gray-950 selection:bg-blue-600 selection:text-white">
            
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-float" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <div className="flex justify-center mb-12">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-all font-black text-xs uppercase tracking-[0.2em] group bg-white/50 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-100 shadow-sm">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Base
                    </Link>
                </div>

                <div className="bg-white/70 backdrop-blur-3xl p-10 md:p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white/50 relative">
                    <div className="mb-10 text-center">
                        <img src="/assets/logo.png" className="w-20 h-20 rounded-[2.25rem] shadow-2xl shadow-black/20 mx-auto mb-8 -rotate-6 object-cover" alt="Logo" />
                        <h1 className="text-4xl font-black tracking-tighter mb-4">Signal In.</h1>
                        <p className="text-gray-500 font-bold text-sm max-w-[200px] mx-auto leading-relaxed italic">Synchronize with campus print nodes.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">JIIT Intelligence Email</label>
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

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
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
                                    className="bg-red-50 text-red-600 p-5 rounded-[1.25rem] text-xs font-black tracking-tight leading-relaxed border border-red-100 flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-red-600 rounded-full shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-6 rounded-[1.5rem] font-black text-lg shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-8 group"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                                <span className="flex items-center gap-3 italic tracking-tighter">
                                    Initialize Session <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest">
                            New Personnel?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline">Enroll for Free</Link>
                        </p>
                    </div>
                </div>

                {/* Footer security badge */}
                <div className="mt-12 flex items-center justify-center gap-4 opacity-50">
                    <div className="flex items-center gap-1.5 grayscale">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encryption</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1.5 grayscale">
                        <Zap size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">JIIT Fleet Certified</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
