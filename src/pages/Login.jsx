import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Loader2, Shield, User, Lock, Mail, ChevronLeft } from 'lucide-react';
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
            console.error(err);
            setError(typeof err === 'string' ? err : 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 font-sans selection:bg-amber-100">
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                {/* Brand */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                         <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center font-bold text-white group-hover:bg-amber-600 transition-colors">J</div>
                         <span className="font-bold text-xl tracking-tight text-neutral-900">JPRINT<span className="text-amber-600">.</span></span>
                    </Link>
                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">Sign in to your account</h1>
                    <p className="text-sm text-neutral-500 font-medium">Use your institutional email to get started.</p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 rounded-[32px] border border-neutral-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-amber-600 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600/30 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-amber-600 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-600/30 transition-all"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                          {error && (
                              <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-red-50 text-red-600 text-[11px] font-bold p-4 rounded-xl border border-red-100 flex items-center gap-3"
                              >
                                  <Shield size={14} />
                                  <span>{error}</span>
                              </motion.div>
                          )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                              <>
                                <span>Sign In</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-500" />
                              </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center mt-8">
                    <p className="text-neutral-500 text-sm font-medium">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-amber-600 font-bold hover:underline">
                            Register now
                        </Link>
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-6">
                        <Link to="/vendor-login" className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest hover:text-neutral-900 transition-colors">
                            Shop Owner Portal
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
