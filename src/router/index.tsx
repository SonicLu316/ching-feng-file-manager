import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/LoginPage';
import { FilesPage } from '../pages/FilesPage';
import { AddFilePage } from '../pages/AddFilePage';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/files" replace />,
            },
            {
                path: 'files',
                element: <FilesPage />,
            },
            {
                path: 'add',
                element: <AddFilePage />,
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
