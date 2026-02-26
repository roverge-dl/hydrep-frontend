import "./index.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import Application from "./pages/Application";
import Programmes from "./pages/Programme";
import Examination from "./pages/Examination";
import ExaminationPrechecks from "./components/examination/ExaminationPrechecks";
import ExamInterface from "./pages/ExamInterface";
import ProgrammeApplication from "./components/programme/ProgrammeApplication";
import ApplicationDetail from "./pages/ApplicationDetail";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import SentEmail from "./components/commons/SentEmail";
import PasswordReset from "./pages/PasswordReset";

interface ProtectedRouteProps {
  redirectPath?: string;
}

function ProtectedRoute({ redirectPath = "/login" }: ProtectedRouteProps) {
  const { user, token, isLoading } = useAuth(); // Now 'token' is available!

  console.log("Auth State:", {
    hasUser: !!user,
    hasToken: !!token,
    tokenValue: token,
    isLoading,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!user || !token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

// function App() {
//   return (
//     <Routes>
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<DashboardLayout />}>
//         <Route index path="/dashboard" element={<Dashboard />} />
//         <Route path="/applications" element={<Application />} />
//         <Route path="/applications/:id" element={<ApplicationDetail />} />
//         {/* <Route path="/programmes" element={<Programmes />} />
//         <Route path="/programmes/:slug" element={<ProgrammeApplication />} /> */}
//         <Route path="programmes">
//           <Route index element={<Programmes />} />

//           <Route path=":slug" element={<ProgrammeApplication />} />
//         </Route>
//         <Route path="/exams" element={<Examination />} />
//         <Route
//           path="/exams/prechecks"
//           element={<ExaminationPrechecks onStart={() => {}} />}
//         />
//         <Route path="/exams/start" element={<ExamInterface />} />
//       </Route>
//       <Route path="*" element={<div className="p-10">Page Not Found</div>} />
//     </Routes>
//   );
// }
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sent-reset-link" element={<SentEmail />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Protected Routes Wrapper */}
      <Route element={<ProtectedRoute />}>
        {/* Layout Wrapper */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />

          <Route path="programmes">
            <Route index element={<Programmes />} />
            <Route path=":slug" element={<ProgrammeApplication />} />
          </Route>

          <Route path="/exams" element={<Examination />} />
          <Route path="/applications/:applicationId/exams" element={<Examination />} />
          <Route
            path="/program/:programId/exams/:id/prechecks"
            element={<ExaminationPrechecks />}
          />
          <Route path="/exams/:id/start" element={<ExamInterface />} />
        </Route>
      </Route>

      {/* Default/Fallback Routes */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {/* <Route path="*" element={<div className="p-10">Page Not Found</div>} /> */}
    </Routes>
  );
}

export default App;
