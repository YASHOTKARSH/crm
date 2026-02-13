import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function RoleBasedRoute({ allowedRoles }) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
