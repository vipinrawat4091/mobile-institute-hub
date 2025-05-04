
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Attendance = () => {
  const [date, setDate] = useState(new Date());
  
  // Mock attendance data
  const attendanceData = {
    thisMonth: 90, // 90% attendance for the current month
    overall: 85, // 85% overall attendance
  };
  
  // Mock attendance records
  const attendanceHistory = [
    { date: new Date(2025, 4, 1), status: 'present', subject: 'All' },
    { date: new Date(2025, 4, 2), status: 'present', subject: 'All' },
    { date: new Date(2025, 4, 3), status: 'present', subject: 'All' },
    { date: new Date(2025, 4, 4), status: 'absent', subject: 'All', reason: 'Sick leave' },
    { date: new Date(2025, 4, 5), status: 'present', subject: 'All' },
    // Add more attendance records here
  ];
  
  // Function to generate calendar highlight dates
  const getHighlightedDates = () => {
    const highlights = {};
    
    attendanceHistory.forEach(record => {
      const dateKey = format(record.date, 'yyyy-MM-dd');
      highlights[dateKey] = record.status === 'present' ? 'present' : 'absent';
    });
    
    return highlights;
  };
  
  const highlightedDates = getHighlightedDates();
  
  // Filter attendance records for the selected date
  const selectedDateRecord = attendanceHistory.find(record => 
    format(record.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-muted-foreground">View and manage your attendance records</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="month">
                <TabsList className="mb-4">
                  <TabsTrigger value="month">This Month</TabsTrigger>
                  <TabsTrigger value="overall">Overall</TabsTrigger>
                </TabsList>
                <TabsContent value="month" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>This Month</span>
                    <span className="text-2xl font-bold">{attendanceData.thisMonth}%</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-green-500" 
                      style={{ width: `${attendanceData.thisMonth}%` }}
                    ></div>
                  </div>
                </TabsContent>
                <TabsContent value="overall" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall</span>
                    <span className="text-2xl font-bold">{attendanceData.overall}%</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-green-500" 
                      style={{ width: `${attendanceData.overall}%` }}
                    ></div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    modifiers={{
                      present: (date) => highlightedDates[format(date, 'yyyy-MM-dd')] === 'present',
                      absent: (date) => highlightedDates[format(date, 'yyyy-MM-dd')] === 'absent',
                    }}
                    modifiersStyles={{
                      present: { backgroundColor: '#dcfce7' },
                      absent: { backgroundColor: '#fee2e2' },
                    }}
                  />
                </PopoverContent>
              </Popover>
              
              {selectedDateRecord && (
                <div className="mt-4 border rounded-md p-3">
                  <h4 className="font-medium">
                    {format(selectedDateRecord.date, "MMMM d, yyyy")}
                  </h4>
                  <div className="mt-2 flex items-center">
                    <Badge className={cn(
                      selectedDateRecord.status === 'present' 
                        ? "bg-green-500" 
                        : "bg-red-500"
                    )}>
                      {selectedDateRecord.status === 'present' 
                        ? <CheckCircle className="mr-1 h-3 w-3" /> 
                        : <XCircle className="mr-1 h-3 w-3" />}
                      {selectedDateRecord.status.charAt(0).toUpperCase() + selectedDateRecord.status.slice(1)}
                    </Badge>
                  </div>
                  {selectedDateRecord.reason && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Reason: {selectedDateRecord.reason}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
