import Layout from '@/components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginScreen = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { redirect } = router;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [session, redirect, router]);

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl text-center text-indigo-800 ">Login</h1>
        <div className="mb-4 text-indigo-800">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full"
            autoFocus
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4 text-indigo-800">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full"
            autoFocus
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="flex items-center justify-center flex-col">
          <button className="primary-button">Login</button>
          <div>
            Don&apos;t have an account? &nbsp;
            <Link href="/register" className="text-indigo-800">
              Register
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
