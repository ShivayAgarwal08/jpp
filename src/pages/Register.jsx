import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // We strictly register as 'user' (student) only. 
    // Vendor registration is removed as per request.
    const role = 'user';

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await register(name, email, password, role);
            navigate('/');
        } catch (err) {
            setError(err || 'Failed to register');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-6 font-sans relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-orange-200/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-purple-200/50 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 relative z-10 w-full max-w-sm mx-auto"
            >
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-500 text-sm">Join JPRINT to order instantly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-medium focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Student Email"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-medium focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create Password"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 font-medium focus:bg-white focus:border-black/10 focus:ring-4 focus:ring-black/5 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-xl"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white font-bold py-4 rounded-2xl text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Get Started'}
                        {!isLoading && <ArrowRight size={20} />}
                    </button>

                    <div className="text-center pt-2">
                        <span className="text-gray-500 text-sm font-medium">Already have an account? </span>
                        <Link to="/login" className="text-black font-bold text-sm hover:underline">Sign In</Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
