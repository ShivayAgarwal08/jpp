import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Loader2, Sparkles, Shield, User, Mail, Lock, ArrowRight } from 'lucide-react';
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
            setError(typeof err === 'string' ? err : 'Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans text-gray-900 selection:bg-black selection:text-white">
            
            {/* Ambient Background */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md z-10"
            >
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-12 font-bold text-sm group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <div className="mb-10">
                    <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center font-bold text-3xl mb-6 shadow-2xl shadow-black/20">J.</div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Sign in to JPRINT.</h1>
                    <p className="text-gray-400 font-medium">Manage your prints and stationery orders across campus.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@jiit.ac.in"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-5 text-sm font-bold placeholder:text-gray-300 focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-14 py-5 text-sm font-bold placeholder:text-gray-300 focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold leading-relaxed border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white py-5 rounded-2xl font-bold text-sm shadow-2xl shadow-black/10 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <span className="flex items-center gap-2">Continue <ArrowRight size={18} /></span>}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-gray-400 text-sm font-medium">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-black font-black hover:underline">Create one for free</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
