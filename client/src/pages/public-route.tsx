import { useAuthStore } from '@/stores/auth';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const session = useAuthStore((state) => state.session);
  return session ? <Navigate to="/images" replace /> : children;
};

export default PublicRoute;
