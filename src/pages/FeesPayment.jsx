
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Download, 
  Receipt, 
  Calendar,
  Check,
  FileText,
  Clock,
  AlertCircle,
  DollarSign,
  Eye
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FeesPayment = () => {
  const [selectedChild, setSelectedChild] = useState('1');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  // Sample children data
  const children = [
    {
      id: '1',
      name: 'John Doe',
      class: '10th Standard',
      section: 'A',
      rollNumber: '101'
    },
    {
      id: '2',
      name: 'Jane Doe',
      class: '8th Standard',
      section: 'B',
      rollNumber: '102'
    }
  ];
  
  // Sample fees structure
  const feesStructure = {
    '1': [
      { id: 1, category: 'Tuition Fee', amount: 25000, frequency: 'Annual' },
      { id: 2, category: 'Development Fee', amount: 15000, frequency: 'Annual' },
      { id: 3, category: 'Computer Fee', amount: 5000, frequency: 'Annual' },
      { id: 4, category: 'Transportation Fee', amount: 12000, frequency: 'Annual' },
      { id: 5, category: 'Activity Fee', amount: 8000, frequency: 'Annual' }
    ],
    '2': [
      { id: 1, category: 'Tuition Fee', amount: 20000, frequency: 'Annual' },
      { id: 2, category: 'Development Fee', amount: 12000, frequency: 'Annual' },
      { id: 3, category: 'Computer Fee', amount: 5000, frequency: 'Annual' },
      { id: 4, category: 'Transportation Fee', amount: 10000, frequency: 'Annual' },
      { id: 5, category: 'Activity Fee', amount: 6000, frequency: 'Annual' }
    ]
  };
  
  // Sample payment schedule
  const paymentSchedule = {
    '1': [
      { id: 1, quarter: 'Quarter 1 (Apr-Jun)', dueDate: '2025-04-15', amount: 16250, status: 'paid', paidDate: '2025-04-10' },
      { id: 2, quarter: 'Quarter 2 (Jul-Sep)', dueDate: '2025-07-15', amount: 16250, status: 'paid', paidDate: '2025-07-12' },
      { id: 3, quarter: 'Quarter 3 (Oct-Dec)', dueDate: '2025-10-15', amount: 16250, status: 'paid', paidDate: '2025-10-14' },
      { id: 4, quarter: 'Quarter 4 (Jan-Mar)', dueDate: '2026-01-15', amount: 16250, status: 'pending' }
    ],
    '2': [
      { id: 1, quarter: 'Quarter 1 (Apr-Jun)', dueDate: '2025-04-15', amount: 13250, status: 'paid', paidDate: '2025-04-10' },
      { id: 2, quarter: 'Quarter 2 (Jul-Sep)', dueDate: '2025-07-15', amount: 13250, status: 'paid', paidDate: '2025-07-08' },
      { id: 3, quarter: 'Quarter 3 (Oct-Dec)', dueDate: '2025-10-15', amount: 13250, status: 'paid', paidDate: '2025-10-05' },
      { id: 4, quarter: 'Quarter 4 (Jan-Mar)', dueDate: '2026-01-15', amount: 13250, status: 'pending' }
    ]
  };
  
  // Sample payment history
  const paymentHistory = {
    '1': [
      { id: 1, receiptNo: 'REC10012', date: '2025-04-10', amount: 16250, mode: 'Online', status: 'success' },
      { id: 2, receiptNo: 'REC10235', date: '2025-07-12', amount: 16250, mode: 'Online', status: 'success' },
      { id: 3, receiptNo: 'REC10567', date: '2025-10-14', amount: 16250, mode: 'Online', status: 'success' }
    ],
    '2': [
      { id: 1, receiptNo: 'REC10018', date: '2025-04-10', amount: 13250, mode: 'Bank Transfer', status: 'success' },
      { id: 2, receiptNo: 'REC10220', date: '2025-07-08', amount: 13250, mode: 'Online', status: 'success' },
      { id: 3, receiptNo: 'REC10534', date: '2025-10-05', amount: 13250, mode: 'Online', status: 'success' }
    ]
  };
  
  // Get current child
  const currentChild = children.find(child => child.id === selectedChild);
  
  // Calculate totals
  const calculateFeesTotal = () => {
    return feesStructure[selectedChild]?.reduce((sum, item) => sum + item.amount, 0) || 0;
  };
  
  const calculatePaidAmount = () => {
    return paymentHistory[selectedChild]?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  };
  
  const calculatePendingAmount = () => {
    const total = calculateFeesTotal();
    const paid = calculatePaidAmount();
    return total - paid;
  };
  
  // Next due payment
  const getNextDuePayment = () => {
    return paymentSchedule[selectedChild]?.find(payment => payment.status === 'pending');
  };
  
  // Status badge color
  const getStatusColor = (status) => {
    const statusColors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-amber-100 text-amber-800',
      overdue: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Fees Management</h1>
            <p className="text-muted-foreground">View and pay your child's school fees</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Fees
            </Button>
          </div>
        </div>
        
        {/* Child Selector */}
        <div>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-full sm:w-72">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              {children.map(child => (
                <SelectItem key={child.id} value={child.id}>{child.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Fees Summary */}
        {currentChild && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Fees (2024-25)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{calculateFeesTotal().toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">₹{calculatePaidAmount().toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">₹{calculatePendingAmount().toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Next Due Payment */}
        {getNextDuePayment() && (
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  Next Payment Due
                </CardTitle>
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                  {getNextDuePayment().quarter}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">₹{getNextDuePayment().amount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  Due Date: {new Date(getNextDuePayment().dueDate).toLocaleDateString()}
                </div>
              </div>
              <Button onClick={() => setPaymentModalOpen(true)}>
                Pay Now
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Tabs for Fees Structure, Payment Schedule, Payment History */}
        <Tabs defaultValue="structure">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="structure">Fees Structure</TabsTrigger>
            <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>
          
          {/* Fees Structure */}
          <TabsContent value="structure">
            <Card>
              <CardHeader>
                <CardTitle>Fees Structure</CardTitle>
                <CardDescription>
                  Academic Year 2024-25, Class {currentChild?.class}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fee Category</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feesStructure[selectedChild]?.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.category}</TableCell>
                        <TableCell>{fee.frequency}</TableCell>
                        <TableCell className="text-right">{fee.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{calculateFeesTotal().toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Schedule */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Payment Schedule</CardTitle>
                <CardDescription>
                  Payment timeline for academic year 2024-25
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Amount (₹)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentSchedule[selectedChild]?.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.quarter}</TableCell>
                        <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(payment.status)}>
                            {payment.status === 'paid' && <Check className="mr-1 h-3 w-3" />}
                            {payment.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.paidDate 
                            ? new Date(payment.paidDate).toLocaleDateString() 
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Record of all previous payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paymentHistory[selectedChild]?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Receipt No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                        <TableHead>Payment Mode</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory[selectedChild]?.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>{payment.mode}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(payment.status)}>
                              {payment.status === 'success' && <Check className="mr-1 h-3 w-3" />}
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <Receipt className="h-4 w-4" />
                              <span className="sr-only">Download Receipt</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No payment records found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Payment Dialog */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>
              Complete your fee payment using our secure payment gateway.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Child</span>
                <span>{currentChild?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Quarter</span>
                <span>{getNextDuePayment()?.quarter}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Due Date</span>
                <span>{getNextDuePayment()?.dueDate && new Date(getNextDuePayment().dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Amount</span>
                <span className="font-bold">₹{getNextDuePayment()?.amount.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-t my-2"></div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select defaultValue="card">
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Debit/Credit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)}>Cancel</Button>
            <Button className="gap-1">
              <DollarSign className="h-4 w-4" />
              Pay ₹{getNextDuePayment()?.amount.toLocaleString()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FeesPayment;
