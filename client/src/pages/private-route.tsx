import { useAuthStore } from '@/stores/auth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const session = useAuthStore((state) => state.session);
  return session ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
