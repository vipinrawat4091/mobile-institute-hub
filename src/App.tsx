
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AttendanceManagement from "./pages/AttendanceManagement.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import SalaryManagement from "./pages/SalaryManagement.jsx";
import LeaveApproval from "./pages/LeaveApproval.jsx";
import Transport from "./pages/Transport.jsx";
import Notices from "./pages/Notices.jsx";
import Timetable from "./pages/Timetable.jsx";
import Fees from "./pages/Fees.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/attendance-management" element={
              <PrivateRoute requiredRoles={["admin", "superadmin"]}>
                <AttendanceManagement />
              </PrivateRoute>
            } />
            <Route path="/user-management" element={
              <PrivateRoute requiredRoles={["admin", "superadmin"]}>
                <UserManagement />
              </PrivateRoute>
            } />
            <Route path="/salary-management" element={
              <PrivateRoute requiredRoles={["admin", "superadmin"]}>
                <SalaryManagement />
              </PrivateRoute>
            } />
            <Route path="/leave-approval" element={
              <PrivateRoute requiredRoles={["admin", "superadmin", "teacher"]}>
                <LeaveApproval />
              </PrivateRoute>
            } />
            <Route path="/transport" element={
              <PrivateRoute requiredRoles={["admin", "superadmin"]}>
                <Transport />
              </PrivateRoute>
            } />
            <Route path="/notices" element={
              <PrivateRoute>
                <Notices />
              </PrivateRoute>
            } />
            <Route path="/timetable" element={
              <PrivateRoute>
                <Timetable />
              </PrivateRoute>
            } />
            <Route path="/fees" element={
              <PrivateRoute requiredRoles={["admin", "superadmin"]}>
                <Fees />
              </PrivateRoute>
            } />
            
            {/* Utility Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
