import { LoginForm } from '@/components/login-form';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuthStore } from '@/stores/auth';
import { formSchema } from '@/utils/form-schema';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignInPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const baseUrl = import.meta.env.VITE_API_URL as string;
  const url = `${baseUrl}/api/sign_in`;

  const fetcher = async (formData: formSchema) => {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: formSchema = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };

    if (!data.email || !data.password) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      toast.loading('Signing in...');

      const response = await fetcher(data);

      console.log('response:', response);

      if (response) {
        setUser(response.user);

        form.reset();
        navigate('/images');
        toast.success('Signed in successfully.');
      }
    } catch (error) {
      toast.error('Login failed.', {
        description: 'Please check your credentials and try again.',
      });
      console.error('Error during login:', error);
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <ModeToggle />
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm submitHandler={submitHandler} />
      </div>
    </div>
  );
};

export default SignInPage;
