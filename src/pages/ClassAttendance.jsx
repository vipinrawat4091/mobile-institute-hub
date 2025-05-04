
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Users, UserCheck, UserX, Check, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const ClassAttendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('10A');
  
  // Mock classes taught by teacher
  const teacherClasses = ['10A', '10B', '9A'];
  
  // Mock student data for attendance
  const studentsData = {
    '10A': [
      { id: 101, name: 'Alex Johnson', status: 'present' },
      { id: 102, name: 'Sarah Williams', status: 'absent' },
      { id: 103, name: 'David Brown', status: 'present' },
      { id: 104, name: 'Emma Jones', status: 'present' },
      { id: 105, name: 'James Miller', status: 'late' },
    ],
    '10B': [
      { id: 201, name: 'Olivia Davis', status: 'present' },
      { id: 202, name: 'William Wilson', status: 'absent' },
      { id: 203, name: 'Sophia Lee', status: 'present' },
      { id: 204, name: 'Noah Martin', status: 'present' },
    ],
    '9A': [
      { id: 301, name: 'Emily Clark', status: 'present' },
      { id: 302, name: 'Daniel Rodriguez', status: 'present' },
      { id: 303, name: 'Ava Lopez', status: 'absent' },
      { id: 304, name: 'Ethan Hill', status: 'present' },
      { id: 305, name: 'Mia Scott', status: 'late' },
      { id: 306, name: 'Benjamin King', status: 'present' },
    ],
  };

  // Get current class students
  const currentClassStudents = studentsData[selectedClass] || [];
  
  // Filter students based on search
  const filteredStudents = currentClassStudents.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toString().includes(searchQuery)
  );

  // Function to update student attendance status
  const updateAttendanceStatus = (studentId, newStatus) => {
    // In a real app, this would update the database
    // For this demo, we'll just show a toast notification
    toast.success(`Marked student #${studentId} as ${newStatus}`);
  };

  // Get status badge style based on status
  const getStatusBadge = (status) => {
    const statusStyles = {
      present: "bg-green-100 text-green-800",
      absent: "bg-red-100 text-red-800",
      late: "bg-amber-100 text-amber-800"
    };
    
    return (
      <Badge className={statusStyles[status] || "bg-gray-100"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Calculate attendance statistics
  const getTotalPresent = () => currentClassStudents.filter(s => s.status === 'present').length;
  const getTotalAbsent = () => currentClassStudents.filter(s => s.status === 'absent').length;
  const getTotalLate = () => currentClassStudents.filter(s => s.status === 'late').length;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Class Attendance</h1>
        <p className="text-muted-foreground">Manage your class attendance records</p>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            <span>Today: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="w-[180px]">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {teacherClasses.map(classId => (
                  <SelectItem key={classId} value={classId}>
                    Class {classId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Class {selectedClass}</CardTitle>
            <CardDescription>
              Total Students: {currentClassStudents.length} | 
              Present: {getTotalPresent()} | 
              Absent: {getTotalAbsent()} | 
              Late: {getTotalLate()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => toast.success("All students marked present")}>
                <UserCheck className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
            </div>

            <div className="border rounded-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="py-3 px-4 text-left font-medium">ID</th>
                      <th className="py-3 px-4 text-left font-medium">Name</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-4">{student.id}</td>
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{getStatusBadge(student.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => updateAttendanceStatus(student.id, 'present')}
                            >
                              <UserCheck className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateAttendanceStatus(student.id, 'absent')}
                            >
                              <UserX className="h-4 w-4 text-red-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateAttendanceStatus(student.id, 'late')}
                            >
                              <CalendarIcon className="h-4 w-4 text-amber-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStudents.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No students found matching your search.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span>{getTotalPresent()} Students</span>
                </div>
                <span className="text-lg font-medium">
                  {currentClassStudents.length > 0 
                    ? Math.round((getTotalPresent() / currentClassStudents.length) * 100) 
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <span>{getTotalAbsent()} Students</span>
                </div>
                <span className="text-lg font-medium">
                  {currentClassStudents.length > 0 
                    ? Math.round((getTotalAbsent() / currentClassStudents.length) * 100) 
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-amber-600" />
                  </div>
                  <span>{getTotalLate()} Students</span>
                </div>
                <span className="text-lg font-medium">
                  {currentClassStudents.length > 0 
                    ? Math.round((getTotalLate() / currentClassStudents.length) * 100) 
                    : 0}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ClassAttendance;
