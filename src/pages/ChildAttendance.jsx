
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Search, 
  Filter,
  Check,
  X,
  FileText,
  Clock
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ChildAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('May 2025');
  
  // Sample attendance data
  const children = [
    {
      id: 1,
      name: 'John Doe',
      class: '10th Standard',
      section: 'A',
      rollNumber: '101'
    },
    {
      id: 2,
      name: 'Jane Doe',
      class: '8th Standard',
      section: 'B',
      rollNumber: '102'
    }
  ];
  
  const attendanceData = {
    '1': [
      { date: '2025-05-01', status: 'present', note: 'On time' },
      { date: '2025-05-02', status: 'present', note: 'On time' },
      { date: '2025-05-03', status: 'weekend', note: '' },
      { date: '2025-05-04', status: 'weekend', note: '' },
      { date: '2025-05-05', status: 'present', note: 'On time' },
      { date: '2025-05-06', status: 'absent', note: 'Sick leave' },
      { date: '2025-05-07', status: 'absent', note: 'Sick leave' },
      { date: '2025-05-08', status: 'present', note: 'Late by 10 minutes' },
      { date: '2025-05-09', status: 'present', note: 'On time' },
      { date: '2025-05-10', status: 'weekend', note: '' },
      // More days would be added here
    ],
    '2': [
      { date: '2025-05-01', status: 'present', note: 'On time' },
      { date: '2025-05-02', status: 'present', note: 'On time' },
      { date: '2025-05-03', status: 'weekend', note: '' },
      { date: '2025-05-04', status: 'weekend', note: '' },
      { date: '2025-05-05', status: 'present', note: 'On time' },
      { date: '2025-05-06', status: 'present', note: 'On time' },
      { date: '2025-05-07', status: 'present', note: 'On time' },
      { date: '2025-05-08', status: 'absent', note: 'Family function' },
      { date: '2025-05-09', status: 'absent', note: 'Family function' },
      { date: '2025-05-10', status: 'weekend', note: '' },
      // More days would be added here
    ]
  };
  
  // Filter attendance data based on selected child
  const currentChildId = selectedChild === 'all' ? '1' : selectedChild;
  const currentChildData = attendanceData[currentChildId] || [];
  
  // Calculate attendance statistics
  const calculateStats = (childId) => {
    const data = attendanceData[childId] || [];
    const total = data.filter(day => day.status !== 'weekend').length;
    const present = data.filter(day => day.status === 'present').length;
    const absent = data.filter(day => day.status === 'absent').length;
    
    return {
      total,
      present,
      absent,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0
    };
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    const statusColors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      holiday: 'bg-blue-100 text-blue-800',
      weekend: 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Child Attendance</h1>
            <p className="text-muted-foreground">Monitor your child's attendance records</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              {children.map(child => (
                <SelectItem key={child.id} value={child.id.toString()}>{child.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="May 2025">May 2025</SelectItem>
              <SelectItem value="April 2025">April 2025</SelectItem>
              <SelectItem value="March 2025">March 2025</SelectItem>
              <SelectItem value="February 2025">February 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Attendance Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {children.map(child => {
            const stats = calculateStats(child.id.toString());
            return (
              <Card key={child.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{child.name}</CardTitle>
                  <CardDescription>{child.class} {child.section}, Roll: {child.rollNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{stats.percentage}%</div>
                    <div className="text-xs text-muted-foreground">
                      Present: {stats.present} | Absent: {stats.absent}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Attendance Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records - {selectedMonth}</CardTitle>
            <CardDescription>
              {selectedChild === 'all' 
                ? 'Showing attendance for John Doe' 
                : `Showing attendance for ${children.find(c => c.id.toString() === selectedChild)?.name || ''}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentChildData.map((record, index) => {
                    const date = new Date(record.date);
                    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                    
                    return (
                      <TableRow key={index}>
                        <TableCell>{date.toLocaleDateString()}</TableCell>
                        <TableCell>{day}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(record.status)}>
                            {record.status === 'present' && <Check className="mr-1 h-3 w-3" />}
                            {record.status === 'absent' && <X className="mr-1 h-3 w-3" />}
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.note}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ChildAttendance;
