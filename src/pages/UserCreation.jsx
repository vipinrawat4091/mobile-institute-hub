
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from 'sonner';
import { UserPlus, Upload, Users, User } from 'lucide-react';

const UserCreation = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    institute: ''
  });
  const [bulkFile, setBulkFile] = useState(null);
  
  // Mock institute list
  const institutes = [
    { id: 1, name: "Delhi Public School" },
    { id: 2, name: "St. Mary's Academy" },
    { id: 3, name: "Greenfield International" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setBulkFile(e.target.files[0]);
  };

  const handleSingleUserCreate = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.name || !formData.email || !formData.role || 
        !formData.password || !formData.confirmPassword || !formData.institute) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    // In a real app, this would send the data to the backend
    toast.success(`User ${formData.name} created successfully`);
    
    // Reset form
    setFormData({
      username: '',
      name: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
      institute: ''
    });
  };

  const handleBulkUserCreate = (e) => {
    e.preventDefault();
    
    if (!bulkFile) {
      toast.error("Please select a file");
      return;
    }
    
    // In a real app, this would process the file
    toast.success("Bulk user creation started");
    setBulkFile(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">User Creation</h1>
          <p className="text-muted-foreground">
            Create admin accounts for different institutes
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Active admin accounts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,543</div>
              <p className="text-xs text-muted-foreground">
                Across all institutes
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                Users created in May 2025
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Creation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Create User Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="single">Single User</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
              </TabsList>
              
              <TabsContent value="single">
                <form onSubmit={handleSingleUserCreate} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">
                        Username
                      </label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="e.g., AD123"
                      />
                      <p className="text-xs text-muted-foreground">
                        Username should start with role prefix (AD for admin)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium">
                        Role
                      </label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => handleSelectChange('role', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="superadmin">Super Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="institute" className="text-sm font-medium">
                        Institute
                      </label>
                      <Select
                        value={formData.institute}
                        onValueChange={(value) => handleSelectChange('institute', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Institute" />
                        </SelectTrigger>
                        <SelectContent>
                          {institutes.map((institute) => (
                            <SelectItem key={institute.id} value={institute.id.toString()}>
                              {institute.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create User
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="bulk">
                <form onSubmit={handleBulkUserCreate} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-2">
                        Upload CSV File
                      </label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm mb-2">
                          Drag & drop a CSV file or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          File should contain columns: username, name, email, role, password, institute
                        </p>
                        <Input
                          id="file"
                          type="file"
                          accept=".csv"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('file').click()}
                        >
                          Browse Files
                        </Button>
                        {bulkFile && (
                          <p className="mt-2 text-sm text-primary">
                            Selected: {bulkFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="institute" className="text-sm font-medium">
                        Default Institute (if not specified in CSV)
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Institute" />
                        </SelectTrigger>
                        <SelectContent>
                          {institutes.map((institute) => (
                            <SelectItem key={institute.id} value={institute.id.toString()}>
                              {institute.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload and Create Users
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Template and Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>CSV Template and Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                For bulk user creation, download the CSV template and fill it with user information.
                Then upload it using the form above.
              </p>
              <Button variant="outline">
                Download CSV Template
              </Button>
              
              <div className="border rounded-md p-4 bg-muted/50 mt-4">
                <h3 className="font-medium mb-2">Required Columns:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-mono">username</span> - Unique identifier (e.g. AD101)</li>
                  <li><span className="font-mono">name</span> - Full name of the user</li>
                  <li><span className="font-mono">email</span> - Valid email address</li>
                  <li><span className="font-mono">role</span> - Role (admin or superadmin)</li>
                  <li><span className="font-mono">password</span> - Initial password</li>
                  <li><span className="font-mono">institute_id</span> - Institute ID (optional if default is selected)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserCreation;
