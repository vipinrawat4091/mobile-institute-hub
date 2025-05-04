
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import { Building, Search, Edit, Trash, Plus, Users, School, FileText } from 'lucide-react';

// Mock data for institutes
const mockInstitutes = [
  { 
    id: 1, 
    name: "Delhi Public School", 
    location: "New Delhi", 
    admin: "Jamie Smith", 
    students: 1250, 
    staff: 89,
    established: "2001-06-15",
    status: "active"
  },
  { 
    id: 2, 
    name: "St. Mary's Academy", 
    location: "Mumbai", 
    admin: "Priya Mehta", 
    students: 980, 
    staff: 72,
    established: "1998-03-22",
    status: "active"
  },
  { 
    id: 3, 
    name: "Greenfield International", 
    location: "Bangalore", 
    admin: "Rahul Gupta", 
    students: 1480, 
    staff: 113,
    established: "2010-08-10",
    status: "active"
  }
];

const Institutes = () => {
  const [institutes, setInstitutes] = useState(mockInstitutes);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newInstitute, setNewInstitute] = useState({
    name: '',
    location: '',
    admin: '',
    established: new Date().toISOString().split('T')[0]
  });

  const filteredInstitutes = institutes.filter(institute => 
    institute.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institute.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddInstitute = () => {
    // Validation
    if (!newInstitute.name || !newInstitute.location || !newInstitute.admin) {
      return;
    }

    const createdInstitute = {
      ...newInstitute,
      id: institutes.length + 1,
      students: 0,
      staff: 0,
      status: 'active'
    };

    setInstitutes([...institutes, createdInstitute]);
    setNewInstitute({
      name: '',
      location: '',
      admin: '',
      established: new Date().toISOString().split('T')[0]
    });
    setIsAddDialogOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Institute Management</h1>
            <p className="text-muted-foreground">
              Manage all registered educational institutes
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Institute
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Institute</DialogTitle>
                <DialogDescription>
                  Enter details to create a new educational institute.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Institute Name
                  </label>
                  <Input 
                    id="name" 
                    className="col-span-3" 
                    value={newInstitute.name}
                    onChange={(e) => setNewInstitute({...newInstitute, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="location" className="text-right">
                    Location
                  </label>
                  <Input 
                    id="location" 
                    className="col-span-3" 
                    value={newInstitute.location}
                    onChange={(e) => setNewInstitute({...newInstitute, location: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="admin" className="text-right">
                    Admin Name
                  </label>
                  <Input 
                    id="admin" 
                    className="col-span-3" 
                    value={newInstitute.admin}
                    onChange={(e) => setNewInstitute({...newInstitute, admin: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="established" className="text-right">
                    Established
                  </label>
                  <Input 
                    id="established" 
                    type="date" 
                    className="col-span-3" 
                    value={newInstitute.established}
                    onChange={(e) => setNewInstitute({...newInstitute, established: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddInstitute}>Create Institute</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Institute statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Institutes</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutes.length}</div>
              <p className="text-xs text-muted-foreground">
                {institutes.filter(i => i.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {institutes.reduce((total, inst) => total + inst.students, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all institutes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {institutes.reduce((total, inst) => total + inst.staff, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all institutes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Institutes listing */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Institutes Directory</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search institutes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Admin</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Established</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstitutes.length > 0 ? (
                    filteredInstitutes.map((institute) => (
                      <TableRow key={institute.id}>
                        <TableCell className="font-medium">{institute.name}</TableCell>
                        <TableCell>{institute.location}</TableCell>
                        <TableCell>{institute.admin}</TableCell>
                        <TableCell>{institute.students}</TableCell>
                        <TableCell>{institute.staff}</TableCell>
                        <TableCell>{new Date(institute.established).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {institute.status === 'active' ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : (
                            <Badge className="bg-red-500">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        No institutes found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Institutes;
