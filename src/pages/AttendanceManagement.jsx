
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, UserCheck, UserX, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AttendanceManagement = () => {
  const [tab, setTab] = useState('staff');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for staff attendance
  const staffData = [
    { id: 1, name: 'John Doe', role: 'Teacher', status: 'present', inTime: '08:30 AM', outTime: '04:30 PM' },
    { id: 2, name: 'Jane Smith', role: 'Administrator', status: 'present', inTime: '08:15 AM', outTime: '04:45 PM' },
    { id: 3, name: 'Robert Johnson', role: 'Teacher', status: 'absent', inTime: '-', outTime: '-' },
    { id: 4, name: 'Emily Davis', role: 'Teacher', status: 'present', inTime: '08:45 AM', outTime: '04:15 PM' },
    { id: 5, name: 'Michael Wilson', role: 'Staff', status: 'late', inTime: '09:30 AM', outTime: '05:30 PM' },
  ];
  
  // Mock data for student attendance
  const studentData = [
    { id: 101, name: 'Alex Johnson', class: '10A', status: 'present' },
    { id: 102, name: 'Sarah Williams', class: '10A', status: 'absent' },
    { id: 103, name: 'David Brown', class: '10B', status: 'present' },
    { id: 104, name: 'Emma Jones', class: '10B', status: 'present' },
    { id: 105, name: 'James Miller', class: '10A', status: 'late' },
    { id: 106, name: 'Olivia Davis', class: '10C', status: 'present' },
    { id: 107, name: 'William Wilson', class: '10C', status: 'absent' },
  ];

  const filteredStaffData = staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredStudentData = studentData.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status) => (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
  
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground">
          Track and manage attendance records for staff and students
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Today: {new Date().toLocaleDateString()}</span>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Change Date
            </Button>
          </div>
          
          <Tabs defaultValue="staff" className="w-full" onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="staff">
                <Users className="h-4 w-4 mr-2" />
                Staff Attendance
              </TabsTrigger>
              <TabsTrigger value="students">
                <Users className="h-4 w-4 mr-2" />
                Student Attendance
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search ${tab === 'staff' ? 'staff' : 'students'}...`}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <UserCheck className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
            </div>
            
            <TabsContent value="staff" className="border rounded-md mt-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Role</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">In Time</th>
                      <th className="py-3 px-4 text-left font-medium">Out Time</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaffData.map((staff) => (
                      <tr key={staff.id} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-4">{staff.name}</td>
                        <td className="py-3 px-4">{staff.role}</td>
                        <td className="py-3 px-4">{getStatusBadge(staff.status)}</td>
                        <td className="py-3 px-4">{staff.inTime}</td>
                        <td className="py-3 px-4">{staff.outTime}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserCheck className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserX className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStaffData.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No staff records found matching your search.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="students" className="border rounded-md mt-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="py-3 px-4 text-left font-medium">ID</th>
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Class</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudentData.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-4">{student.id}</td>
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{student.class}</td>
                        <td className="py-3 px-4">{getStatusBadge(student.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserCheck className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <UserX className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStudentData.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No student records found matching your search.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Attendance Summary</CardTitle>
                <CardDescription>Today's overall statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Staff:</span>
                    <span className="font-medium">{staffData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Present:</span>
                    <span className="font-medium text-green-600">
                      {staffData.filter(s => s.status === 'present').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Absent:</span>
                    <span className="font-medium text-red-600">
                      {staffData.filter(s => s.status === 'absent').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Late:</span>
                    <span className="font-medium text-amber-600">
                      {staffData.filter(s => s.status === 'late').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Student Attendance</CardTitle>
                <CardDescription>Today's class statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Students:</span>
                    <span className="font-medium">{studentData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Present:</span>
                    <span className="font-medium text-green-600">
                      {studentData.filter(s => s.status === 'present').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Absent:</span>
                    <span className="font-medium text-red-600">
                      {studentData.filter(s => s.status === 'absent').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Late:</span>
                    <span className="font-medium text-amber-600">
                      {studentData.filter(s => s.status === 'late').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest attendance updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">Jane Smith marked present</p>
                      <p className="text-xs text-muted-foreground">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">Robert Johnson marked absent</p>
                      <p className="text-xs text-muted-foreground">25 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">Class 10A attendance completed</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceManagement;
