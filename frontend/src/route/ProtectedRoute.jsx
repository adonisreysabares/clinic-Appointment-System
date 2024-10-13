import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { userData } = useAuth();
    if(!userData){
        
        return(
            <Navigate to="/login" replace={true}/>
        )
    }
    else{
        return children;
    }
};

export default ProtectedRoute;
