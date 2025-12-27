import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { FilesProvider } from './context/FilesContext';
import { DialogProvider } from './context/DialogContext';
import { AppRouter } from './router';

export default function App() {
  return (
    <DialogProvider>
      <AuthProvider>
        <FilesProvider>
          <AppRouter />
        </FilesProvider>
      </AuthProvider>
    </DialogProvider>
  );
}