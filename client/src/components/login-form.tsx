import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Meta, Google, Apple } from '@/components/svgs';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type LoginFormProps = {
  isLoading: boolean;
  className?: string;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function LoginForm({
  isLoading,
  className,
  submitHandler,
}: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={submitHandler} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@gmail.com"
                  autoComplete="off"
                  defaultValue="jemuel.work@gmail.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    tabIndex={-1}
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" />
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="flex items-center w-full disabled:bg-primary/50 disabled:text-primary-foreground">
                {isLoading && <Loader2 className="animate-spin" />}
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button type="button" variant="outline" className="w-full">
                  <Apple />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <Google />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  <Meta />
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/images" className="underline underline-offset-4">
                  Sign in as a guest
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/login-image.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <Link to="/dashboard">Privacy Policy</Link>.
      </div>
    </div>
  );
}
