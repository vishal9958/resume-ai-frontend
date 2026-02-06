import ResumeInsights from "./ResumeInsights";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Upload,
  Briefcase,
  ShieldCheck,
  Brain,
  Menu,
  ArrowLeft,
  FileText,
  User
} from "lucide-react";


const Dashboard = () => {
  const [open, setOpen] = useState(true);

  // ⭐ SAFE DATA READ
  const resumeData = JSON.parse(
    localStorage.getItem("resumeAnalytics") || "{}"
  );

  const hasData = resumeData && Object.keys(resumeData).length > 0;

  /* ===== SKILL CHART ===== */
  const skillsChartData =
    resumeData.skills?.map((skill: string) => ({
      name: skill,
      value: 65 + Math.floor(Math.random() * 25),
    })) || [];

  /* ===== TIMELINE GRAPH ===== */
  const timelineData = [
    {
      name: "Week 1",
      applications: resumeData.jobsFound || 0,
      interviews: Math.floor((resumeData.jobsFound || 0) / 3),
    },
    {
      name: "Week 2",
      applications: (resumeData.jobsFound || 0) + 5,
      interviews: Math.floor((resumeData.jobsFound || 0) / 2),
    },
    {
      name: "Week 3",
      applications: (resumeData.jobsFound || 0) + 10,
      interviews: Math.floor((resumeData.jobsFound || 0) / 1.5),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      {/* ================= SIDEBAR ================= */}
      <aside
  className={`fixed top-0 left-0 h-screen
  bg-gradient-to-b from-indigo-700 to-purple-700 text-white
  ${open ? "w-64" : "w-16"}
  transition-all duration-300 flex flex-col z-50`}
>

        <div className="h-14 flex items-center justify-between px-4 border-b border-white/20">
          {open && <span className="font-extrabold text-lg">ResumeAI</span>}
          <button onClick={() => setOpen(!open)}>
            <Menu size={18} />
          </button>
        </div>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/20"
        >
          <ArrowLeft size={16} />
          {open && "Back to Landing"}
        </Link>

        <nav className="px-2 py-4 space-y-1 text-sm">
          <SideItem open={open} icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
          <SideItem open={open} icon={Upload} label="Resume Upload" to="/uploadresume" />
          <SideItem open={open} icon={Briefcase} label="Job Matching" to="/JobMatches" />
          <SideItem open={open} icon={Bot} label="AI Resume Builder"to="/airesumebuilder"/>

        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main
  className={`flex-1 p-6 transition-all duration-300
  ${open ? "ml-64" : "ml-16"}`}
>


        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Resume analysis overview
          </p>
        </div>

        {/* EMPTY STATE */}
        {!hasData && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500">
              Upload a resume to see analytics.
            </p>
          </div>
        )}

        {hasData && (
          <>
            {/* ================= KPI BOXES ================= */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <Kpi
                title="Resume Score"
                value={`${resumeData.resumeScore || 0}%`}
                color="from-indigo-500 to-purple-600"
                icon={FileText}
              />
              <Kpi
                title="ATS Match"
                value={`${resumeData.atsScore || 0}%`}
                color="from-blue-500 to-cyan-500"
                icon={ShieldCheck}
              />
              <Kpi
                title="Jobs Found"
                value={resumeData.jobsFound || 0}
                color="from-green-500 to-emerald-500"
                icon={Briefcase}
              />
              <Kpi
                title="Skills Detected"
                value={resumeData.skillsCount || 0}
                color="from-amber-500 to-orange-500"
                icon={Brain}
              />
            </div>

            {/* ================= PROFILE + SKILLS ================= */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {/* PROFILE CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-6 h-[360px]"
              >
                <h3 className="font-semibold mb-4">Candidate Profile</h3>

                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
                    <User size={32} className="text-indigo-600" />
                  </div>

                  <h4 className="mt-3 font-semibold text-lg">
                    {resumeData.name || "Candidate"}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {resumeData.jobTitle || "Not Specified"}
                  </p>
                </div>

                <div className="flex justify-center gap-10 mt-8">
                  <MiniCircle
                    label="Score"
                    value={`${resumeData.resumeScore || 0}%`}
                  />
                  <MiniCircle
                    label="ATS"
                    value={`${resumeData.atsScore || 0}%`}
                  />
                </div>
              </motion.div>

              {/* SKILL GRAPH */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-6 h-[360px]"
              >
                <h3 className="font-semibold mb-4">Skill Strength</h3>

                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={skillsChartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                
              </motion.div>
            </div>
            {/* ⭐ Resume Insights Section */}
<div className="mb-10">
  <ResumeInsights data={resumeData} />
</div>
            
            {/* ================= TIMELINE GRAPH ================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-6"
            >
              <h3 className="font-semibold mb-4">
                Application Progress
              </h3>

              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={timelineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#6366f1"
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="interviews"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
            <div className="mt-12 space-y-6">
  
</div>
            
          </>
        )}
      </main>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const SideItem = ({ icon: Icon, label, open, to }: any) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/20"
  >
    <Icon size={18} />
    {open && <span>{label}</span>}
  </Link>
);

const Kpi = ({ title, value, color, icon: Icon }: any) => (
  <motion.div
    whileHover={{ y: -6 }}
    className={`h-[110px] rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${color}`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
      <div className="bg-white/20 p-3 rounded-xl">
        <Icon size={22} />
      </div>
    </div>
  </motion.div>
);

const MiniCircle = ({ label, value }: any) => (
  <div className="text-center">
    <div className="w-16 h-16 rounded-full border-4 border-indigo-500 flex items-center justify-center font-bold text-indigo-600">
      {value}
    </div>
    <p className="text-xs mt-2 text-gray-500">{label}</p>
  </div>
);

export default Dashboard;
