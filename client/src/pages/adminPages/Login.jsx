import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  RiMailLine,
  RiLock2Line,
  RiLoader5Line,
  RiShieldUserLine,
  RiEyeLine,
  RiEyeOffLine,
} from 'react-icons/ri';
import { setToken } from '../../redux/slices/userSlice';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailValid = email.length === 0 || EMAIL_RE.test(email);
  const isFormValid = EMAIL_RE.test(email) && password.length > 0;

  const loginUserHandler = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!isFormValid) return;

    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password,
      });

      if (response?.data?.success) {
        const token = response.data.token;
        dispatch(setToken(token));
        localStorage.setItem('token', token);

        toast.success(response?.data?.message || 'User logged in successfully');
        navigate('/admin');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const {token} = useSelector((state)=>state.user);

  if(token){
    return <Navigate to ="/admin" />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 antialiased sm:px-6">
      {/* Ambient backdrop, matching the Register page: hairline grid + radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo-600/20 blur-[110px] sm:h-[560px] sm:w-[560px]" />

      <div className="relative w-full max-w-md animate-[fadeIn_0.4s_ease-out]">
        <div className="space-y-6 rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-indigo-400 shadow-inner shadow-indigo-500/10">
              <RiShieldUserLine className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">
              Sign in to access your portfolio admin panel
            </p>
          </div>

          <form onSubmit={loginUserHandler} noValidate className="space-y-5">
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <RiMailLine className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={loading}
                    placeholder="name@company.com"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    value={email}
                    aria-invalid={touched.email && !emailValid}
                    className={`block w-full rounded-xl border bg-slate-950 px-4 py-3 pl-10 text-sm text-white placeholder-slate-600 transition-all duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 ${
                      touched.email && !emailValid
                        ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  />
                </div>
                {touched.email && !emailValid && (
                  <p className="mt-1.5 text-xs text-rose-400">Enter a valid email address.</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <RiLock2Line className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={loading}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    value={password}
                    className="block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 pl-10 pr-11 text-sm text-white placeholder-slate-600 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 transition-colors hover:text-slate-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="h-5 w-5" />
                    ) : (
                      <RiEyeLine className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-indigo-500 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RiLoader5Line className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Need an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/admin/register')}
              className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Register
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.4s_ease-out\\] { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default Login;