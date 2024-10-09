import React, { useContext } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import ContextApp from '../Models/Contexto';

function withAuth(Component: React.ComponentType<RouteProps>) {
    return function WrappedComponent(props: RouteProps) {
      const { bandera, isLoading } = useContext(ContextApp);
  
      if (isLoading) {
        return null; 
      }
  
      if (!bandera) {
        return <Navigate to="/" />;
      }
  
      return <Component {...props} />;
    }
  }
  
export default withAuth;
