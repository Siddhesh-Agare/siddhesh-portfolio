import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { setToken } from '../../redux/slices/userSlice';
import { RiMenu3Line, RiCloseLine, RiLogoutBoxRLine, RiShieldUserLine } from 'react-icons/ri';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setToken(null));
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#05060a]/70 antialiased backdrop-blur-2xl">
      {/* Crystal highlight: a hairline of light along the very top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="w-full px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex select-none items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-indigo-500/20 blur-xl" />
              <RiShieldUserLine className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white">Portfolio</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center">
            <button
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300 active:scale-95"
            >
              <RiLogoutBoxRLine className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-transparent p-2 text-slate-400 transition-colors hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <RiCloseLine className="h-6 w-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <RiMenu3Line className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="absolute left-0 right-0 overflow-hidden border-t border-white/[0.06] bg-[#05060a]/90 shadow-2xl shadow-black/60 backdrop-blur-2xl md:hidden"
          >
            <div className="px-4 py-4">
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300 transition-colors hover:bg-rose-500/20 active:scale-[0.98]"
              >
                <RiLogoutBoxRLine className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;