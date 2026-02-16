import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Application />} />
        <Route path="/application-detail" element={<ApplicationDetail />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/programme-apply" element={<ProgrammeApplication />} />
        <Route path="/exams" element={<Examination />} />
        <Route
          path="/exams/prechecks"
          element={<ExaminationPrechecks onStart={() => {}} />}
        />
        <Route path="/exams/start" element={<ExamInterface />} />
      </Route>
      <Route path="*" element={<div className="p-10">Page Not Found</div>} />
    </Routes>
  );
}

export default App;
