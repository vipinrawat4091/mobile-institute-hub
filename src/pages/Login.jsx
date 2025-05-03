import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectedRole, setDetectedRole] = useState('');
  const { login, getRoleFromUsername, currentUser } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Update the detected role as the user types
  useEffect(() => {
    if (username.length >= 2) {
      const role = getRoleFromUsername(username);
      setDetectedRole(role ? role : 'unknown');
    } else {
      setDetectedRole('');
    }
  }, [username, getRoleFromUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (username.length < 2) {
      toast.error('Username must be at least 2 characters');
      return;
    }

    setLoading(true);
    try {
      const success = login(username, password);
      if (!success) {
        setLoading(false);
      }
    } catch (error) {
      toast.error('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  const getRoleStyle = (role) => {
    if (!role) return '';
    
    const roleStyles = {
      superadmin: 'text-role-superadmin',
      admin: 'text-role-admin',
      teacher: 'text-role-teacher',
      staff: 'text-role-staff',
      student: 'text-role-student',
      parent: 'text-role-parent',
      unknown: 'text-red-500',
    };
    
    return roleStyles[role] || '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Mobile Institute Hub</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="username" className="text-sm font-medium leading-none">
                    Username
                  </label>
                  {detectedRole && (
                    <span className={`text-xs font-medium ${getRoleStyle(detectedRole)} capitalize`}>
                      Role: {detectedRole}
                    </span>
                  )}
                </div>
                <Input 
                  id="username"
                  type="text"
                  placeholder="Enter your username (e.g., SA201)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Demo accounts */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-4 rounded-lg border border-border">
          <h3 className="font-medium mb-2 text-sm">Demo Accounts</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-role-superadmin font-medium">SuperAdmin:</span> SA201</div>
            <div><span className="text-role-admin font-medium">Admin:</span> AD201</div>
            <div><span className="text-role-teacher font-medium">Teacher:</span> TC201</div>
            <div><span className="text-role-staff font-medium">Staff:</span> ST201</div>
            <div><span className="text-role-student font-medium">Student:</span> SD201</div>
            <div><span className="text-role-parent font-medium">Parent:</span> PR201</div>
            <div className="col-span-2 mt-1">Password for all accounts: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
