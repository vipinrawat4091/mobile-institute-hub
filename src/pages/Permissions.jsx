
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
import { toast } from 'sonner';
import { Shield, Save, Lock } from 'lucide-react';

// Mock data for permissions
const mockRoles = ['admin', 'teacher', 'staff', 'student', 'parent'];

const mockModules = [
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
];

// Initial permission state (which role has which permission)
const initialPermissions = {
  admin: mockModules.flatMap(module => module.permissions.map(p => p.id)),
  teacher: [
    'view_attendance', 'mark_attendance', 'edit_attendance', 
    'view_timetable', 'apply_leave', 'view_leave_requests', 'approve_leave'
  ],
  staff: [
    'view_attendance', 'apply_leave'
  ],
  student: [
    'view_attendance', 'view_timetable', 'apply_leave'
  ],
  parent: [
    'view_attendance', 'view_fees', 'view_timetable', 'apply_leave'
  ]
};

const Permissions = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [permissions, setPermissions] = useState(initialPermissions);
  const [expandedModules, setExpandedModules] = useState({});

  const togglePermission = (roleId, permissionId) => {
    setPermissions(prev => {
      const rolePermissions = [...prev[roleId]];
      
      if (rolePermissions.includes(permissionId)) {
        // Remove permission
        return {
          ...prev,
          [roleId]: rolePermissions.filter(p => p !== permissionId)
        };
      } else {
        // Add permission
        return {
          ...prev,
          [roleId]: [...rolePermissions, permissionId]
        };
      }
    });
  };

  const toggleModuleExpand = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const toggleAllModulePermissions = (roleId, moduleId, checked) => {
    const modulePermissions = mockModules.find(m => m.id === moduleId)
      .permissions.map(p => p.id);
    
    setPermissions(prev => {
      const rolePermissions = [...prev[roleId]];
      
      if (checked) {
        // Add all module permissions that aren't already included
        const newPermissions = [
          ...rolePermissions,
          ...modulePermissions.filter(p => !rolePermissions.includes(p))
        ];
        return {
          ...prev,
          [roleId]: newPermissions
        };
      } else {
        // Remove all module permissions
        return {
          ...prev,
          [roleId]: rolePermissions.filter(p => !modulePermissions.includes(p))
        };
      }
    });
  };

  const savePermissions = () => {
    // In a real app, this would save to the backend
    toast.success('Permissions updated successfully');
  };

  const isModuleFullySelected = (roleId, moduleId) => {
    const modulePermissions = mockModules.find(m => m.id === moduleId)
      .permissions.map(p => p.id);
    
    return modulePermissions.every(permission => 
      permissions[roleId].includes(permission)
    );
  };

  const isModulePartiallySelected = (roleId, moduleId) => {
    const modulePermissions = mockModules.find(m => m.id === moduleId)
      .permissions.map(p => p.id);
    
    const selectedCount = modulePermissions.filter(permission => 
      permissions[roleId].includes(permission)
    ).length;
    
    return selectedCount > 0 && selectedCount < modulePermissions.length;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Permission Management</h1>
            <p className="text-muted-foreground">
              Configure role-based access control for the system
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
              <CardTitle>Role Permissions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                                    checked={permissions[role].includes(permission.id)}
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
