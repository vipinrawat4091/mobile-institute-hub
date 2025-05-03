
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter,
  MapPin,
  Clock,
  Users,
  CalendarDays,
  BookOpen
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState('grid');
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Annual Sports Day',
      description: 'Annual sports competition featuring various track and field events, team sports, and individual competitions.',
      date: '2025-05-15',
      time: '09:00 AM - 04:00 PM',
      venue: 'School Sports Ground',
      category: 'sports',
      attendees: 'All Students',
      image: '🏃‍♀️'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      description: 'Quarterly meeting between parents and teachers to discuss student progress and address concerns.',
      date: '2025-05-10',
      time: '10:00 AM - 02:00 PM',
      venue: 'School Auditorium',
      category: 'academic',
      attendees: 'Parents & Teachers',
      image: '👨‍👩‍👧‍👦'
    },
    {
      id: 3,
      title: 'Science Exhibition',
      description: 'Students showcase their science projects and innovations. Open to all parents and students.',
      date: '2025-05-22',
      time: '10:00 AM - 03:00 PM',
      venue: 'School Science Block',
      category: 'academic',
      attendees: 'All Students & Parents',
      image: '🧪'
    },
    {
      id: 4,
      title: 'Cultural Festival',
      description: 'Annual cultural program featuring dance, music, drama and art displays by students.',
      date: '2025-06-05',
      time: '04:00 PM - 08:00 PM',
      venue: 'School Auditorium',
      category: 'cultural',
      attendees: 'All Students & Parents',
      image: '🎭'
    },
    {
      id: 5,
      title: 'Career Counseling Session',
      description: 'Professional career counselors will provide guidance to senior students about higher education and career options.',
      date: '2025-06-12',
      time: '11:00 AM - 01:00 PM',
      venue: 'Conference Hall',
      category: 'career',
      attendees: 'Class 10-12 Students',
      image: '📚'
    },
    {
      id: 6,
      title: 'Summer Camp Registration',
      description: 'Registration for summer activities including sports, arts, coding, and language classes.',
      date: '2025-06-18',
      time: '09:00 AM - 12:00 PM',
      venue: 'School Reception',
      category: 'activity',
      attendees: 'Interested Students',
      image: '☀️'
    }
  ];
  
  // Filter events based on search term and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Group events by month for calendar view
  const eventsByMonth = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(event);
    return acc;
  }, {});
  
  // Get event category color
  const getCategoryColor = (category) => {
    const categoryColors = {
      sports: 'bg-blue-100 text-blue-800',
      academic: 'bg-green-100 text-green-800',
      cultural: 'bg-purple-100 text-purple-800',
      career: 'bg-amber-100 text-amber-800',
      activity: 'bg-rose-100 text-rose-800'
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">School Events</h1>
            <p className="text-muted-foreground">Upcoming events and activities at the school</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-accent' : ''}>
              <CalendarDays className="mr-2 h-4 w-4" />
              Grid
            </Button>
            <Button variant="outline" size="sm" onClick={() => setView('calendar')} className={view === 'calendar' ? 'bg-accent' : ''}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Events Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Academic Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cultural Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
        </div>
        
        {/* View Tabs */}
        <Tabs defaultValue={view} value={view} onValueChange={setView} className="space-y-4">
          <TabsList className="hidden">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          {/* Grid View */}
          <TabsContent value="grid" className="space-y-4">
            {filteredEvents.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No events found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="bg-gray-100 p-6 flex justify-center items-center">
                      <div className="text-5xl">{event.image}</div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant="outline" className={getCategoryColor(event.category)}>
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center mt-1">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-2">{event.description}</p>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Calendar View */}
          <TabsContent value="calendar" className="space-y-6">
            {Object.keys(eventsByMonth).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No events found</p>
                </CardContent>
              </Card>
            ) : (
              Object.entries(eventsByMonth).sort((a, b) => {
                const dateA = new Date(a[1][0].date);
                const dateB = new Date(b[1][0].date);
                return dateA - dateB;
              }).map(([month, monthEvents]) => (
                <div key={month} className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    {month}
                  </h3>
                  <Card>
                    <CardContent className="p-0">
                      {monthEvents.map(event => (
                        <div key={event.id} className="border-b last:border-b-0 p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="flex items-start space-x-4">
                              <div className="bg-gray-100 p-3 rounded-md flex-shrink-0 hidden sm:flex">
                                <div className="text-2xl">{event.image}</div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <Badge variant="outline" className={getCategoryColor(event.category)}>
                                    {event.category}
                                  </Badge>
                                </div>
                                <p className="text-sm line-clamp-2">{event.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-1 min-w-[140px]">
                              <div className="flex items-center text-sm">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4" />
                                {event.time}
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span className="truncate">{event.venue}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Events;
