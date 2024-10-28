import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import InterceptorWrapper from "./api/InterceptorWrapper";
import AppRoutes from './components/AppRoutes';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <InterceptorWrapper>
                <AppRoutes />
            </InterceptorWrapper>
        </BrowserRouter>
    );
};

export default App;
