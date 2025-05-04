
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Shield, Save, Lock, Search, Filter, Building, User, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

// Mock data for institutes
const mockInstitutes = [
  { id: 1, name: 'Global Education Academy' },
  { id: 2, name: 'Modern Public School' },
  { id: 3, name: 'Tech Educational Institute' },
];

// Mock data for permissions
const mockRoles = ['admin', 'teacher', 'staff', 'student', 'parent'];

// Mock data for users in each institute by role
const mockUsers = {
  1: { // Institute 1
    admin: [
      { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', status: 'active' },
      { id: 2, name: 'Meena Gupta', email: 'meena@example.com', status: 'active' },
    ],
    teacher: [
      { id: 3, name: 'Anita Sharma', email: 'anita@example.com', status: 'active' },
      { id: 4, name: 'Vikram Singh', email: 'vikram@example.com', status: 'active' },
      { id: 5, name: 'Preeti Verma', email: 'preeti@example.com', status: 'inactive' },
    ],
    student: [
      { id: 6, name: 'Rahul Patel', email: 'rahul@example.com', status: 'active' },
      { id: 7, name: 'Sneha Joshi', email: 'sneha@example.com', status: 'active' },
    ],
    staff: [
      { id: 8, name: 'Ramesh Yadav', email: 'ramesh@example.com', status: 'active' },
    ],
    parent: [
      { id: 9, name: 'Sunil Patel', email: 'sunil@example.com', status: 'active' },
      { id: 10, name: 'Deepa Joshi', email: 'deepa@example.com', status: 'active' },
    ]
  },
  2: { // Institute 2
    admin: [
      { id: 11, name: 'Priya Singh', email: 'priya@example.com', status: 'active' },
    ],
    teacher: [
      { id: 12, name: 'Alok Mishra', email: 'alok@example.com', status: 'active' },
      { id: 13, name: 'Kavita Rao', email: 'kavita@example.com', status: 'active' },
    ],
    student: [
      { id: 14, name: 'Amit Kumar', email: 'amit@example.com', status: 'active' },
      { id: 15, name: 'Pooja Sharma', email: 'pooja@example.com', status: 'active' },
    ],
    staff: [
      { id: 16, name: 'Surinder Kumar', email: 'surinder@example.com', status: 'active' },
    ],
    parent: [
      { id: 17, name: 'Harish Kumar', email: 'harish@example.com', status: 'active' },
    ]
  },
  3: { // Institute 3
    admin: [
      { id: 18, name: 'Ajay Mehta', email: 'ajay@example.com', status: 'active' },
    ],
    teacher: [
      { id: 19, name: 'Neha Reddy', email: 'neha@example.com', status: 'active' },
      { id: 20, name: 'Prakash Iyer', email: 'prakash@example.com', status: 'active' },
    ],
    student: [
      { id: 21, name: 'Rohit Verma', email: 'rohit@example.com', status: 'active' },
    ],
    staff: [
      { id: 22, name: 'Kiran Das', email: 'kiran@example.com', status: 'active' },
    ],
    parent: [
      { id: 23, name: 'Vinod Verma', email: 'vinod@example.com', status: 'active' },
    ]
  }
};

const mockModules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    permissions: [
      { id: 'view_dashboard', name: 'View Dashboard' },
    ]
  },
  {
    id: 'user_management',
    name: 'User Management',
    permissions: [
      { id: 'view_users', name: 'View Users' },
      { id: 'add_user', name: 'Add User' },
      { id: 'edit_user', name: 'Edit User' },
      { id: 'delete_user', name: 'Delete User' },
    ]
  },
  {
    id: 'attendance',
    name: 'Attendance Management',
    permissions: [
      { id: 'view_attendance', name: 'View Attendance' },
      { id: 'mark_attendance', name: 'Mark Attendance' },
      { id: 'edit_attendance', name: 'Edit Attendance' },
      { id: 'generate_attendance_report', name: 'Generate Report' },
    ]
  },
  {
    id: 'leave',
    name: 'Leave Management',
    permissions: [
      { id: 'apply_leave', name: 'Apply Leave' },
      { id: 'view_leave_requests', name: 'View Leave Requests' },
      { id: 'approve_leave', name: 'Approve Leave' },
      { id: 'reject_leave', name: 'Reject Leave' },
    ]
  },
  {
    id: 'fees',
    name: 'Fee Management',
    permissions: [
      { id: 'view_fees', name: 'View Fees' },
      { id: 'create_fee_structure', name: 'Create Fee Structure' },
      { id: 'collect_fees', name: 'Collect Fees' },
      { id: 'generate_receipt', name: 'Generate Receipt' },
    ]
  },
  {
    id: 'timetable',
    name: 'Timetable Management',
    permissions: [
      { id: 'view_timetable', name: 'View Timetable' },
      { id: 'create_timetable', name: 'Create Timetable' },
      { id: 'edit_timetable', name: 'Edit Timetable' },
    ]
  },
  {
    id: 'classroom',
    name: 'Classroom Management',
    permissions: [
      { id: 'view_classroom', name: 'View Classroom' },
      { id: 'manage_classroom', name: 'Manage Classroom' },
      { id: 'assign_classroom', name: 'Assign Classroom' },
    ]
  },
  {
    id: 'events',
    name: 'Events Management',
    permissions: [
      { id: 'view_events', name: 'View Events' },
      { id: 'create_events', name: 'Create Events' },
      { id: 'edit_events', name: 'Edit Events' },
    ]
  },
];

