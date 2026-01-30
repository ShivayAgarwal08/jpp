import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';

export default function Account() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // await auth.signOut();
            console.log('Logging out');
            navigate('/auth');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-8 bg-white rounded shadow w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4">Your Account</h1>
                <p className="mb-6 text-gray-600">Welcome to your dashboard.</p>

                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
