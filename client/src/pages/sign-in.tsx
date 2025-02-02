import { supabaseSignIn } from '@/auth/sign-in';
import { LoginForm } from '@/components/login-form';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuthStore } from '@/stores/auth';
import { formSchema } from '@/utils/form-schema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignInPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    setIsLoading(true);

    try {
      const { user, session } = await supabaseSignIn(data);

      if (user && session) {
        setUser(user);
        setSession(session);

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
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <ModeToggle />
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm isLoading={isLoading} submitHandler={submitHandler} />
      </div>
    </div>
  );
};

export default SignInPage;
