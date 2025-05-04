
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
import LeaveApplication from "./pages/LeaveApplication.jsx";
import ChildAttendance from "./pages/ChildAttendance.jsx";
import ChildMarks from "./pages/ChildMarks.jsx";
import ChildReport from "./pages/ChildReport.jsx";
import FeesPayment from "./pages/FeesPayment.jsx";
import Events from "./pages/Events.jsx";
import Attendance from "./pages/Attendance.jsx";
import Marks from "./pages/Marks.jsx";
import Report from "./pages/Report.jsx";
import IdCard from "./pages/IdCard.jsx";
import ClassAttendance from "./pages/ClassAttendance.jsx";
import Institutes from "./pages/Institutes.jsx";
import Permissions from "./pages/Permissions.jsx";
import UserCreation from "./pages/UserCreation.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
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
            
            {/* Superadmin Routes */}
            <Route path="/institutes" element={
              <PrivateRoute requiredRoles={["superadmin"]}>
                <Institutes />
              </PrivateRoute>
            } />
            <Route path="/permissions" element={
              <PrivateRoute requiredRoles={["superadmin"]}>
                <Permissions />
              </PrivateRoute>
            } />
            <Route path="/user-creation" element={
              <PrivateRoute requiredRoles={["superadmin"]}>
                <UserCreation />
              </PrivateRoute>
            } />
            
            {/* Parent Routes */}
            <Route path="/leave-application" element={
              <PrivateRoute requiredRoles={["parent", "student", "staff", "teacher"]}>
                <LeaveApplication />
              </PrivateRoute>
            } />
            <Route path="/child-attendance" element={
              <PrivateRoute requiredRoles={["parent"]}>
                <ChildAttendance />
              </PrivateRoute>
            } />
            <Route path="/child-marks" element={
              <PrivateRoute requiredRoles={["parent"]}>
                <ChildMarks />
              </PrivateRoute>
            } />
            <Route path="/child-report" element={
              <PrivateRoute requiredRoles={["parent"]}>
                <ChildReport />
              </PrivateRoute>
            } />
            <Route path="/fees-payment" element={
              <PrivateRoute requiredRoles={["parent"]}>
                <FeesPayment />
              </PrivateRoute>
            } />
            <Route path="/events" element={
              <PrivateRoute requiredRoles={["parent", "student", "teacher"]}>
                <Events />
              </PrivateRoute>
            } />
            
            {/* Student Routes */}
            <Route path="/attendance" element={
              <PrivateRoute requiredRoles={["student", "teacher"]}>
                <Attendance />
              </PrivateRoute>
            } />
            <Route path="/marks" element={
              <PrivateRoute requiredRoles={["student"]}>
                <Marks />
              </PrivateRoute>
            } />
            <Route path="/report" element={
              <PrivateRoute requiredRoles={["student"]}>
                <Report />
              </PrivateRoute>
            } />
            <Route path="/id-card" element={
              <PrivateRoute requiredRoles={["student"]}>
                <IdCard />
              </PrivateRoute>
            } />
            
            {/* Teacher Routes */}
            <Route path="/class-attendance" element={
              <PrivateRoute requiredRoles={["teacher"]}>
                <ClassAttendance />
              </PrivateRoute>
            } />
            
            {/* Utility Routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
