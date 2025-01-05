import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/sign_out');
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      toast.success(data.message);
      clearAuth();
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="p-32 flex flex-col gap-4">
      <h1 className="dark:text-slate-50 text-3xl">Authenticated Page</h1>
      <hr className="dark:border-slate-60 border-slate-20 my-4" />
      <p className="dark:text-slate-50 text-lg">
        Welcome, {user?.email}! You are {user?.role}.
      </p>
      <Button onClick={handleLogout} className="w-1/4">
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
