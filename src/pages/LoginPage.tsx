import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoIcon } from '../components/LogoIcon';

import { useDialog } from '../context/DialogContext';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const { openDialog, closeDialog } = useDialog();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            openDialog({
                type: 'alert',
                title: '登入失敗',
                subtitle: '請輸入帳號與密碼',
                showButton: true,
                onConfirm: closeDialog
            });
            return;
        }

        // Development mode: Allow any non-empty credentials
        login(email);
        navigate('/files');
    };

    return (
        <div className="min-h-screen bg-[#C7DDDD] flex items-center justify-center p-4">
            <div className="w-[500px] h-[460px] bg-white rounded-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center gap-10 p-10">
                <div className="flex items-center gap-4">
                    <LogoIcon size="lg" />
                    <div className="text-[#197675] text-xl font-bold leading-tight tracking-[1px]">
                        CHING FENG<br />HOME FASHIONS
                    </div>
                </div>
                <form onSubmit={handleLogin} className="w-[358px] flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#197675] text-base font-medium">帳號</label>
                        <input
                            type="text"
                            placeholder="E-Mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-10 border border-[#E0E0E0] bg-[#F5F5F5] rounded-[4px] px-3 text-sm focus:bg-white focus:border-[#197675] outline-none transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#197675] text-base font-medium">密碼</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-10 border border-[#E0E0E0] bg-[#F5F5F5] rounded-[4px] px-3 text-sm focus:bg-white focus:border-[#197675] outline-none transition-all"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="w-[110px] h-10 bg-[#197675] text-white rounded-[4px] font-medium hover:bg-[#145e5d] transition-all"
                        >
                            登入
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
