import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/userSlice';
import { RiMenu3Line, RiCloseLine, RiLogoutBoxRLine, RiShieldUserLine } from 'react-icons/ri';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50 w-full antialiased">
      <div className="w-full px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section - Flush Left */}
          <div className="flex items-center gap-3 select-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
              <RiShieldUserLine className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white">Portfolio</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Admin Panel</span>
            </div>
          </div>

          {/* Desktop Actions - Flush Right */}
          <div className="hidden md:flex md:items-center">
            <button 
              onClick={handleLogout} 
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-red-900/50 hover:bg-red-950/30 hover:text-red-400 active:scale-95 cursor-pointer"
            >
              <RiLogoutBoxRLine className="h-4 w-4" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Trigger Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors cursor-pointer"
            >
              {isOpen ? <RiCloseLine className="h-6 w-6" /> : <RiMenu3Line className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel Dropdown */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden absolute left-0 right-0 shadow-xl shadow-black/40 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-950 bg-red-950/20 px-4 py-3 text-sm font-semibold text-red-400 transition-colors hover:bg-red-950/40 active:scale-98 cursor-pointer"
          >
            <RiLogoutBoxRLine className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;