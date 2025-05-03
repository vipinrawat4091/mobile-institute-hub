
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Search, 
  Plus,
  Filter
} from 'lucide-react';

const Notices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample notices data
  const notices = [
    {
      id: 1,
      title: 'Annual Sports Day',
      content: 'Annual Sports Day will be held on 15th May. All students must participate in at least one event.',
      date: '2025-05-01',
      category: 'event',
      target: ['all']
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-Teacher meeting is scheduled for the 10th of May. All parents are requested to attend.',
      date: '2025-04-25',
      category: 'meeting',
      target: ['parents', 'teachers']
    },
    {
      id: 3,
      title: 'Fee Payment Reminder',
      content: 'This is a reminder for all students to complete their fee payment before the 5th of May.',
      date: '2025-04-20',
      category: 'fee',
      target: ['students', 'parents']
    },
    {
      id: 4,
      title: 'Staff Meeting',
      content: 'All teaching and non-teaching staff are required to attend a meeting on 5th May at 3:30 PM.',
      date: '2025-04-30',
      category: 'meeting',
      target: ['teachers', 'staff']
    }
  ];
  
  // Filter notices based on search term
  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get badge color based on notice category
  const getBadgeColor = (category) => {
    const categoryColors = {
      'event': 'bg-blue-100 text-blue-800',
      'meeting': 'bg-amber-100 text-amber-800',
      'fee': 'bg-red-100 text-red-800',
      'exam': 'bg-purple-100 text-purple-800',
      'holiday': 'bg-green-100 text-green-800'
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Notices</h1>
            <p className="text-muted-foreground">View and manage school notices and announcements</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Notice
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search notices..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Notice Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notices.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No notices found</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotices.map(notice => (
              <Card key={notice.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{notice.title}</CardTitle>
                      <CardDescription>
                        Posted on {new Date(notice.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getBadgeColor(notice.category)}>
                      {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{notice.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-3">
                  <div className="flex space-x-1">
                    {notice.target.map(target => (
                      <Badge key={target} variant="secondary" className="capitalize">
                        {target}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notices;
