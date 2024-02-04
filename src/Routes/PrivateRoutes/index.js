import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../../Containers/Layout';

export default function PrivateRoutes() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Navigate to="/login" />
    );
}
