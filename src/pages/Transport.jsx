
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Bus,
  MapPin,
  Users,
  Calendar
} from 'lucide-react';

const Transport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('routes');
  
  // Sample routes data
  const routes = [
    {
      id: 1,
      name: 'Route A - North City',
      driver: 'Mr. Robert Johnson',
      vehicle: 'Bus KA-01-MH-1234',
      stops: ['City Center', 'North Market', 'Garden Colony', 'Hill View'],
      students: 28,
      departure: '7:30 AM',
      return: '3:30 PM',
      status: 'active'
    },
    {
      id: 2,
      name: 'Route B - East City',
      driver: 'Mr. David Wilson',
      vehicle: 'Bus KA-01-MH-5678',
      stops: ['East Gate', 'Railway Colony', 'Industrial Area', 'Lake View'],
      students: 32,
      departure: '7:45 AM',
      return: '3:45 PM',
      status: 'active'
    },
    {
      id: 3,
      name: 'Route C - South City',
      driver: 'Mr. Michael Brown',
      vehicle: 'Bus KA-01-MH-9012',
      stops: ['South Point', 'Green Park', 'Temple Road', 'Market Square'],
      students: 24,
      departure: '8:00 AM',
      return: '4:00 PM',
      status: 'active'
    },
    {
      id: 4,
      name: 'Route D - West City',
      driver: 'Mr. Thomas Smith',
      vehicle: 'Bus KA-01-MH-3456',
      stops: ['West End', 'Factory Road', 'College Campus', 'Stadium'],
      students: 30,
      departure: '7:15 AM',
      return: '3:15 PM',
      status: 'maintenance'
    }
  ];
  
  // Sample vehicles data
  const vehicles = [
    {
      id: 1,
      number: 'KA-01-MH-1234',
      type: 'School Bus',
      capacity: 40,
      driver: 'Mr. Robert Johnson',
      assigned: true,
      route: 'Route A - North City',
      lastMaintenance: '2025-04-15',
      status: 'active'
    },
    {
      id: 2,
      number: 'KA-01-MH-5678',
      type: 'School Bus',
      capacity: 40,
      driver: 'Mr. David Wilson',
      assigned: true,
      route: 'Route B - East City',
      lastMaintenance: '2025-04-10',
      status: 'active'
    },
    {
      id: 3,
      number: 'KA-01-MH-9012',
      type: 'School Bus',
      capacity: 40,
      driver: 'Mr. Michael Brown',
      assigned: true,
      route: 'Route C - South City',
      lastMaintenance: '2025-04-20',
      status: 'active'
    },
    {
      id: 4,
      number: 'KA-01-MH-3456',
      type: 'School Bus',
      capacity: 40,
      driver: 'Mr. Thomas Smith',
      assigned: true,
      route: 'Route D - West City',
      lastMaintenance: '2025-03-30',
      status: 'maintenance'
    },
    {
      id: 5,
      number: 'KA-01-MH-7890',
      type: 'Mini Bus',
      capacity: 25,
      driver: 'Unassigned',
      assigned: false,
      route: '',
      lastMaintenance: '2025-04-25',
      status: 'active'
    }
  ];
  
  // Function to get filtered data based on active tab and search term
  const getFilteredData = () => {
    const dataSource = activeTab === 'routes' ? routes : vehicles;
    
    if (!searchTerm) return dataSource;
    
    return dataSource.filter(item => {
      if (activeTab === 'routes') {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.stops.some(stop => stop.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      } else {
        return (
          item.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.route && item.route.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
    });
  };
  
  const filteredData = getFilteredData();
  
  // Get status badge color
  const getStatusBadge = (status) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'maintenance': 'bg-amber-100 text-amber-800',
      'inactive': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Transport Management</h1>
            <p className="text-muted-foreground">Manage transportation routes, vehicles and schedules</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {activeTab === 'routes' ? 'Add Route' : 'Add Vehicle'}
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{routes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Bus className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{vehicles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Students Using Transport</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {routes.reduce((sum, route) => sum + route.students, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Bus className="h-4 w-4 mr-2 text-green-500" />
              <div className="text-2xl font-bold">
                {vehicles.filter(v => v.status === 'active').length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Tabs */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={`Search ${activeTab === 'routes' ? 'routes' : 'vehicles'}...`}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="routes" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="routes" className="space-y-4 mt-4">
              {filteredData.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <MapPin className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No routes found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredData.map(route => (
                  <Card key={route.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{route.name}</CardTitle>
                        {getStatusBadge(route.status)}
                      </div>
                      <CardDescription>
                        Driver: {route.driver} | Vehicle: {route.vehicle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-1">Route Stops</p>
                          <div className="flex flex-wrap gap-2">
                            {route.stops.map((stop, index) => (
                              <Badge key={index} variant="outline">
                                {stop}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Students</p>
                            <p className="font-medium flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              {route.students}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Departure</p>
                            <p className="font-medium">{route.departure}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Return</p>
                            <p className="font-medium">{route.return}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t pt-3">
                      <Button variant="outline" size="sm">View Map</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="vehicles" className="space-y-4 mt-4">
              {filteredData.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Bus className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No vehicles found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredData.map(vehicle => (
                  <Card key={vehicle.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{vehicle.number}</CardTitle>
                          <CardDescription>{vehicle.type}</CardDescription>
                        </div>
                        {getStatusBadge(vehicle.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Driver</p>
                          <p className="font-medium">{vehicle.driver}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Capacity</p>
                          <p className="font-medium">{vehicle.capacity} seats</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Assigned Route</p>
                          <p className="font-medium">{vehicle.assigned ? vehicle.route : 'Not Assigned'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Maintenance</p>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <p>{new Date(vehicle.lastMaintenance).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t pt-3">
                      <Button variant="outline" size="sm">Maintenance Log</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Transport;
