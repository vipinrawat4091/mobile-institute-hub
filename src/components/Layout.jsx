
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Home,
  UserPlus,
  Users,
  Calendar,
  Bell,
  Settings,
  LogOut,
  User,
  FileText,
  Bus,
  Check,
  ChevronLeft,
  X,
} from 'lucide-react';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };
  
  const getRoleColor = (role) => {
    const roleColors = {
      superadmin: 'bg-purple-600 text-white',
      admin: 'bg-blue-600 text-white',
      teacher: 'bg-green-600 text-white',
      staff: 'bg-amber-600 text-white',
      student: 'bg-sky-600 text-white',
      parent: 'bg-rose-600 text-white'
    };
    return roleColors[role] || 'bg-gray-500';
  };

  // Navigation items based on user role
  const getNavItems = () => {
    if (!currentUser) return [];

    const commonItems = [
      { name: 'Dashboard', icon: Home, link: '/dashboard' },
    ];

    // Role-specific items
    const roleItems = {
      superadmin: [
        { name: 'Institutes', icon: FileText, link: '/institutes' },
        { name: 'Permission Management', icon: Settings, link: '/permissions' },
        { name: 'User Creation', icon: UserPlus, link: '/user-creation' },
      ],
      admin: [
        { name: 'User Management', icon: UserPlus, link: '/user-management' },
        { name: 'Attendance', icon: Calendar, link: '/attendance-management' },
        { name: 'Salary Management', icon: FileText, link: '/salary-management' },
        { name: 'Leave Approval', icon: Check, link: '/leave-approval' },
        { name: 'Transport', icon: Bus, link: '/transport' },
        { name: 'Notices', icon: Bell, link: '/notices' },
        { name: 'Time Table', icon: Calendar, link: '/timetable' },
        { name: 'Fees', icon: FileText, link: '/fees' },
      ],
      teacher: [
        { name: 'Class Attendance', icon: Calendar, link: '/class-attendance' },
        { name: 'Leave Approval', icon: Check, link: '/leave-approval' },
        { name: 'Notices', icon: Bell, link: '/notices' },
        { name: 'Time Table', icon: Calendar, link: '/timetable' },
        { name: 'Leave Application', icon: FileText, link: '/leave-application' },
        { name: 'Profile', icon: User, link: '/profile' },
        { name: 'Events', icon: Calendar, link: '/events' },
      ],
      staff: [
        { name: 'Profile', icon: User, link: '/profile' },
        { name: 'Leave Application', icon: FileText, link: '/leave-application' },
        { name: 'Attendance', icon: Calendar, link: '/attendance-record' },
        { name: 'Salary', icon: FileText, link: '/salary' },
      ],
      student: [
        { name: 'Attendance', icon: Calendar, link: '/attendance' },
        { name: 'Marks', icon: FileText, link: '/marks' },
        { name: 'Report Card', icon: FileText, link: '/report' },
        { name: 'ID Card', icon: User, link: '/id-card' },
        { name: 'Notices', icon: Bell, link: '/notices' },
        { name: 'Timetable', icon: Calendar, link: '/timetable' },
        { name: 'Events', icon: Calendar, link: '/events' },
        { name: 'Leave Application', icon: FileText, link: '/leave-application' },
      ],
      parent: [
        { name: 'Leave Application', icon: FileText, link: '/leave-application' },
        { name: 'Attendance', icon: Calendar, link: '/child-attendance' },
        { name: 'Marks', icon: FileText, link: '/child-marks' },
        { name: 'Report Card', icon: FileText, link: '/child-report' },
        { name: 'Notices', icon: Bell, link: '/notices' },
        { name: 'Fees', icon: FileText, link: '/fees-payment' },
        { name: 'Events', icon: Calendar, link: '/events' },
      ]
    };

    return [...commonItems, ...(roleItems[currentUser.role] || [])];
  };

  const handleNavigation = (link) => {
    navigate(link);
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full transform transition-all duration-300 ease-in-out bg-sidebar border-r border-border ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${minimized ? 'w-16 md:w-16' : 'w-64'}`}
      >
        <div className="flex flex-col h-full relative">
          {/* Minimize button - only visible on desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-1 hidden md:flex"
            onClick={toggleMinimized}
          >
            <ChevronLeft className={`transition-transform ${minimized ? 'rotate-180' : ''}`} />
          </Button>

          {/* Close button - visible on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-1 md:hidden z-50"
            onClick={() => setSidebarOpen(false)}
            style={{ display: sidebarOpen ? 'flex' : 'none' }}
          >
            <X size={24} />
          </Button>

          {/* Sidebar header */}
          <div className={`flex items-center ${minimized ? 'justify-center' : 'justify-between'} h-16 px-4 border-b border-border`}>
            <div className={`flex ${minimized ? 'justify-center w-full' : 'items-center space-x-2'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRoleColor(currentUser?.role)}`}>
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              {!minimized && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser?.name || 'User'}</span>
                  <span className="text-xs text-muted-foreground capitalize">{currentUser?.role || 'Role'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {getNavItems().map((item) => (
                <li key={item.name}>
                  <Button
                    variant={window.location.pathname === item.link ? "secondary" : "ghost"}
                    className={`${minimized ? 'w-10 p-0 justify-center' : 'w-full justify-start text-left'} h-10`}
                    onClick={() => handleNavigation(item.link)}
                    title={minimized ? item.name : ''}
                  >
                    <item.icon className={minimized ? 'mx-auto' : 'mr-3'} />
                    {!minimized && item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className={`p-4 border-t border-border ${minimized ? 'flex justify-center' : ''}`}>
            <Button 
              variant="ghost" 
              className={`${minimized ? 'w-10 p-0 justify-center' : 'w-full justify-start text-left'}`} 
              onClick={logout}
              title={minimized ? 'Logout' : ''}
            >
              <LogOut className={minimized ? 'mx-auto' : 'mr-3'} />
              {!minimized && 'Logout'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 flex flex-col min-w-0 ${minimized ? 'md:ml-16' : 'md:ml-64'} transition-all duration-300`}>
        {/* Top header */}
        <header className="h-16 flex items-center border-b border-border px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </Button>
          <h1 className="ml-4 text-xl font-semibold">Mobile Institute Hub</h1>
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
