import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { FileRecord } from '../types';
import { INITIAL_FILES } from '../constants';

interface FilesContextType {
    files: FileRecord[];
    setFiles: React.Dispatch<React.SetStateAction<FileRecord[]>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    searchDate: string;
    setSearchDate: React.Dispatch<React.SetStateAction<string>>;
    selectedIds: Set<string>;
    setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
    filteredFiles: FileRecord[];
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);

export function FilesProvider({ children }: { children: ReactNode }) {
    const [files, setFiles] = useState<FileRecord[]>(INITIAL_FILES);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const filteredFiles = useMemo(() => {
        return files.filter(file => {
            const matchTitle = file.title.toLowerCase().includes(searchTerm.toLowerCase());
            const formattedSearchDate = searchDate.replace(/-/g, '/');
            const matchDate = !searchDate || file.date.includes(formattedSearchDate);
            return matchTitle && matchDate;
        });
    }, [files, searchTerm, searchDate]);

    return (
        <FilesContext.Provider
            value={{
                files,
                setFiles,
                searchTerm,
                setSearchTerm,
                searchDate,
                setSearchDate,
                selectedIds,
                setSelectedIds,
                filteredFiles
            }}
        >
            {children}
        </FilesContext.Provider>
    );
}

export function useFiles() {
    const context = useContext(FilesContext);
    if (context === undefined) {
        throw new Error('useFiles must be used within a FilesProvider');
    }
    return context;
}
