import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoIcon } from '../components/LogoIcon';
import { useDialog } from '../context/DialogContext';
import { loginApi } from '../api/auth';

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const { openDialog, closeDialog } = useDialog();
    const navigate = useNavigate();
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!employeeId || !password) {
            openDialog({
                type: 'alert',
                title: '登入失敗',
                subtitle: '請輸入帳號與密碼',
                showButton: true,
                onConfirm: closeDialog
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await loginApi({ 工號: employeeId, 密碼: password });

            if (response.data.是否成功 && response.data.使用者資訊) {
                login(response.data.使用者資訊);
                navigate('/files');
            } else {
                openDialog({
                    type: 'alert',
                    title: '登入失敗',
                    subtitle: response.data.訊息 || '帳號或密碼錯誤',
                    showButton: true,
                    onConfirm: closeDialog
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            openDialog({
                type: 'alert',
                title: '系統錯誤',
                subtitle: '連線失敗或伺服器異常，請稍後再試。',
                showButton: true,
                onConfirm: closeDialog
            });
        } finally {
            setIsLoading(false);
        }
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
                            placeholder="工號 / Employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            disabled={isLoading}
                            className="w-full h-10 border border-[#E0E0E0] bg-[#F5F5F5] rounded-[4px] px-3 text-sm focus:bg-white focus:border-[#197675] outline-none transition-all disabled:opacity-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#197675] text-base font-medium">密碼</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full h-10 border border-[#E0E0E0] bg-[#F5F5F5] rounded-[4px] px-3 text-sm focus:bg-white focus:border-[#197675] outline-none transition-all disabled:opacity-50"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[110px] h-10 bg-[#197675] text-white rounded-[4px] font-medium hover:bg-[#145e5d] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : '登入'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
