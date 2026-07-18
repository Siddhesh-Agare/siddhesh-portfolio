import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-white/[0.06] bg-[#05060a]/70 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 sm:px-6">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Portfolio Admin Panel. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;