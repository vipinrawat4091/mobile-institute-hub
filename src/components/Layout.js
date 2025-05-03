
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  Search,
  Check,
} from 'lucide-react';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const getRoleColor = (role) => {
    const roleColors = {
      superadmin: 'role-superadmin',
      admin: 'role-admin',
      teacher: 'role-teacher',
      staff: 'role-staff',
      student: 'role-student',
      parent: 'role-parent'
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
        { name: 'Attendance', icon: Calendar, link: '/attendance' },
        { name: 'Leave Approval', icon: Check, link: '/leave-approval' },
        { name: 'Notices', icon: Bell, link: '/notices' },
        { name: 'Time Table', icon: Calendar, link: '/timetable' },
        { name: 'Leave Application', icon: FileText, link: '/leave' },
        { name: 'Profile', icon: User, link: '/profile' },
      ],
      staff: [
        { name: 'Profile', icon: User, link: '/profile' },
      ],
      student: [
        { name: 'Attendance', icon: Calendar, link: '/attendance' },
        { name: 'Marks', icon: FileText, link: '/marks' },
        { name: 'Report Card', icon: FileText, link: '/report' },
        { name: 'ID Card', icon: User, link: '/id-card' },
        { name: 'Notices', icon: Bell, link: '/notices' },
      ],
      parent: [
        { name: 'Leave Application', icon: FileText, link: '/leave' },
        { name: 'Attendance', icon: Calendar, link: '/attendance' },
        { name: 'Marks', icon: FileText, link: '/marks' },
        { name: 'Report Card', icon: FileText, link: '/report' },
        { name: 'Notices', icon: Bell, link: '/notices' },
      ]
    };

    return [...commonItems, ...(roleItems[currentUser.role] || [])];
  };

  return (
    <div className="flex h-full min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 w-64 h-full transform transition-transform duration-300 ease-in-out bg-sidebar border-r border-border md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRoleColor(currentUser?.role)}`}>
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{currentUser?.name || 'User'}</span>
                <span className="text-xs text-muted-foreground capitalize">{currentUser?.role || 'Role'}</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <ul className="space-y-1">
              {getNavItems().map((item) => (
                <li key={item.name}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left h-10"
                    onClick={() => {
                      navigate(item.link);
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left" 
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 flex items-center border-b border-border px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleSidebar}
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
