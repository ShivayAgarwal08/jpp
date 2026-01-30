import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';

export default function Auth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Note: This is a hypothetical API based on standard Auth clients.
            // Adjust method names based on actual Neon SDK exports if different.
            if (isLogin) {
                // await auth.signIn({ email, password }); 
                // For now, logging to console as we wait for SDK confirmation
                console.log('Logging in with', email);
            } else {
                // await auth.signUp({ email, password });
                console.log('Signing up with', email);
            }
            navigate('/account');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}
