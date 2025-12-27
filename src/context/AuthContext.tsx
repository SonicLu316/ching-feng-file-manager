
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    email: string;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        const storedEmail = sessionStorage.getItem('userEmail');
        if (storedLogin === 'true') {
            setIsLoggedIn(true);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const login = (userEmail: string) => {
        setIsLoggedIn(true);
        setEmail(userEmail);
        localStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', userEmail);
        console.log(`[Auth] User logged in: ${userEmail} `);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setEmail('');
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
        console.log('[Auth] User logged out');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}
