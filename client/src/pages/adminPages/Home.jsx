import React from 'react';
import Navbar from '../../components/adminComponents/Navbar';
import Footer from '../../components/adminComponents/Footer';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import useFetchUserData from '../../hooks/useFetchUserData';
import AdminLoader from '../../utils/AdminLoader';
import Sidebar from '../../components/adminComponents/Sidebar';

const Home = () => {
  useFetchUserData();

  const { userData, loading, token } = useSelector((state) => state.user);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (loading) {
    return <AdminLoader active label="Loading admin console" />;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#020817] antialiased">
      {/* Deep navy backdrop: faint grid + layered blue glows for a crystal feel */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(96,165,250,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="pointer-events-none fixed -left-32 top-0 -z-10 h-[480px] w-[480px] rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="pointer-events-none fixed right-0 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-indigo-600/15 blur-[130px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.07] blur-[130px]" />

      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* Main content area */}
        <main className="relative flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            {/* Glass content panel so pages rendered via Outlet sit inside a
                consistent navy-blue crystal surface rather than floating on bare background */}
            <div className="relative overflow-hidden rounded-2xl border border-blue-400/[0.09] bg-blue-950/20 p-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent" />
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Home;