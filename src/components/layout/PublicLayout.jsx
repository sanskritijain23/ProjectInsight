import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Public layout wrapper for publicly accessible pages like the Project Repository.
 * Keeps navigation and institutional footer intact without requiring authentication.
 */
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col text-ink-primary antialiased">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
