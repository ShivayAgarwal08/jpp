import { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('jprint_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('jprint_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('jprint_user');
        }
    }, [user]);

    const login = async (email, password, role = 'user') => {
        const response = await fetch(getApiUrl('api/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        const data = await response.json();

        if (!response.ok) {
            throw data.error || 'Login failed';
        }

        setUser(data);
        return data;
    };

    const register = async (name, email, password, role = 'user') => {
        const response = await fetch(getApiUrl('api/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();

        if (!response.ok) {
            throw data.error || 'Registration failed';
        }

        setUser(data);
        return data;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
