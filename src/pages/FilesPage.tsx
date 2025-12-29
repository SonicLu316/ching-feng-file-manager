import React, { useState, useEffect, useCallback } from 'react';
import { Search, Calendar, Download, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDialog } from '../context/DialogContext';
import { fetchMeetingRecordsPaginated } from '../api/files';
import { MeetingRecord, MeetingRecordStatus } from '../types';

export const FilesPage: React.FC = () => {
    const { openDialog, closeDialog } = useDialog();

    // Search params state
    const [searchTerm, setSearchTerm] = useState('');

    // Initialize dates directly in state to allow auto-search on mount
    const [searchDateStart, setSearchDateStart] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    });

    const [searchDateEnd, setSearchDateEnd] = useState(() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Data state
    const [files, setFiles] = useState<MeetingRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Selection state
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    const fetchFiles = useCallback(async () => {
        setIsLoading(true);
        try {
            // Append Default Time
            const startTime = searchDateStart ? `${searchDateStart} 00:00:00` : '';
            const endTime = searchDateEnd ? `${searchDateEnd} 23:59:59` : '';

            const response = await fetchMeetingRecordsPaginated({
                主題: searchTerm,
                開始時間: startTime,
                結束時間: endTime,
                頁碼: currentPage.toString(),
                每頁筆數: pageSize.toString()
            });

            if (response.status === 1) {
                setFiles(response.data.資料);
                setTotalCount(response.data.總筆數);
                // Reset selection on new fetch
                setSelectedIds(new Set());
            } else {
                openDialog({
                    type: 'alert',
                    title: '查詢失敗',
                    subtitle: response.message,
                    showButton: true,
                    onConfirm: closeDialog
                });
                setFiles([]);
                setTotalCount(0);
            }
        } catch (error) {
            console.error(error);
            openDialog({
                type: 'alert',
                title: '查詢錯誤',
                subtitle: '無法連接伺服器',
                showButton: true,
                onConfirm: closeDialog
            });
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, searchDateStart, searchDateEnd, currentPage, pageSize, openDialog, closeDialog]);

    // Initial fetch when dates are ready (simple check or just run once mounted after dates set)
    // Actually, we want to fetch when page/pageSize changes, or when Search button clicked.
    // Plan: Fetch on mount (after dates init) and when page/pageSize changes. Search button triggers fetch with new term/dates.
    // However, React batching might make initial fetch happen before dates set if not careful.
    // Let's add a flag or just check if dates are empty? Default dates are set in useEffect.
    // A separate useEffect for page/pageSize changes? 
    // And a manual call for Search button.

    // Better approach:
    // 1. Initial load effect.
    // 2. Search button -> resets page to 1 -> calls fetch.
    // 3. Page change -> calls fetch.
    // 4. PageSize change -> resets page to 1 -> calls fetch.

    useEffect(() => {
        fetchFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pageSize]);
    // We intentionally exclude searchTerm/dates from dep array to avoid auto-fetch on typing. 
    // But we include them in fetchFiles dependencies to make sure callback is fresh? 
    // Actually with useCallback, if we want manual search, we should use ref or just current state.
    // But since fetchFiles depends on state, it will be recreated. 
    // So putting fetchFiles in dep array means any state change triggers fetch.
    // WE DO NOT WANT THAT. We want fetch on specific events.

    // So let's NOT include search terms in useEffect deps, only pagination.
    // But we need to make sure initial load catches the default dates.

    const handleSearchClick = () => {
        setCurrentPage(1); // Reset to page 1
        fetchFiles();
    };

    const toggleSelect = (id: number) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) newSelected.delete(id);
        else newSelected.add(id);
        setSelectedIds(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === files.length && files.length > 0) setSelectedIds(new Set());
        else setSelectedIds(new Set(files.map(f => f.流水號)));
    };

    const handleDownloadRequest = () => {
        // Placeholder for download logic
        if (selectedIds.size === 0) return;
        openDialog({ type: 'download', title: '下載中...', subtitle: '', showButton: false });
        setTimeout(() => {
            openDialog({ type: 'success', title: '下載成功！', subtitle: '檔案已開始下載', showButton: true, onConfirm: closeDialog });
        }, 1500);
    };

    const getStatusConfig = (status: MeetingRecordStatus) => {
        switch (status) {
            case MeetingRecordStatus.Pending:
                return { text: '等待處理', color: 'text-gray-500', icon: '⏳' };
            case MeetingRecordStatus.Processing:
                return { text: '處理中', color: 'text-[#197675]', icon: '🔄' }; // Blue-Greenish
            case MeetingRecordStatus.Completed:
                return { text: '已完成', color: 'text-green-600', icon: '✓' };
            case MeetingRecordStatus.Failed:
                return { text: '失敗', color: 'text-red-500', icon: '✗' };
            default:
                return { text: '未知', color: 'text-gray-400', icon: '?' };
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center gap-3 text-[#A23C2A] bg-transparent pb-2 font-medium">
                <AlertCircle size={20} />
                <span>檔案上傳後將保留14天，逾期系統會自動刪除</span>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col xl:flex-row gap-4 mb-2">
                <div className="flex flex-1 flex-wrap gap-4">
                    {/* Topic Search */}
                    <div className="relative w-60 h-10 bg-white rounded border border-transparent shadow-sm flex items-center px-4">
                        <Search className="text-[#999999] mr-3" size={18} />
                        <input
                            className="w-full text-base outline-none bg-transparent"
                            placeholder="搜尋主題"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Date Range - Start */}
                    <div className="relative w-48 h-10 bg-white rounded border border-transparent shadow-sm flex items-center px-4">
                        <Calendar className="text-[#999999] mr-3" size={18} />
                        <input
                            type="date"
                            className="w-full text-base outline-none bg-transparent cursor-pointer"
                            value={searchDateStart}
                            onChange={(e) => setSearchDateStart(e.target.value)}
                        />
                        {!searchDateStart && <span className="absolute left-11 text-[#999999] pointer-events-none">開始時間</span>}
                    </div>

                    <div>
                        ~
                    </div>

                    {/* Date Range - End */}
                    <div className="relative w-48 h-10 bg-white rounded border border-transparent shadow-sm flex items-center px-4">
                        <Calendar className="text-[#999999] mr-3" size={18} />
                        <input
                            type="date"
                            className="w-full text-base outline-none bg-transparent cursor-pointer"
                            value={searchDateEnd}
                            onChange={(e) => setSearchDateEnd(e.target.value)}
                        />
                        {!searchDateEnd && <span className="absolute left-11 text-[#999999] pointer-events-none">結束時間</span>}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSearchClick}
                        className="h-10 px-8 bg-[#197675] text-white rounded font-medium shadow hover:opacity-90 transition-all whitespace-nowrap"
                    >
                        搜尋
                    </button>
                    {/* Page Size Selector */}
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="h-10 px-3 bg-white rounded border border-transparent shadow-sm outline-none text-[#595959] cursor-pointer"
                    >
                        <option value={10}>10 筆/頁</option>
                        <option value={20}>20 筆/頁</option>
                        <option value={50}>50 筆/頁</option>
                    </select>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center px-2">
                <button
                    onClick={handleDownloadRequest}
                    disabled={selectedIds.size === 0}
                    className={`h-10 px-6 rounded font-medium transition-all ${selectedIds.size > 0 ? 'bg-[#197675] text-white shadow' : 'bg-gray-300 text-gray-500'}`}
                >
                    下載選取檔案 ({selectedIds.size})
                </button>
                <label className="flex items-center gap-2 cursor-pointer text-[#595959] text-sm">
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#197675]"
                        checked={files.length > 0 && selectedIds.size === files.length}
                        onChange={toggleSelectAll}
                    />
                    <span>全選</span>
                </label>
            </div>

            {/* List/Table */}
            <div className="flex flex-col gap-4">
                {isLoading ? (
                    <div className="text-center py-10 text-[#595959]">載入中...</div>
                ) : files.length === 0 ? (
                    <div className="text-center py-10 text-[#595959]">查無資料</div>
                ) : (
                    files.map(file => {
                        const statusConfig = getStatusConfig(file.會議記錄狀態);
                        return (
                            <div key={file.流水號} className="bg-white rounded-lg p-5 md:px-8 flex items-center gap-6 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-transparent hover:border-[#197675]/20 transition-all group">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 accent-[#197675]"
                                    checked={selectedIds.has(file.流水號)}
                                    onChange={() => toggleSelect(file.流水號)}
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[22px] font-medium text-[#595959] truncate mb-1" title={file.主題}>{file.主題}</h3>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#595959]">
                                        <span title="會議時間">📅 {file.會議時間}</span>
                                        <span title="會議地點">📍 {file.地點名稱 || '未指定'}</span>
                                        <span>建立者: {file.建立者}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 min-w-[100px]">
                                    <div className={`flex items-center gap-2 font-medium justify-end ${statusConfig.color}`}>
                                        <span className="text-lg">{statusConfig.icon}</span>
                                        <span className="text-sm">{statusConfig.text}</span>
                                    </div>
                                    {file.會議記錄狀態 === MeetingRecordStatus.Completed && (
                                        <button
                                            onClick={() => {/* Single download logic if needed usually opens modal */ }}
                                            className="p-2 rounded-full hover:bg-[#F1F3F2] text-[#595959] transition-all"
                                            title="下載"
                                        >
                                            <Download size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {totalCount > 0 && (
                <div className="flex justify-center items-center gap-4 mt-4 text-[#595959]">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="font-medium">
                        第 {currentPage} 頁 / 共 {totalPages} 頁 (總筆數: {totalCount})
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};
