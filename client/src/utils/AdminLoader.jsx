import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RiShieldUserLine } from 'react-icons/ri';

/**
 * Full-screen loading overlay for the admin panel.
 *
 * - Locks page scroll while visible (`active` prop) and restores it on unmount/hide.
 * - Purely presentational + animated (spinning ring, pulsing glow, scanning line,
 *   animated ellipsis) so it reads as "alive" rather than a static spinner.
 *
 * Usage:
 *   <AdminLoader active={isLoading} label="Loading admin console" />
 */
const AdminLoader = ({ active = true, label = 'Loading admin console' }) => {
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="admin-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-950"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          {/* Ambient backdrop, matching the auth screens: hairline grid + radial glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[110px]"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col items-center px-6">
            {/* Spinning ring + pulsing shield mark */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-slate-800 border-t-indigo-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-indigo-400 shadow-inner shadow-indigo-500/10"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <RiShieldUserLine className="h-6 w-6" />
              </motion.div>
            </div>

            {/* Label with animated ellipsis */}
            <p className="mt-6 flex items-center text-sm font-medium text-slate-300">
              {label}
              <span className="ml-1 inline-flex w-5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </p>

            {/* Scanning progress line */}
            <div className="mt-5 h-1 w-48 overflow-hidden rounded-full bg-slate-900">
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slate-600">
              Secure session · Please wait
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminLoader;