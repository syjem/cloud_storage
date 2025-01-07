import { LoginForm } from '@/components/login-form';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuthStore } from '@/stores/auth';
import { formSchema, formSubmit } from '@/utils/submit-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignInPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);

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
      const response = await formSubmit(data);
      setUser(response.user);
      setSession(response.session);

      form.reset();
      navigate('/images');
      toast.success('Signed in');
    } catch (error) {
      toast.error('Login failed.', {
        description: 'Please check your credentials and try again.',
      });
      console.error('Error submitting the form:', error);
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
