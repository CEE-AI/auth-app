import React, { PropsWithChildren } from 'react'
import { User } from '../types/user';
import { useAuth } from './AuthProvider';

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: User['role'][];
};

export default function ProtectedRoute({
    allowedRoles, 
    children
} : ProtectedRouteProps) {
    const {currentUser} = useAuth()

    if((currentUser === undefined)){
        return <div>Loading...</div>
    }

    if((currentUser === null) || (allowedRoles && !allowedRoles.includes(currentUser.role))){
        return <div>Unauthorized</div>
    }
  return children
}
