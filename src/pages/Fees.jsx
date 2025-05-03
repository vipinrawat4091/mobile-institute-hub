
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  Plus, 
  Download, 
  Filter, 
  CreditCard,
  Calendar,
  DollarSign 
} from 'lucide-react';

const Fees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  
  // Sample fee records
  const feeRecords = [
    {
      id: 1,
      student: 'John Smith',
      class: 'Class 1',
      amount: 5000,
      category: 'Tuition Fee',
      dueDate: '2025-05-15',
      status: 'paid',
      paymentDate: '2025-05-01',
      paymentMethod: 'Online'
    },
    {
      id: 2,
      student: 'Emma Johnson',
      class: 'Class 2',
      amount: 5000,
      category: 'Tuition Fee',
      dueDate: '2025-05-15',
      status: 'pending',
      paymentDate: null,
      paymentMethod: null
    },
    {
      id: 3,
      student: 'Michael Brown',
      class: 'Class 1',
      amount: 2500,
      category: 'Transportation Fee',
      dueDate: '2025-05-10',
      status: 'paid',
      paymentDate: '2025-04-28',
      paymentMethod: 'Cash'
    },
    {
      id: 4,
      student: 'Sarah Wilson',
      class: 'Class 3',
      amount: 3000,
      category: 'Exam Fee',
      dueDate: '2025-05-20',
      status: 'overdue',
      paymentDate: null,
      paymentMethod: null
    },
    {
      id: 5,
      student: 'James Davis',
      class: 'Class 2',
      amount: 5000,
      category: 'Tuition Fee',
      dueDate: '2025-05-15',
      status: 'paid',
      paymentDate: '2025-04-25',
      paymentMethod: 'Online'
    }
  ];
  
  // Function to filter fee records
  const getFilteredRecords = () => {
    let filtered = feeRecords;
    
    // Filter by status
    if (activeTab !== 'all') {
      filtered = filtered.filter(record => record.status === activeTab);
    }
    
    // Filter by class
    if (selectedClass !== 'all') {
      filtered = filtered.filter(record => record.class === selectedClass);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  const filteredRecords = getFilteredRecords();
  
  // Get status badge color
  const getStatusBadge = (status) => {
    const statusColors = {
      'paid': 'bg-green-100 text-green-800',
      'pending': 'bg-amber-100 text-amber-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={statusColors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  // Statistics calculations
  const totalFees = feeRecords.reduce((sum, record) => sum + record.amount, 0);
  const collectedFees = feeRecords.filter(r => r.status === 'paid').reduce((sum, record) => sum + record.amount, 0);
  const pendingFees = feeRecords.filter(r => r.status === 'pending' || r.status === 'overdue').reduce((sum, record) => sum + record.amount, 0);
  const collectionRate = Math.round((collectedFees / totalFees) * 100);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Fees Management</h1>
            <p className="text-muted-foreground">Manage student fees and payment records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Fee Record
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collected</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-green-500" />
              <div className="text-2xl font-bold">₹{collectedFees.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-amber-500" />
              <div className="text-2xl font-bold">₹{pendingFees.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <div className="text-2xl font-bold">{collectionRate}%</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters and tabs */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search student or fee category..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Class 1">Class 1</SelectItem>
                  <SelectItem value="Class 2">Class 2</SelectItem>
                  <SelectItem value="Class 3">Class 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Fee Records */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No fee records found</p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map(record => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{record.student}</CardTitle>
                      <CardDescription>{record.class}</CardDescription>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{record.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-medium">₹{record.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p>{new Date(record.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {record.status === 'paid' && (
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p>{record.paymentMethod}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-3">
                  {record.status !== 'paid' && (
                    <Button variant="default" size="sm">Record Payment</Button>
                  )}
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Fees;
