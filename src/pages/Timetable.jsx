
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Calendar as CalendarIcon } from 'lucide-react';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDay, setSelectedDay] = useState('monday');
  
  // Sample data for classes
  const classes = ['all', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
  
  // Sample days of the week
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  // Sample timetable data
  const timetableData = {
    monday: [
      { id: 1, class: 'Class 1', subject: 'Mathematics', teacher: 'Mr. Johnson', time: '9:00 AM - 10:00 AM', room: 'Room 101' },
      { id: 2, class: 'Class 1', subject: 'Science', teacher: 'Mrs. Smith', time: '10:00 AM - 11:00 AM', room: 'Room 102' },
      { id: 3, class: 'Class 2', subject: 'English', teacher: 'Ms. Davis', time: '9:00 AM - 10:00 AM', room: 'Room 201' },
      { id: 4, class: 'Class 3', subject: 'History', teacher: 'Mr. Wilson', time: '11:00 AM - 12:00 PM', room: 'Room 103' }
    ],
    tuesday: [
      { id: 5, class: 'Class 1', subject: 'English', teacher: 'Ms. Davis', time: '9:00 AM - 10:00 AM', room: 'Room 101' },
      { id: 6, class: 'Class 2', subject: 'Mathematics', teacher: 'Mr. Johnson', time: '10:00 AM - 11:00 AM', room: 'Room 202' },
      { id: 7, class: 'Class 3', subject: 'Science', teacher: 'Mrs. Smith', time: '9:00 AM - 10:00 AM', room: 'Room 103' }
    ],
    wednesday: [
      { id: 8, class: 'Class 1', subject: 'History', teacher: 'Mr. Wilson', time: '9:00 AM - 10:00 AM', room: 'Room 101' },
      { id: 9, class: 'Class 2', subject: 'Science', teacher: 'Mrs. Smith', time: '11:00 AM - 12:00 PM', room: 'Room 202' }
    ],
    thursday: [
      { id: 10, class: 'Class 1', subject: 'Physical Education', teacher: 'Mr. Brown', time: '9:00 AM - 10:00 AM', room: 'Playground' },
      { id: 11, class: 'Class 2', subject: 'Art', teacher: 'Mrs. Turner', time: '10:00 AM - 11:00 AM', room: 'Art Room' }
    ],
    friday: [
      { id: 12, class: 'Class 1', subject: 'Music', teacher: 'Ms. Harris', time: '11:00 AM - 12:00 PM', room: 'Music Room' },
      { id: 13, class: 'Class 2', subject: 'Computer', teacher: 'Mr. Lee', time: '9:00 AM - 10:00 AM', room: 'Computer Lab' }
    ],
    saturday: [
      { id: 14, class: 'Class 1', subject: 'Extra Classes', teacher: 'Various', time: '9:00 AM - 11:00 AM', room: 'Various' },
      { id: 15, class: 'Class 2', subject: 'Extra Classes', teacher: 'Various', time: '9:00 AM - 11:00 AM', room: 'Various' }
    ]
  };

  // Function to filter timetable data based on selected class and day
  const getFilteredTimetable = () => {
    if (!timetableData[selectedDay]) return [];
    
    if (selectedClass === 'all') {
      return timetableData[selectedDay];
    }
    
    return timetableData[selectedDay].filter(
      item => item.class === selectedClass
    );
  };

  // Get filtered timetable data
  const filteredTimetable = getFilteredTimetable();
  
  // Get subject background color
  const getSubjectColor = (subject) => {
    const subjectColors = {
      'Mathematics': 'bg-blue-100 text-blue-800',
      'Science': 'bg-green-100 text-green-800',
      'English': 'bg-purple-100 text-purple-800',
      'History': 'bg-amber-100 text-amber-800',
      'Physical Education': 'bg-red-100 text-red-800',
      'Art': 'bg-pink-100 text-pink-800',
      'Music': 'bg-indigo-100 text-indigo-800',
      'Computer': 'bg-cyan-100 text-cyan-800',
      'Extra Classes': 'bg-gray-100 text-gray-800'
    };
    
    return subjectColors[subject] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Time Table</h1>
            <p className="text-muted-foreground">Manage class schedules and teacher assignments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>
        
        {/* Filters and tabs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:w-64">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>
                    {cls === 'all' ? 'All Classes' : cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Tabs defaultValue={selectedDay} onValueChange={setSelectedDay} className="w-full">
              <TabsList className="w-full sm:w-auto overflow-x-auto">
                {days.map(day => (
                  <TabsTrigger key={day} value={day} className="flex-1 capitalize">
                    {day}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Day Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{filteredTimetable.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div className="text-2xl font-bold">
                {new Set(filteredTimetable.map(item => item.teacher)).size}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Day</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold capitalize">{selectedDay}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Timetable */}
        <div className="space-y-4">
          {filteredTimetable.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No schedules found</p>
              </CardContent>
            </Card>
          ) : (
            filteredTimetable.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.subject}</CardTitle>
                      <CardDescription>{item.class}</CardDescription>
                    </div>
                    <Badge className={getSubjectColor(item.subject)}>
                      {item.subject}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <div><span className="font-medium">Teacher:</span> {item.teacher}</div>
                      <div><span className="font-medium">Room:</span> {item.room}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-3">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Remove</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Timetable;
