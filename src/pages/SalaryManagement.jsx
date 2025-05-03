
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Download,
  Clock,
  BarChart3,
  Edit,
  Plus
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for example purposes
const mockSalaries = [
  { id: 1, employeeName: 'Anita Sharma', employeeId: 'T001', role: 'teacher', department: 'Mathematics', basic: 45000, allowances: 8000, deductions: 5000, netSalary: 48000, status: 'paid', paymentDate: '2025-05-01' },
  { id: 2, employeeName: 'Rajesh Kumar', employeeId: 'T002', role: 'teacher', department: 'Science', basic: 48000, allowances: 9000, deductions: 5500, netSalary: 51500, status: 'paid', paymentDate: '2025-05-01' },
  { id: 3, employeeName: 'Priya Singh', employeeId: 'T003', role: 'teacher', department: 'English', basic: 42000, allowances: 7500, deductions: 4800, netSalary: 44700, status: 'pending', paymentDate: '-' },
  { id: 4, employeeName: 'Leela Das', employeeId: 'S001', role: 'staff', department: 'Administration', basic: 35000, allowances: 6000, deductions: 4000, netSalary: 37000, status: 'paid', paymentDate: '2025-05-01' },
  { id: 5, employeeName: 'Gopal Verma', employeeId: 'S002', role: 'staff', department: 'Maintenance', basic: 30000, allowances: 5000, deductions: 3500, netSalary: 31500, status: 'pending', paymentDate: '-' },
];

const SalaryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const filteredSalaries = mockSalaries.filter(salary => 
    salary.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    salary.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate summary statistics
  const totalSalaryPayout = mockSalaries.reduce((sum, item) => item.status === 'paid' ? sum + item.netSalary : sum, 0);
  const pendingSalaries = mockSalaries.filter(item => item.status === 'pending').length;
  const averageSalary = Math.round(mockSalaries.reduce((sum, item) => sum + item.netSalary, 0) / mockSalaries.length);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Salary Management</h1>
            <p className="text-muted-foreground">
              Manage employee salaries and payments
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" /> Generate Payslips
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Record Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Record Salary Payment</DialogTitle>
                  <DialogDescription>
                    Enter payment details for the employee.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="employee" className="text-right">
                      Employee
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSalaries
                          .filter(salary => salary.status === 'pending')
                          .map(salary => (
                            <SelectItem key={salary.id} value={salary.id.toString()}>
                              {salary.employeeName} ({salary.employeeId})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="month" className="text-right">
                      Month
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="may2025">May 2025</SelectItem>
                        <SelectItem value="april2025">April 2025</SelectItem>
                        <SelectItem value="march2025">March 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="amount" className="text-right">
                      Amount (₹)
                    </label>
                    <Input id="amount" className="col-span-3" placeholder="Enter salary amount" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="payment-method" className="text-right">
                      Payment Method
                    </label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="payment-date" className="text-right">
                      Payment Date
                    </label>
                    <Input id="payment-date" type="date" className="col-span-3" />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setDialogOpen(false)}>Record Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Salary statistics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Salary Payout</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹ {totalSalaryPayout.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                For the current month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSalaries}</div>
              <p className="text-xs text-muted-foreground">
                Salaries pending for the current month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹ {averageSalary.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all employees
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Salary listing */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Salary Records</CardTitle>
                <CardDescription>Manage salary records for all employees</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
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
                    <TableHead>Employee</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Basic</TableHead>
                    <TableHead className="text-right">Allowances</TableHead>
                    <TableHead className="text-right">Deductions</TableHead>
                    <TableHead className="text-right">Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalaries.length > 0 ? (
                    filteredSalaries.map((salary) => (
                      <TableRow key={salary.id}>
                        <TableCell className="font-medium">{salary.employeeName}</TableCell>
                        <TableCell>{salary.employeeId}</TableCell>
                        <TableCell className="capitalize">{salary.role}</TableCell>
                        <TableCell className="text-right">₹ {salary.basic.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹ {salary.allowances.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹ {salary.deductions.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium">₹ {salary.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={salary.status === 'paid' ? 'success' : 'outline'}
                            className={salary.status === 'paid' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          >
                            {salary.status === 'paid' ? 'Paid' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end space-x-2">
                            {salary.status === 'paid' ? (
                              <Button variant="ghost" size="icon" title="Download Payslip">
                                <Download className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" title="Edit Salary">
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        No salary records found
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

export default SalaryManagement;
