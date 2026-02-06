import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import UploadResume from "../pages/UploadResume";
import Admin from "../pages/Admin";
import JobMatches from "../pages/JobMatches";
import AiResumeBuilder from "../pages/AiResumeBuilder";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/uploadresume" element={<UploadResume/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/jobMatches" element={<JobMatches/>}/>
      <Route path="/airesumebuilder" element={<AiResumeBuilder/>}/>
    </Routes>
  );
};

export default AppRoutes;
