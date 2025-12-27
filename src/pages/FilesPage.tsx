import React from 'react';
import { Search, Calendar, Download, Trash2, AlertCircle } from 'lucide-react';
import { useFiles } from '../context/FilesContext';
import { useDialog } from '../context/DialogContext';

export const FilesPage: React.FC = () => {
    const {
        files, setFiles, searchTerm, setSearchTerm,
        searchDate, setSearchDate, selectedIds, setSelectedIds, filteredFiles
    } = useFiles();
    const { openDialog, closeDialog } = useDialog();

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) newSelected.delete(id);
        else newSelected.add(id);
        setSelectedIds(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === files.length && files.length > 0) setSelectedIds(new Set());
        else setSelectedIds(new Set(files.map(f => f.id)));
    };

    const handleDownloadRequest = () => {
        openDialog({ type: 'download', title: '下載中...', subtitle: '', showButton: false });
        setTimeout(() => {
            openDialog({ type: 'success', title: '下載成功！', subtitle: '', showButton: true, onConfirm: closeDialog });
        }, 1500);
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

    return (
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center gap-3 text-[#A23C2A] bg-transparent pb-2 font-medium">
                <AlertCircle size={20} />
                <span>檔案上傳後將保留14天，逾期系統會自動刪除</span>
            </div>

            <div className="flex flex-col md:flex-row gap-5 mb-2">
                <div className="flex flex-1 gap-4">
                    <div className="relative w-60 h-10 bg-white rounded border border-transparent shadow-sm flex items-center px-4">
                        <Search className="text-[#999999] mr-3" size={18} />
                        <input
                            className="w-full text-base outline-none bg-transparent"
                            placeholder="搜尋主題"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative w-64 h-10 bg-white rounded border border-transparent shadow-sm flex items-center px-4 group">
                        <Calendar className="text-[#999999] mr-3" size={18} />
                        <input
                            type="date"
                            className={`w-full text-base outline-none bg-transparent cursor-pointer relative z-10 ${searchDate ? 'has-value' : ''}`}
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                        />
                        {!searchDate && (
                            <span className="absolute left-11 text-[#999999] pointer-events-none z-0">
                                搜尋時間
                            </span>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleSearchClick}
                    className="h-10 px-8 bg-[#197675] text-white rounded font-medium shadow hover:opacity-90 transition-all"
                >
                    搜尋
                </button>
            </div>

            <div className="flex justify-between items-center px-2">
                <button
                    onClick={handleDownloadRequest}
                    disabled={selectedIds.size === 0}
                    className={`h-10 px-6 rounded font-medium transition-all ${selectedIds.size > 0 ? 'bg-[#197675] text-white shadow' : 'bg-gray-300 text-gray-500'}`}
                >
                    下載選取檔案
                </button>
                <label className="flex items-center gap-2 cursor-pointer text-[#595959] text-sm">
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#197675]"
                        checked={selectedIds.size === files.length && files.length > 0}
                        onChange={toggleSelectAll}
                    />
                    <span>全選</span>
                </label>
            </div>

            <div className="flex flex-col gap-4">
                {filteredFiles.map(file => (
                    <div key={file.id} className="bg-white rounded-lg p-5 md:px-8 flex items-center gap-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-transparent hover:border-[#197675]/20 transition-all group">
                        <input
                            type="checkbox"
                            className="w-5 h-5 accent-[#197675]"
                            checked={selectedIds.has(file.id)}
                            onChange={() => toggleSelect(file.id)}
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[22px] font-medium text-[#595959] truncate mb-1">{file.title}</h3>
                            <div className="flex gap-6 text-sm text-[#595959]">
                                <span>長度 {file.duration}</span>
                                <span>上傳時間：{file.date}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleDownloadRequest}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F1F3F2] text-[#595959] transition-all"
                            >
                                <Download size={20} />
                            </button>
                            <button
                                onClick={() => openDialog({
                                    type: 'alert',
                                    title: '確定刪除？',
                                    subtitle: '刪除後將無法復原',
                                    showButton: true,
                                    onConfirm: () => {
                                        setFiles(prev => prev.filter(f => f.id !== file.id));
                                        closeDialog();
                                    }
                                })}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 text-[#595959] transition-all"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-[#197675] font-medium min-w-[100px] justify-end">
                            <div className="w-2 h-2 bg-[#197675] rounded-full" />
                            <span className="text-sm">已完成</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
