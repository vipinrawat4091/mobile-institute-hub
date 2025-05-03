
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search, Plus, Filter, Check, Clock, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const LeaveApplication = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(null);

  // Sample leave applications
  const leaveApplications = [
    {
      id: 1,
      reason: 'Medical Leave',
      fromDate: '2025-05-10',
      toDate: '2025-05-12',
      status: 'approved',
      description: 'I need leave due to fever and doctor has advised bed rest for three days.'
    },
    {
      id: 2,
      reason: 'Family Function',
      fromDate: '2025-05-20',
      toDate: '2025-05-22',
      status: 'pending',
      description: 'There is a wedding in my family and I need to attend it.'
    },
    {
      id: 3,
      reason: 'Personal Work',
      fromDate: '2025-06-05',
      toDate: '2025-06-05',
      status: 'rejected',
      description: 'I have some personal work to attend to and need one day leave.'
    }
  ];

  // Filter leave applications based on search term
  const filteredApplications = leaveApplications.filter(application => 
    application.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge color
  const getStatusColor = (status) => {
    const statusColors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const isParent = currentUser?.role === 'parent';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Leave Applications</h1>
            <p className="text-muted-foreground">
              {isParent ? "Apply for leave for your child and view application status" : "Apply for leave and view application status"}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Application
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search applications..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Leave Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>New Leave Application</CardTitle>
            <CardDescription>Fill in the details to submit a new leave application</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Leave Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Leave</SelectItem>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="emergency">Emergency Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {isParent && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Child Name</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select child" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child1">John Doe</SelectItem>
                        <SelectItem value="child2">Jane Doe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <Textarea 
                  placeholder="Enter detailed reason for leave..." 
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Leave Applications List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Applications</h2>
          {filteredApplications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No leave applications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredApplications.map(application => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{application.reason}</CardTitle>
                      <CardDescription>
                        From {new Date(application.fromDate).toLocaleDateString()} to {new Date(application.toDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(application.status)}>
                      {application.status === 'approved' && <Check className="mr-1 h-3 w-3" />}
                      {application.status === 'rejected' && <X className="mr-1 h-3 w-3" />}
                      {application.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{application.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-3">
                  {application.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Cancel</Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeaveApplication;
