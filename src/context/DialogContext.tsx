import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DialogConfig } from '../types';

interface DialogContextType {
    dialogConfig: DialogConfig;
    openDialog: (config: Partial<DialogConfig>) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
    const [dialogConfig, setDialogConfig] = useState<DialogConfig>({
        isOpen: false,
        type: 'success',
        title: '',
        subtitle: '',
        onConfirm: null,
        showButton: true
    });

    const openDialog = (config: Partial<DialogConfig>) => {
        setDialogConfig(prev => ({ ...prev, ...config, isOpen: true }));
    };

    const closeDialog = () => {
        setDialogConfig(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <DialogContext.Provider value={{ dialogConfig, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
}

export function useDialog() {
    const context = useContext(DialogContext);
    if (context === undefined) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
}
