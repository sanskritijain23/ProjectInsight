import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  FileSearch,
  History,
  Bookmark,
  Settings,
  FolderKanban,
  PlusCircle,
  ClipboardCheck,
  BarChart3,
  LogOut,
  ArrowLeftRight,
  UserCheck,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ onCloseMobile }) {
  const { user, isFaculty, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleRoleToggle = () => {
    const newRole = isFaculty ? 'student' : 'faculty';
    switchRole(newRole);
    navigate(newRole === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
    if (onCloseMobile) onCloseMobile();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    if (onCloseMobile) onCloseMobile();
  };

  const studentNavItems = [
    { label: 'Overview', to: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Project Repository', to: '/student/projects', icon: Compass },
    { label: 'Idea Feasibility Check', to: '/student/analyse', icon: FileSearch, highlight: true },
    { label: 'Analysis History', to: '/student/analyses', icon: History },
    { label: 'Saved Literature', to: '/student/saved', icon: Bookmark },
    { label: 'Profile Settings', to: '/student/settings', icon: Settings },
  ];

  const facultyNavItems = [
    { label: 'Curriculum Overview', to: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Project Repository', to: '/faculty/projects', icon: FolderKanban },
    { label: 'Index Capstone Record', to: '/faculty/projects/new', icon: PlusCircle, highlight: true },
    { label: 'Proposal Reviews', to: '/faculty/reviews', icon: ClipboardCheck },
    { label: 'Department Analytics', to: '/faculty/analytics', icon: BarChart3 },
    { label: 'Coordinator Settings', to: '/faculty/settings', icon: Settings },
  ];

  const navItems = isFaculty ? facultyNavItems : studentNavItems;

  return (
    <aside className={`w-64 border-r h-full flex flex-col justify-between select-none transition-colors ${
      isFaculty ? 'bg-ivory-card border-burgundy/15' : 'bg-ivory-card border-border'
    }`}>
      {/* Brand Header */}
      <div>
        <div className={`p-5 border-b ${isFaculty ? 'border-burgundy/15 bg-burgundy/[0.02]' : 'border-border'}`}>
          <Link
            to="/"
            onClick={onCloseMobile}
            className="flex items-center space-x-3 group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-ivory shadow-soft transition-colors ${
              isFaculty ? 'bg-burgundy-dark group-hover:bg-burgundy' : 'bg-burgundy group-hover:bg-burgundy-hover'
            }`}>
              <Compass className="w-5 h-5 text-ivory" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-xl font-bold tracking-tight text-burgundy-dark">
                  ProjectInsight
                </span>
              </div>
              <p className={`text-[10px] uppercase font-bold tracking-wider ${
                isFaculty ? 'text-burgundy' : 'text-antique'
              }`}>
                {isFaculty ? "Faculty Administration" : "Student Research Portal"}
              </p>
            </div>
          </Link>
        </div>

        {/* Role Quick Switch Pill */}
        <div className="px-4 py-3 bg-ivory/60 border-b border-border/60">
          <button
            onClick={handleRoleToggle}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-all shadow-soft focus:outline-none ${
              isFaculty
                ? 'bg-burgundy/5 border-burgundy/30 text-burgundy-dark hover:bg-burgundy/10'
                : 'bg-ivory-card border-border text-ink-primary hover:border-burgundy/30'
            }`}
            title={`Switch to ${isFaculty ? 'Student' : 'Faculty'} view`}
          >
            <div className="flex items-center space-x-2">
              {isFaculty ? (
                <UserCheck className="w-4 h-4 text-burgundy" />
              ) : (
                <GraduationCap className="w-4 h-4 text-antique-dark" />
              )}
              <div className="text-left">
                <div className="font-bold text-[11px] leading-tight">
                  {isFaculty ? 'Faculty Mode' : 'Student Mode'}
                </div>
                <div className="text-[10px] text-ink-muted">
                  {isFaculty ? 'Curriculum Oversight' : 'Capstone Candidate'}
                </div>
              </div>
            </div>
            <span className="flex items-center text-[10px] uppercase font-bold text-burgundy tracking-wider pl-2">
              Switch
              <ArrowLeftRight className="w-2.5 h-2.5 ml-1" />
            </span>
          </button>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all focus:outline-none ${
                    isActive
                      ? isFaculty
                        ? 'bg-burgundy-dark text-ivory shadow-soft font-semibold'
                        : 'bg-burgundy text-ivory shadow-soft font-semibold'
                      : item.highlight
                      ? 'text-burgundy hover:bg-burgundy/10 hover:text-burgundy-dark font-semibold'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-beige/40'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-ivory' : item.highlight ? 'text-burgundy' : 'text-ink-muted'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.highlight && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User profile & actions */}
      <div className={`p-4 border-t ${isFaculty ? 'border-burgundy/15 bg-burgundy/[0.02]' : 'border-border bg-ivory/40'}`}>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-burgundy/10 border border-burgundy/20 flex items-center justify-center font-serif font-bold text-burgundy text-sm flex-shrink-0">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-ink-primary truncate">
              {user?.name || "Academic User"}
            </p>
            <p className="text-[11px] text-ink-secondary truncate">
              {user?.designation || user?.department || "Computer Science"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border border-border bg-ivory-card hover:bg-beige/30 text-ink-secondary hover:text-burgundy text-xs font-medium transition-colors focus:outline-none"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
