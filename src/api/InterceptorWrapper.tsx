// src/components/InterceptorWrapper.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors } from '../api/axiosInstance';

const InterceptorWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setupInterceptors(() => navigate('/')); // Redirect to root on 403
    }, [navigate]);

    return <>{children}</>;
};

export default InterceptorWrapper;
