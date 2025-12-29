import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserInfo } from '../types';

interface AuthContextType {
    isLoggedIn: boolean;
    user: UserInfo | null;
    login: (userInfo: UserInfo) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        const storedLogin = localStorage.getItem('isLoggedIn');
        const storedUser = sessionStorage.getItem('userInfo');

        if (storedLogin === 'true') {
            setIsLoggedIn(true);
        }

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse user info from session storage', e);
                localStorage.removeItem('isLoggedIn'); // Force logout if data is corrupted
            }
        }
    }, []);

    const login = (userInfo: UserInfo) => {
        setIsLoggedIn(true);
        setUser(userInfo);

        localStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

        console.log(`[Auth] User logged in: ${userInfo.工號} (${userInfo.顯示名稱})`);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);

        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userInfo');

        console.log('[Auth] User logged out');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
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
