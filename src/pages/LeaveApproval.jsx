
import React, { useState } from 'react';
import Layout from '../components/Layout.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Check, Clock, FileText, X } from 'lucide-react';

// Mock data for leave applications
const mockLeaveApplications = [
  { 
    id: 1, 
    name: 'Anita Sharma', 
    role: 'teacher', 
    type: 'Sick Leave', 
    from: '2025-05-02', 
    to: '2025-05-04', 
    reason: 'Fever and cold', 
    status: 'pending', 
    appliedOn: '2025-05-01' 
  },
  { 
    id: 2, 
    name: 'Rajesh Kumar', 
    role: 'teacher', 
    type: 'Casual Leave', 
    from: '2025-05-10', 
    to: '2025-05-12', 
    reason: 'Family function', 
    status: 'pending', 
    appliedOn: '2025-05-03' 
  },
  { 
    id: 3, 
    name: 'Amit Patel', 
    role: 'student', 
    type: 'Medical Leave', 
    from: '2025-05-05', 
    to: '2025-05-08', 
    reason: 'Surgery recovery', 
    status: 'approved', 
    appliedOn: '2025-04-28',
    approvedBy: 'Jamie Smith' 
  },
  { 
    id: 4, 
    name: 'Gopal Verma', 
    role: 'staff', 
    type: 'Personal Leave', 
    from: '2025-05-15', 
    to: '2025-05-15', 
    reason: 'Personal work', 
    status: 'rejected', 
    appliedOn: '2025-05-10',
    rejectedBy: 'Jamie Smith',
    rejectionReason: 'Staff shortage'
  },
];

const LeaveApproval = () => {
  const [applications, setApplications] = useState(mockLeaveApplications);
  const [filter, setFilter] = useState('all');
  const [detailDialog, setDetailDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setDetailDialog(true);
  };

  const handleApprove = (id) => {
    setApplications(applications.map(app => 
      app.id === id 
        ? { ...app, status: 'approved', approvedBy: 'Jamie Smith' } 
        : app
    ));
    setDetailDialog(false);
  };

  const handleReject = (id) => {
    if (!rejectionReason.trim()) return;
    
    setApplications(applications.map(app => 
      app.id === id 
        ? { ...app, status: 'rejected', rejectedBy: 'Jamie Smith', rejectionReason } 
        : app
    ));
    setRejectionReason('');
    setDetailDialog(false);
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Leave Approval</h1>
            <p className="text-muted-foreground">
              Manage leave requests from staff, teachers and students
            </p>
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Summary Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter(app => app.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting your decision
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.filter(app => app.status === 'approved').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Applications approved
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applications.length}
              </div>
              <p className="text-xs text-muted-foreground">
                All leave applications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leave Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.name}</TableCell>
                        <TableCell className="capitalize">{application.role}</TableCell>
                        <TableCell>{application.type}</TableCell>
                        <TableCell>{new Date(application.from).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(application.to).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(application)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        No leave applications found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={detailDialog} onOpenChange={setDetailDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Leave Application Details</DialogTitle>
              <DialogDescription>
                Request from {selectedApplication.name} ({selectedApplication.role})
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Leave Type</span>
                <span>{selectedApplication.type}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">From Date</span>
                  <span>{new Date(selectedApplication.from).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">To Date</span>
                  <span>{new Date(selectedApplication.to).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Reason</span>
                <span>{selectedApplication.reason}</span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Applied On</span>
                <span>{new Date(selectedApplication.appliedOn).toLocaleDateString()}</span>
              </div>
              
              {selectedApplication.status === 'approved' && (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Approved By</span>
                  <span>{selectedApplication.approvedBy}</span>
                </div>
              )}
              
              {selectedApplication.status === 'rejected' && (
                <div className="space-y-1">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Rejected By</span>
                    <span>{selectedApplication.rejectedBy}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Rejection Reason</span>
                    <span>{selectedApplication.rejectionReason}</span>
                  </div>
                </div>
              )}
              
              {selectedApplication.status === 'pending' && (
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Rejection Reason (if rejecting)</span>
                  <input
                    type="text"
                    className="p-2 border rounded"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              {selectedApplication.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => handleReject(selectedApplication.id)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handleApprove(selectedApplication.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
              {selectedApplication.status !== 'pending' && (
                <Button onClick={() => setDetailDialog(false)}>Close</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default LeaveApproval;