// Initial permission state (which role has which permission)
const initialRolePermissions = {
  admin: mockModules.flatMap(module => module.permissions.map(p => p.id)),
  teacher: [
    'view_dashboard', 'view_attendance', 'mark_attendance', 'edit_attendance', 
    'view_timetable', 'apply_leave', 'view_leave_requests', 'approve_leave',
    'view_classroom'
  ],
  staff: [
    'view_dashboard', 'view_attendance', 'apply_leave'
  ],
  student: [
    'view_dashboard', 'view_attendance', 'view_timetable', 'apply_leave',
    'view_events'
  ],
  parent: [
    'view_dashboard', 'view_attendance', 'view_fees', 'view_timetable', 'apply_leave',
    'view_events'
  ]
};

// Initial user-specific permissions (overrides)
const initialUserPermissions = {
  // Teacher with ID 4 has additional classroom management permission
  4: ['view_dashboard', 'view_attendance', 'mark_attendance', 'edit_attendance', 
      'view_timetable', 'apply_leave', 'view_leave_requests', 'approve_leave',
      'view_classroom', 'manage_classroom'],
  // Student with ID 7 doesn't have event viewing permission
  7: ['view_dashboard', 'view_attendance', 'view_timetable', 'apply_leave'],
};

const Permissions = () => {
  const [activeTab, setActiveTab] = useState('role_based');
  const [selectedInstitute, setSelectedInstitute] = useState("1");
  const [selectedRole, setSelectedRole] = useState("teacher");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModules, setExpandedModules] = useState({});
  const [rolePermissions, setRolePermissions] = useState(initialRolePermissions);
  const [userPermissions, setUserPermissions] = useState(initialUserPermissions);
  const [useCustomPermissions, setUseCustomPermissions] = useState({});

  // Filter users by search query
  const filteredUsers = selectedInstitute && selectedRole ? 
    mockUsers[selectedInstitute][selectedRole]?.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [] : [];

  const togglePermission = (entityId, permissionId, isUserPermission = false) => {
    if (isUserPermission) {
      setUserPermissions(prev => {
        const userPerms = prev[entityId] || [...(rolePermissions[selectedRole] || [])];
        
        if (userPerms.includes(permissionId)) {
          // Remove permission
          return {
            ...prev,
            [entityId]: userPerms.filter(p => p !== permissionId)
          };
        } else {
          // Add permission
          return {
            ...prev,
            [entityId]: [...userPerms, permissionId]
          };
        }
      });
    } else {
      // Role permissions
      setRolePermissions(prev => {
        const rolePerms = [...prev[entityId]];
        
        if (rolePerms.includes(permissionId)) {
          // Remove permission
          return {
            ...prev,
            [entityId]: rolePerms.filter(p => p !== permissionId)
          };
        } else {
          // Add permission
          return {
            ...prev,
            [entityId]: [...rolePerms, permissionId]
          };
        }
      });
    }
  };

  const toggleModuleExpand = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const toggleAllModulePermissions = (entityId, moduleId, checked, isUserPermission = false) => {
    const modulePermissions = mockModules.find(m => m.id === moduleId)
      .permissions.map(p => p.id);
    
    if (isUserPermission) {
      setUserPermissions(prev => {
        const userPerms = prev[entityId] || [...(rolePermissions[selectedRole] || [])];
        
        if (checked) {
          // Add all module permissions that aren't already included
          const newPermissions = [
            ...userPerms,
            ...modulePermissions.filter(p => !userPerms.includes(p))
          ];
          return {
            ...prev,
            [entityId]: newPermissions
          };
        } else {
          // Remove all module permissions
          return {
            ...prev,
            [entityId]: userPerms.filter(p => !modulePermissions.includes(p))
          };
        }
      });
    } else {
      // Role permissions
      setRolePermissions(prev => {
        const rolePerms = [...prev[entityId]];
        
        if (checked) {
          // Add all module permissions that aren't already included
          const newPermissions = [
            ...rolePerms,
            ...modulePermissions.filter(p => !rolePerms.includes(p))
          ];
          return {
            ...prev,
            [entityId]: newPermissions
          };
        } else {
          // Remove all module permissions
          return {
            ...prev,
            [entityId]: rolePerms.filter(p => !modulePermissions.includes(p))
          };
        }
      });
    }
  };

  const savePermissions = () => {
    // In a real app, this would save to the backend
    toast.success('Permissions updated successfully');
  };

  const isModuleFullySelected = (entityId, moduleId, isUserPermission = false) => {
    const modulePermissions = mockModules.find(m => m.id === moduleId)
      .permissions.map(p => p.id);
    
    const permissionsToCheck = isUserPermission ? 
      userPermissions[entityId] || rolePermissions[selectedRole] || [] : 
      rolePermissions[entityId] || [];
    
    return modulePermissions.every(permission => 
      permissionsToCheck.includes(permission)
    );
  };

  const isModulePartiallySelected = (entityId, moduleId, isUserPermission = false) => {
    const modulePermissions = mockModules.find(m => m.id === moduleId)
      .permissions.map(p => p.id);
    
    const permissionsToCheck = isUserPermission ? 
      userPermissions[entityId] || rolePermissions[selectedRole] || [] : 
      rolePermissions[entityId] || [];
    
    const selectedCount = modulePermissions.filter(permission => 
      permissionsToCheck.includes(permission)
    ).length;
    
    return selectedCount > 0 && selectedCount < modulePermissions.length;
  };

  const handleToggleCustomPermissions = (userId) => {
    setUseCustomPermissions(prev => {
      const newValue = !prev[userId];
      
      // If turning off custom permissions, remove user from userPermissions
      if (!newValue && userPermissions[userId]) {
        setUserPermissions(prev => {
          const newPermissions = {...prev};
          delete newPermissions[userId];
          return newPermissions;
        });
      }
      
      return {
        ...prev,
        [userId]: newValue
      };
    });
  };

  const resetToRoleDefaults = (userId) => {
    setUserPermissions(prev => {
      const newPermissions = {...prev};
      delete newPermissions[userId];
      return newPermissions;
    });
    setUseCustomPermissions(prev => ({
      ...prev,
      [userId]: false
    }));
    toast.success('Permissions reset to role defaults');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Permission Management</h1>
            <p className="text-muted-foreground">
              Configure role-based and user-specific access control
            </p>
          </div>
          <Button onClick={savePermissions} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Permissions
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Permission Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="role_based">Role-Based Permissions</TabsTrigger>
                <TabsTrigger value="user_specific">User-Specific Permissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="role_based">
                {/* Role-based permissions tab */}
                <Tabs value={selectedRole} onValueChange={setSelectedRole}>
                  <TabsList className="mb-4">
                    {mockRoles.map(role => (
                      <TabsTrigger key={role} value={role} className="capitalize">
                        {role}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {mockRoles.map(role => (
                    <TabsContent key={role} value={role}>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[300px]">Module / Permission</TableHead>
                              <TableHead>Access</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockModules.map((module) => (
                              <React.Fragment key={module.id}>
                                {/* Module Header Row */}
                                <TableRow className="bg-muted/50">
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => toggleModuleExpand(module.id)}
                                        className="p-0 h-6 w-6"
                                      >
                                        {expandedModules[module.id] ? '-' : '+'}
                                      </Button>
                                      {module.name}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Checkbox 
                                      checked={isModuleFullySelected(role, module.id)}
                                      onCheckedChange={(checked) => 
                                        toggleAllModulePermissions(role, module.id, checked)
                                      }
                                      data-state={
                                        isModulePartiallySelected(role, module.id) 
                                          ? "indeterminate" 
                                          : isModuleFullySelected(role, module.id) 
                                            ? "checked" 
                                            : "unchecked"
                                      }
                                    />
                                  </TableCell>
                                  <TableCell>All permissions for {module.name}</TableCell>
                                </TableRow>
                                
                                {/* Individual Permission Rows */}
                                {expandedModules[module.id] && module.permissions.map((permission) => (
                                  <TableRow key={permission.id} className="bg-background">
                                    <TableCell className="pl-10 font-normal">
                                      {permission.name}
                                    </TableCell>
                                    <TableCell>
                                      <Checkbox 
                                        checked={rolePermissions[role].includes(permission.id)}
                                        onCheckedChange={() => togglePermission(role, permission.id)}
                                      />
                                    </TableCell>
                                    <TableCell>Permission to {permission.name.toLowerCase()}</TableCell>
                                  </TableRow>
                                ))}
                              </React.Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
              
              <TabsContent value="user_specific">
                {/* User-specific permissions tab */}
                <div className="space-y-4">
                  {/* Institute and role selection */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Institute</label>
                      <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an institute" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockInstitutes.map(institute => (
                            <SelectItem key={institute.id} value={institute.id.toString()}>
                              {institute.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Role</label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockRoles.map(role => (
                            <SelectItem key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search Users</label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name or email..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Users table */}
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Users in {mockInstitutes.find(i => i.id.toString() === selectedInstitute)?.name || 'Selected Institute'}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Custom Permissions</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => (
                                <TableRow key={user.id} 
                                  className={selectedUser === user.id ? "bg-muted" : ""}>
                                  <TableCell>{user.name}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center space-x-2">
                                      <Switch 
                                        checked={!!useCustomPermissions[user.id]} 
                                        onCheckedChange={() => handleToggleCustomPermissions(user.id)}
                                      />
                                      <span className="text-sm">
                                        {useCustomPermissions[user.id] ? 'Enabled' : 'Disabled'}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
                                      >
                                        {user.id === selectedUser ? 'Hide Permissions' : 'View Permissions'}
                                      </Button>
                                      {useCustomPermissions[user.id] && (
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          onClick={() => resetToRoleDefaults(user.id)}
                                        >
                                          Reset to Role Defaults
                                        </Button>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                  No users found
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Selected user permissions */}
                  {selectedUser && (
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {useCustomPermissions[selectedUser] ? 'Custom Permissions for' : 'Role-based Permissions for'} {filteredUsers.find(u => u.id === selectedUser)?.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {!useCustomPermissions[selectedUser] ? (
                          <div className="rounded-md border bg-muted/50 p-4 mb-4">
                            <p className="text-sm">
                              This user inherits all permissions from their role. Enable custom permissions to modify individual access rights.
                            </p>
                          </div>
                        ) : (
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[300px]">Module / Permission</TableHead>
                                  <TableHead>Access</TableHead>
                                  <TableHead>Description</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {mockModules.map((module) => (
                                  <React.Fragment key={module.id}>
                                    {/* Module Header Row */}
                                    <TableRow className="bg-muted/50">
                                      <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={() => toggleModuleExpand(module.id)}
                                            className="p-0 h-6 w-6"
                                          >
                                            {expandedModules[module.id] ? '-' : '+'}
                                          </Button>
                                          {module.name}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Checkbox 
                                          checked={isModuleFullySelected(selectedUser, module.id, true)}
                                          onCheckedChange={(checked) => 
                                            toggleAllModulePermissions(selectedUser, module.id, checked, true)
                                          }
                                          data-state={
                                            isModulePartiallySelected(selectedUser, module.id, true) 
                                              ? "indeterminate" 
                                              : isModuleFullySelected(selectedUser, module.id, true) 
                                                ? "checked" 
                                                : "unchecked"
                                          }
                                        />
                                      </TableCell>
                                      <TableCell>All permissions for {module.name}</TableCell>
                                    </TableRow>
                                    
                                    {/* Individual Permission Rows */}
                                    {expandedModules[module.id] && module.permissions.map((permission) => {
                                      const userPerms = userPermissions[selectedUser] || rolePermissions[selectedRole] || [];
                                      return (
                                        <TableRow key={permission.id} className="bg-background">
                                          <TableCell className="pl-10 font-normal">
                                            {permission.name}
                                          </TableCell>
                                          <TableCell>
                                            <Checkbox 
                                              checked={userPerms.includes(permission.id)}
                                              onCheckedChange={() => togglePermission(selectedUser, permission.id, true)}
                                            />
                                          </TableCell>
                                          <TableCell>Permission to {permission.name.toLowerCase()}</TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </React.Fragment>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Permission Presets</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {['Default', 'Minimal', 'Full Access', 'Read Only', 'Custom'].map((preset) => (
                <Button key={preset} variant="outline" className="justify-start">
                  {preset} Permissions
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Permissions;
