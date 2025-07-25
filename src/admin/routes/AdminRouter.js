/**
 * Admin Router
 * Simplified routing for admin login and dashboard only
 */

import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import AdminLayout from '../components/layout/AdminLayout';
import AdminLogin from '../components/auth/AdminLogin';
import Dashboard from '../components/dashboard/Dashboard';
import Proposers from '../components/proposers/Proposers';
import Investors from '../components/investors/Investors';
import Executed from '../components/executed/Executed';

// Route Guards
import ProtectedRoute from './ProtectedRoute';

// Selectors
import { selectIsAuthenticated, restoreAuthFromStorage } from '../store/slices/authSlice';

const AdminRouter = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Restore authentication state on app initialization
  useEffect(() => {
    dispatch(restoreAuthFromStorage());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? 
            <Navigate to="/admin/dashboard" replace /> : 
            <AdminLogin />
        } 
      />
      
      {/* Protected Admin Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                {/* Dashboard - Simple admin dashboard */}
                <Route 
                  path="/dashboard" 
                  element={<Dashboard />} 
                />
                
                {/* Proposers Management */}
                <Route 
                  path="/proposers" 
                  element={<Proposers />} 
                />
                
                {/* Investors Management */}
                <Route 
                  path="/investors" 
                  element={<Investors />} 
                />
                
                {/* Executed Proposals */}
                <Route 
                  path="/executed" 
                  element={<Executed />} 
                />
                
                {/* Default redirect to dashboard */}
                <Route 
                  path="/" 
                  element={<Navigate to="/admin/dashboard" replace />} 
                />
                
                {/* 404 redirect to dashboard */}
                <Route 
                  path="*" 
                  element={<Navigate to="/admin/dashboard" replace />} 
                />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRouter;