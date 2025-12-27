import React, { useState, useMemo } from 'react';
import { Menu, LogOut, Folder, FolderPlus } from 'lucide-react';
import { INITIAL_FILES } from './constants';
import { ViewType, FileRecord, DialogConfig } from './types';
import { LogoIcon } from './components/LogoIcon';
import { LoginView } from './components/LoginView';
import { ListView } from './components/ListView';
import { AddFileView } from './components/AddFileView';
import { CustomDialog } from './components/CustomDialog';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('all');
  const [files, setFiles] = useState<FileRecord[]>(INITIAL_FILES);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Dialog state management
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
    isOpen: false,
    type: 'success', 
    title: '',
    subtitle: '',
    onConfirm: null,
    showButton: true
  });

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchTitle = file.title.toLowerCase().includes(searchTerm.toLowerCase());
      // Convert date format for comparison (yyyy-MM-dd to yyyy/MM/dd)
      const formattedSearchDate = searchDate.replace(/-/g, '/');
      const matchDate = !searchDate || file.date.includes(formattedSearchDate);
      return matchTitle && matchDate;
    });
  }, [files, searchTerm, searchDate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('all');
  };

  const openDialog = (config: Partial<DialogConfig>) => {
    setDialogConfig(prev => ({ ...prev, ...config, isOpen: true }));
  };

  const closeDialog = () => {
    setDialogConfig(prev => ({ ...prev, isOpen: false }));
  };

  const handleSearchClick = () => {
    if (filteredFiles.length === 0) {
      openDialog({
        type: 'alert',
        title: '查無資訊！',
        subtitle: '請確認關鍵字或時間',
        showButton: true,
        onConfirm: closeDialog
      });
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

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
          <span className="text-base font-medium">嗨！慶豐富</span>
          <button 
            onClick={handleLogout} 
            className="text-[#595959] hover:text-[#197675] transition-all transform hover:scale-110"
          >
            <LogOut size={22} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-60 bg-[#F1F3F2] p-8 flex flex-col gap-6 z-20 border-r border-black/5`}>
          <nav className="space-y-4">
            <div 
              onClick={() => setCurrentView('all')} 
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${currentView === 'all' ? 'text-[#197675] font-bold bg-[#197675]/5' : 'text-[#595959] hover:bg-black/5'}`}
            >
              <Folder size={20} />
              <span className="text-lg">所有檔案</span>
            </div>
            <div 
              onClick={() => setCurrentView('add')} 
              className={`flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer transition-all ${currentView === 'add' ? 'text-[#197675] font-bold bg-[#197675]/5' : 'text-[#595959] hover:bg-black/5'}`}
            >
              <FolderPlus size={20} />
              <span className="text-lg">新增檔案</span>
            </div>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-10 flex flex-col gap-6">
          {currentView === 'all' ? (
            <ListView 
              files={filteredFiles} 
              searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
              searchDate={searchDate} setSearchDate={setSearchDate} 
              selectedIds={selectedIds} setSelectedIds={setSelectedIds} 
              setFiles={setFiles} allFiles={files}
              onSearch={handleSearchClick}
              openDialog={openDialog}
              closeDialog={closeDialog}
            />
          ) : (
            <AddFileView 
              onCancel={() => setCurrentView('all')} 
              openDialog={openDialog}
              closeDialog={closeDialog}
              onViewAll={() => setCurrentView('all')}
            />
          )}
        </main>
      </div>

      {dialogConfig.isOpen && (
        <CustomDialog config={dialogConfig} onClose={closeDialog} />
      )}
    </div>
  );
}