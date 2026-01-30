import { useState, useEffect } from 'react';
import { Search, RefreshCw, Database, Table } from 'lucide-react';
import { getApiUrl } from '../config';

export default function DatabaseView() {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('users');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, ordersRes] = await Promise.all([
                fetch(getApiUrl('api/users')),
                fetch(getApiUrl('api/orders'))
            ]);

            if (usersRes.ok) setUsers(await usersRes.json());
            if (ordersRes.ok) setOrders(await ordersRes.json());
            setError(null);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                            <Database size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">System Database</h1>
                            <p className="text-sm text-gray-500">Live view of local SQLite data</p>
                        </div>
                    </div>

                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                        Refresh Data
                    </button>
                </header>

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-3 px-1 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Table size={16} /> Users ({users.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-3 px-1 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        <Table size={16} /> Orders ({orders.length})
                    </button>
                </div>

                {error ? (
                    <div className="bg-red-50 text-red-600 p-8 rounded-xl text-center border border-red-200">
                        <h3 className="font-bold text-lg mb-2">Connection Failed</h3>
                        <p className="font-mono text-sm mb-4">{error}</p>
                        <button onClick={fetchData} className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 font-bold transition-colors">
                            Retry Connection
                        </button>
                    </div>
                ) : loading && users.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">Loading database...</div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {activeTab === 'users' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4">ID</th>
                                            <th className="px-6 py-4">Name</th>
                                            <th className="px-6 py-4">Email</th>
                                            <th className="px-6 py-4">Role</th>
                                            <th className="px-6 py-4">Created At</th>
                                            <th className="px-6 py-4">Password Hash</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs">{user.id}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">{user.name || '-'}</td>
                                                <td className="px-6 py-4 text-blue-600">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'vendor' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs">{new Date(user.created_at).toLocaleString()}</td>
                                                <td className="px-6 py-4 font-mono text-xs text-gray-400 truncate max-w-[150px]">{user.password}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">User</th>
                                            <th className="px-6 py-4">OTP</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Items</th>
                                            <th className="px-6 py-4">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-900">{order.userEmail}</div>
                                                    <div className="text-xs text-gray-400 font-mono">{order.userId}</div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-lg font-bold tracking-widest">{order.otp}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">₹{order.totalAmount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'collected' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs">
                                                    {order.files && Array.isArray(order.files) ? (
                                                        <div className="space-y-1">
                                                            {order.files.map((f, i) => (
                                                                <div key={i} className="flex items-center gap-1">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                                                    {f.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : 'Invalid Data'}
                                                </td>
                                                <td className="px-6 py-4 text-xs">{new Date(order.created_at).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
