import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  RiDashboardLine,
  RiUserLine,
  RiBriefcaseLine,
  RiFolder3Line,
  RiToolsLine,
  RiMenu3Line,
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from 'react-icons/ri';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: RiDashboardLine, end: true },
  { to: '/admin/profile', label: 'Profile', icon: RiUserLine },
  { to: '/admin/experience', label: 'Experience', icon: RiBriefcaseLine },
  { to: '/admin/projects', label: 'Projects', icon: RiFolder3Line },
  { to: '/admin/skills', label: 'Skills', icon: RiToolsLine },
];

const linkClasses = ({ isActive }, collapsed) =>
  `group relative flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
    collapsed ? 'justify-center' : ''
  } ${
    isActive
      ? 'border-blue-400/30 bg-blue-500/15 text-blue-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
      : 'border-transparent text-slate-400 hover:border-blue-400/10 hover:bg-blue-950/40 hover:text-white'
  }`;

const NavItems = ({ collapsed, onNavigate }) => (
  <nav className="flex flex-1 flex-col gap-1.5 px-3">
    {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
      <NavLink
        key={to}
        to={to}
        end={end}
        onClick={onNavigate}
        className={(state) => linkClasses(state, collapsed)}
        title={collapsed ? label : undefined}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </NavLink>
    ))}
  </nav>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-[4.5rem] z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-950/50 text-slate-300 shadow-lg shadow-black/40 backdrop-blur-xl transition-colors hover:text-white md:hidden"
      >
        <RiMenu3Line className="h-5 w-5" />
      </button>

      {/* Mobile drawer + backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-blue-400/[0.09] bg-[#020817]/95 py-4 shadow-2xl shadow-black/60 backdrop-blur-2xl md:hidden"
            >
              <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-200/15 to-transparent" />
              <div className="mb-4 flex items-center justify-between px-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-950/50 hover:text-white"
                >
                  <RiCloseLine className="h-5 w-5" />
                </button>
              </div>
              <NavItems collapsed={false} onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop persistent, collapsible sidebar — floating glass panel */}
      <motion.aside
        animate={{ width: collapsed ? 84 : 248 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="sticky top-[4.75rem] hidden h-[calc(100vh-5.5rem)] shrink-0 flex-col self-start md:ml-3 md:flex"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 py-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          {/* Crystal sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <NavItems collapsed={collapsed} />

          <div className="mt-2 px-3">
            <button
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className={`flex w-full items-center gap-3 rounded-xl border border-blue-400/10 bg-blue-950/30 px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-white ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              {collapsed ? (
                <RiArrowRightSLine className="h-5 w-5 shrink-0" />
              ) : (
                <>
                  <RiArrowLeftSLine className="h-5 w-5 shrink-0" />
                  <span className="whitespace-nowrap">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;