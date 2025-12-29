import React, { useState } from 'react';
import { Menu, LogOut, Folder, FolderPlus } from 'lucide-react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LogoIcon } from '../components/LogoIcon';
import { useAuth } from '../context/AuthContext';
import { useDialog } from '../context/DialogContext';
import { CustomDialog } from '../components/CustomDialog';

export const MainLayout: React.FC = () => {
    const { logout, user } = useAuth();
    const { dialogConfig, closeDialog } = useDialog();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-screen bg-[#F1F3F2] font-sans text-[#595959]">
            <header className="h-20 bg-[#C7DDDD] px-10 flex items-center justify-between shadow-sm z-30 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 lg:hidden text-[#197675] hover:bg-white/20 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-4">
                        <LogoIcon size="sm" />
                        <h1 className="text-xl font-bold text-[#197675] leading-tight tracking-wider hidden sm:block">
                            CHING FENG HOME FASHIONS
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-base font-medium">嗨！{user?.顯示名稱 || '訪客'}</span>
                    <button
                        onClick={handleLogout}
                        className="text-[#595959] hover:text-[#197675] transition-all transform hover:scale-105 flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/30"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-medium">登出</span>
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-60 bg-[#F1F3F2] p-8 flex flex-col gap-6 z-20 border-r border-black/5`}>
                    <nav className="space-y-4">
                        <NavLink
                            to="/files"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${isActive ? 'text-[#197675] font-bold bg-[#197675]/5' : 'text-[#595959] hover:bg-black/5'}`}
                        >
                            <Folder size={20} />
                            <span className="text-lg">所有檔案</span>
                        </NavLink>
                        <NavLink
                            to="/add"
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${isActive ? 'text-[#197675] font-bold bg-[#197675]/5' : 'text-[#595959] hover:bg-black/5'}`}
                        >
                            <FolderPlus size={20} />
                            <span className="text-lg">新增檔案</span>
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-1 overflow-y-auto p-10 flex flex-col gap-6">
                    <Outlet />
                </main>
            </div>

            {dialogConfig.isOpen && (
                <CustomDialog config={dialogConfig} onClose={closeDialog} />
            )}
        </div>
    );
};
