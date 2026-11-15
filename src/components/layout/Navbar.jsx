import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, FileSearch, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-burgundy flex items-center justify-center text-ivory shadow-soft group-hover:bg-burgundy-hover transition-colors">
            <Compass className="w-5 h-5 text-ivory" />
          </div>
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-burgundy-dark">
                ProjectInsight
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-antique px-1.5 py-0.2 border border-antique/40 rounded">
                Collegiate Platform
              </span>
            </div>
            <p className="text-[11px] text-ink-secondary tracking-wide">
              Discover Existing Work. Inspire New Ideas.
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-ink-primary">
          <Link
            to={user ? (user.role === 'faculty' ? '/faculty/projects' : '/student/projects') : '/projects'}
            className="hover:text-burgundy transition-colors"
          >
            Project Repository
          </Link>
          <Link
            to="/student/analyse"
            className="hover:text-burgundy transition-colors flex items-center space-x-1.5"
          >
            <FileSearch className="w-3.5 h-3.5 text-burgundy" />
            <span>Prior Art Analysis</span>
          </Link>
          <Link
            to="/#how-it-works"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-burgundy transition-colors"
          >
            Evaluation Methodology
          </Link>
          <Link
            to="/faculty/dashboard"
            className="text-ink-secondary hover:text-burgundy transition-colors"
          >
            Faculty Gateway
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center space-x-3">
          {user ? (
            <Link
              to={user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard'}
              className="inline-flex items-center px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-soft"
            >
              <span>{user.role === 'faculty' ? 'Faculty Panel' : 'Student Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-3.5 py-2 text-xs font-medium text-ink-primary hover:text-burgundy transition-colors"
              >
                <LogIn className="w-4 h-4 mr-1.5 text-ink-muted" />
                <span>Sign In</span>
              </Link>
              <Link
                to="/student/analyse"
                className="inline-flex items-center px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-soft"
              >
                <span>Evaluate Proposal</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
