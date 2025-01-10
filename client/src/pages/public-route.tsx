import { get_session } from '@/utils/get-session';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactElement }) => {
  const session = get_session();
  return session ? <Navigate to="/images" replace /> : children;
};

export default PublicRoute;
