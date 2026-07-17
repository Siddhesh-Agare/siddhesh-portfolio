import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { setToken } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiMailLine,
  RiLock2Line,
  RiUserLine,
  RiLoader5Line,
  RiShieldUserLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCheckLine,
  RiCloseLine,
} from 'react-icons/ri';

// Password rules feed the strength meter below the password field.
const PASSWORD_RULES = [
  { label: '8+ characters', test: (v) => v.length >= 8 },
  { label: 'Upper & lowercase', test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { label: 'A number', test: (v) => /\d/.test(v) },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passedRules = useMemo(
    () => PASSWORD_RULES.filter((rule) => rule.test(password)).length,
    [password]
  );
  const strengthLabel = ['Too weak', 'Weak', 'Good', 'Strong'][passedRules];
  const strengthColor = ['bg-slate-700', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500'][
    passedRules
  ];

  const emailValid = email.length === 0 || EMAIL_RE.test(email);
  const isFormValid =
    name.trim().length > 1 && EMAIL_RE.test(email) && passedRules === PASSWORD_RULES.length;

  const registerUserHandler = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!isFormValid) return;

    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token', response?.data?.token);
        toast.success(response?.data?.message || 'User registered successfully');
        navigate('/admin');
      }
    } catch (error) {
      console.log(error, 'error in register user');
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
      {/* Ambient backdrop: a quiet radial glow + hairline grid, kept subtle so it reads as texture, not decoration */}
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
          {/* Header/Logo Branding */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 text-indigo-400 shadow-inner shadow-indigo-500/10">
              <RiShieldUserLine className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Create account
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">Register a new administrator node</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={registerUserHandler} noValidate className="space-y-5">
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Full name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <RiUserLine className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    disabled={loading}
                    placeholder="John Doe"
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    value={name}
                    className="block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 pl-10 text-sm text-white placeholder-slate-600 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                  />
                </div>
                {touched.name && name.trim().length <= 1 && (
                  <p className="mt-1.5 text-xs text-rose-400">Enter your full name.</p>
                )}
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Password
                </label>
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
                    autoComplete="new-password"
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

                {/* Signature element: a terminal-style security scan strip, in keeping with
                    the "administrator node" framing, rather than a generic progress bar */}
                {password.length > 0 && (
                  <div className="mt-2.5 rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                        credential strength
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-widest ${
                          passedRules === 0
                            ? 'text-slate-500'
                            : passedRules === 1
                            ? 'text-rose-400'
                            : passedRules === 2
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                    <div className="mb-2 flex gap-1">
                      {PASSWORD_RULES.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i < passedRules ? strengthColor : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                    <ul className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                      {PASSWORD_RULES.map((rule) => {
                        const pass = rule.test(password);
                        return (
                          <li
                            key={rule.label}
                            className={`flex items-center gap-1 text-[11px] ${
                              pass ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {pass ? (
                              <RiCheckLine className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            ) : (
                              <RiCloseLine className="h-3.5 w-3.5 shrink-0 text-slate-700" />
                            )}
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-indigo-500 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RiLoader5Line className="h-5 w-5 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register now'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Sign in
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

export default Register;