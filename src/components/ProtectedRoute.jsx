import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();
  console.log("ProtectedRoute: Checking access for route with requiredRole:", requiredRole);
  console.log("ProtectedRoute: Current user:", user);

  if (!user) {
    console.log("ProtectedRoute: No user found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log("ProtectedRoute: User role", user.role, "does not match required role", requiredRole, "redirecting to", `/${user.role}/dashboard`);
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  console.log("ProtectedRoute: Access granted, rendering children");
  return <>{children}</>;
};

export default ProtectedRoute;
