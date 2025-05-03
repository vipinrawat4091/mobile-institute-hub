import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  Users, 
  Calendar, 
  Bell, 
  Clock, 
  FileText, 
  Bus, 
  Check,
  User
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Generate dashboard cards based on user role
  const getDashboardCards = () => {
    const commonCards = [
      {
        title: 'Welcome',
        description: `Welcome back, ${currentUser.name}`,
        icon: Home,
        color: 'bg-blue-100 text-blue-600'
      },
    ];

    const roleCards = {
      superadmin: [
        {
          title: 'Institutes',
          description: '3 institutes registered',
          icon: FileText,
          color: 'bg-purple-100 text-purple-600'
        },
        {
          title: 'Permission Management',
          description: 'Manage role permissions',
          icon: Check,
          color: 'bg-indigo-100 text-indigo-600'
        },
        {
          title: 'User Creation',
          description: 'Create admin accounts',
          icon: Users,
          color: 'bg-sky-100 text-sky-600'
        }
      ],
      admin: [
        {
          title: 'User Management',
          description: 'Manage staff and student accounts',
          icon: Users,
          color: 'bg-blue-100 text-blue-600'
        },
        {
          title: 'Attendance',
          description: 'Track staff and teacher attendance',
          icon: Calendar,
          color: 'bg-green-100 text-green-600'
        },
        {
          title: 'Notices',
          description: '3 new notices to review',
          icon: Bell,
          color: 'bg-amber-100 text-amber-600'
        },
        {
          title: 'Pending Approvals',
          description: '5 leave requests pending',
          icon: Clock,
          color: 'bg-rose-100 text-rose-600'
        }
      ],
      teacher: [
        {
          title: 'Student Attendance',
          description: '28/30 students present today',
          icon: Calendar,
          color: 'bg-emerald-100 text-emerald-600'
        },
        {
          title: 'Timetable',
          description: '6 classes scheduled today',
          icon: Clock,
          color: 'bg-blue-100 text-blue-600'
        },
        {
          title: 'Pending Approvals',
          description: '3 student leave requests',
          icon: Check,
          color: 'bg-amber-100 text-amber-600'
        },
        {
          title: 'Notices',
          description: '2 new notices',
          icon: Bell,
          color: 'bg-rose-100 text-rose-600'
        }
      ],
      staff: [
        {
          title: 'My Profile',
          description: 'View salary and leave details',
          icon: User,
          color: 'bg-indigo-100 text-indigo-600'
        }
      ],
      student: [
        {
          title: 'Attendance',
          description: 'Present: 22 days this month',
          icon: Calendar,
          color: 'bg-green-100 text-green-600'
        },
        {
          title: 'Marks',
          description: 'Last test score: 85%',
          icon: FileText,
          color: 'bg-blue-100 text-blue-600'
        },
        {
          title: 'Timetable',
          description: '5 subjects today',
          icon: Clock,
          color: 'bg-purple-100 text-purple-600'
        },
        {
          title: 'Notices',
          description: '1 new notice',
          icon: Bell,
          color: 'bg-amber-100 text-amber-600'
        }
      ],
      parent: [
        {
          title: 'Child Attendance',
          description: 'Present: 22 days this month',
          icon: Calendar,
          color: 'bg-green-100 text-green-600'
        },
        {
          title: 'Child Performance',
          description: 'Last test score: 85%',
          icon: FileText,
          color: 'bg-blue-100 text-blue-600'
        },
        {
          title: 'Leave Application',
          description: 'No pending leave requests',
          icon: Check,
          color: 'bg-purple-100 text-purple-600'
        },
        {
          title: 'Notices',
          description: '2 new notices',
          icon: Bell,
          color: 'bg-amber-100 text-amber-600'
        }
      ]
    };

    return [...commonCards, ...(roleCards[currentUser.role] || [])];
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} dashboard
        </p>
        
        {/* Role-specific welcome message */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Role: {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</CardTitle>
            <CardDescription>
              {currentUser.role === 'superadmin' && 'Manage institutes and system-wide settings'}
              {currentUser.role === 'admin' && 'Manage your institute staff, students, and operations'}
              {currentUser.role === 'teacher' && 'Manage your classes, attendance, and student information'}
              {currentUser.role === 'staff' && 'Access your profile information and updates'}
              {currentUser.role === 'student' && 'Track your academic progress and school updates'}
              {currentUser.role === 'parent' && 'Monitor your child\'s academic progress and school updates'}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Dashboard cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getDashboardCards().map((card, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                  <div className={`p-2 rounded-full ${card.color}`}>
                    <card.icon size={18} />
                  </div>
                </div>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {/* We could add additional content here like stats or charts */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
