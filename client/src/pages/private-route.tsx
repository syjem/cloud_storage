import { get_session } from '@/utils/get-session';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const session = get_session();
  return session ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
