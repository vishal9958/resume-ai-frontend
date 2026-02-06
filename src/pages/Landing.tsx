import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  FileSearch,
  Brain,
  Briefcase,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* ===== Dummy UI Data (backend later) ===== */
const resumeScoreData = [
  { name: "Mon", value: 45 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 62 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 82 },
];

const skillMatchData = [
  { name: "HTML", value: 80 },
  { name: "CSS", value: 72 },
  { name: "JavaScript", value: 65 },
  { name: "React", value: 60 },
];

const Landing = () => {

  /* HERO PARALLAX */
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);


  /* JOB PARALLAX ⭐ MISSING THA */
  const jobRef = useRef(null);

  const { scrollYProgress: jobScroll } = useScroll({
    target: jobRef,
    offset: ["start end", "end start"]
  });

  const jobScale = useTransform(jobScroll, [0, 1], [0.85, 1]);
  const jobOpacity = useTransform(jobScroll, [0, 1], [0.3, 1]);
  const jobY = useTransform(jobScroll, [0, 1], [120, 0]);

  /* ================= UNIQUE PARALLAX ================= */

const uniqueRef = useRef(null);

const { scrollYProgress: uniqueScroll } = useScroll({
  target: uniqueRef,
  offset: ["start end", "end start"]
});

const uniqueScale = useTransform(uniqueScroll, [0, 1], [0.9, 1]);
const uniqueOpacity = useTransform(uniqueScroll, [0, 1], [0.2, 1]);
const uniqueY = useTransform(uniqueScroll, [0, 1], [120, 0]);



/* ================= FEATURES PARALLAX ================= */

const featureRef = useRef(null);

const { scrollYProgress: featureScroll } = useScroll({
  target: featureRef,
  offset: ["start end", "end start"]
});

const featureScale = useTransform(featureScroll, [0, 1], [0.9, 1]);
const featureOpacity = useTransform(featureScroll, [0, 1], [0.2, 1]);
const featureY = useTransform(featureScroll, [0, 1], [120, 0]);



  return (
    <div className="bg-[#050816] text-white">

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >

        {/* Glow Background */}
        <div className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[180px] rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-indigo-600/30 blur-[180px] rounded-full bottom-[-200px] right-[-200px]" />


        {/* HERO CONTENT */}
        <motion.div
          style={{ scale, opacity, y }}
          className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"
        >

          {/* ===== LEFT CONTENT ===== */}
          <div>

            {/* BRAND */}
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/resumeAi.png"
                className="w-10 h-10"
              />
              <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ResumeAI
              </h2>
            </div>


            {/* BADGES */}
            <div className="flex flex-wrap gap-3 mb-8">

              <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs">
                🚀 Trusted by 5,000+ Students
              </span>

              <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-400/30 text-green-300 text-xs">
                ✅ ATS Optimized
              </span>

              <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs">
                🤖 AI Career Assistant
              </span>

            </div>


            {/* HEADING */}
            <h1 className="text-[52px] font-extrabold leading-tight">
              Turn Your Resume Into
              <br />

              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Job-Winning Profile
              </span>
            </h1>


            {/* SUBTITLE */}
            <p className="mt-6 text-gray-400 max-w-lg text-lg">
              Analyze ATS score, detect skill gaps and discover real job matches using AI-powered resume intelligence.
            </p>


            {/* BUTTONS */}
            <div className="mt-10 flex gap-4">

              <Link
                to="/uploadresume"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
              >
                Upload Resume
              </Link>

              <Link
                to="/dashboard"
                className="px-8 py-3 border border-white/20 rounded-xl hover:border-indigo-400 transition"
              >
                Dashboard
              </Link>

            </div>

          </div>



          {/* ===== RIGHT FLOATING UI ===== */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="
              bg-white/5
              backdrop-blur-2xl
              border border-white/10
              rounded-3xl
              p-6
              shadow-[0_0_40px_rgba(99,102,241,0.25)]
            "
          >

            <div className="grid grid-cols-3 gap-4 mb-5">
              <StatCard title="Resume Score" value="82%" />
              <StatCard title="ATS Match" value="Good" />
              <StatCard title="Jobs Found" value="24" />
            </div>


            {/* GRAPH */}
            <div className="h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resumeScoreData}>
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis hide />
                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                  />

                </LineChart>
              </ResponsiveContainer>
            </div>

          </motion.div>

        </motion.div>
      </section>


{/* ================= PREMIUM JOB MATCHING ================= */}
<section
  ref={jobRef}
  className="py-28 relative overflow-hidden bg-[#050816]"
>

  {/* Glow Background */}
  <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-[180px] rounded-full left-[-200px] top-[100px]" />
  <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[180px] rounded-full right-[-200px] bottom-[0px]" />


  <motion.div
    style={{ scale: jobScale, opacity: jobOpacity, y: jobY }}
    className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center"
  >

    {/* ===== LEFT CONTENT ===== */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >

      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
        Smart Job Matching
        <br />

        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Based on Your Resume
        </span>
      </h2>

      <p className="mt-6 text-gray-400 text-lg max-w-lg leading-relaxed">
        ResumeAI analyzes your resume using AI and predicts
        jobs where your hiring chances are highest.
      </p>

      <ul className="mt-10 space-y-5">

        <li className="flex items-center gap-3 text-gray-300">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
            ✔
          </span>
          Job wise match percentage
        </li>

        <li className="flex items-center gap-3 text-gray-300">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
            ✔
          </span>
          Required vs Missing Skills breakdown
        </li>

        <li className="flex items-center gap-3 text-gray-300">
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
            ✔
          </span>
          AI Job Recommendation Engine
        </li>

      </ul>

    </motion.div>



    {/* ===== RIGHT GRAPH GLASS CARD ===== */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{ y: -10 }}
      className="
        relative
        bg-white/5
        backdrop-blur-2xl
        border border-white/10
        rounded-3xl
        p-7
        shadow-[0_0_40px_rgba(99,102,241,0.25)]
      "
    >

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-30" />

      <h3 className="font-semibold text-white text-lg mb-6 relative">
        Skill Match Overview
      </h3>

      <div className="h-64 relative">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={skillMatchData}>

            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af" }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af" }}
            />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "white"
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              fill="url(#premiumGradient)"
            />

            <defs>
              <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

          </BarChart>
        </ResponsiveContainer>

      </div>

    </motion.div>

  </motion.div>
</section>



    {/* ================= PREMIUM WHY UNIQUE ================= */}
<section
  ref={uniqueRef}
  className="py-28 relative overflow-hidden bg-[#050816]"
>

  {/* Glow Background */}
  <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[180px] rounded-full left-[-200px] top-[50px]" />
  <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-[180px] rounded-full right-[-200px] bottom-[0px]" />

  <motion.div
    style={{ scale: uniqueScale, opacity: uniqueOpacity, y: uniqueY }}
    className="relative max-w-6xl mx-auto px-6 text-center"
  >

    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
      Why ResumeAI is Different?
    </h2>

    <div className="mt-20 grid md:grid-cols-3 gap-10">

      <PremiumUniqueCard
        title="Not Just Resume Upload"
        desc="We analyze, score and guide you to improve."
        icon={Sparkles}
      />

      <PremiumUniqueCard
        title="AI + Analytics"
        desc="Uses NLP & data insights, not keyword tricks."
        icon={Brain}
      />

      <PremiumUniqueCard
        title="End-to-End Platform"
        desc="Resume → Analysis → Jobs → Dashboard."
        icon={ShieldCheck}
      />

    </div>

  </motion.div>
</section>


  {/* ================= PREMIUM FEATURES ================= */}
<section
  ref={featureRef}
  className="py-28 relative overflow-hidden bg-[#050816]"
>

  {/* Glow */}
  <div className="absolute w-[450px] h-[450px] bg-indigo-600/20 blur-[160px] rounded-full left-[-150px] top-[120px]" />
  <div className="absolute w-[450px] h-[450px] bg-purple-600/20 blur-[160px] rounded-full right-[-150px] bottom-[0px]" />

  <motion.div
    style={{ scale: featureScale, opacity: featureOpacity, y: featureY }}
    className="relative max-w-7xl mx-auto px-6 text-center"
  >

    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
      Why Use ResumeAI?
    </h2>

    <div className="mt-20 grid md:grid-cols-4 gap-8">

      <PremiumFeature icon={FileSearch} title="ATS Analyzer" />
      <PremiumFeature icon={Brain} title="Skill Gap Finder" />
      <PremiumFeature icon={Briefcase} title="Job Matching AI" />
      <PremiumFeature icon={ShieldCheck} title="Admin & Analytics" />

    </div>

  </motion.div>
</section>


      {/* ================= FOOTER ================= */}
     <footer className="bg-[#0f172a] text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

    {/* BRAND */}
    <div>
        <div className="flex items-center gap-3 mb-6">

    <img
      src="/resumeAi.png"   // 👈 Apna logo public folder me daal
      alt="ResumeAI Logo"
      className="w-10 h-10 object-contain"
    />

    <h2 className="text-2xl font-black bg-gradient-to-r from-white 600 to-white 600 bg-clip-text text-transparent">
      ResumeAI
    </h2>

  </div>
      <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-sm">
        AI-powered resume analysis and job matching platform
        designed to help students and professionals get hired faster.
      </p>
    </div>

    {/* PRODUCT */}
    <div>
  <h4 className="text-white font-semibold mb-4">
    Navigation
  </h4>

  <ul className="space-y-2 text-sm">

    <li>
      <Link
        to="/dashboard"
        className="block hover:text-white transition cursor-pointer"
      >
        Dashboard
      </Link>
    </li>

    <li>
      <Link
        to="/uploadresume"
        className="hover:text-white transition cursor-pointer"
      >
        Resume Upload
      </Link>
    </li>

    <li>
      <Link
        to="/JobMatches"
        className="hover:text-white transition cursor-pointer"
      >
        Job Matching
      </Link>
    </li>

  </ul>
</div>

      
  

    {/* FOR WHO */}
    <div>
      <h4 className="text-white font-semibold mb-4">
        Made For
      </h4>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-white transition cursor-pointer">
          Students
        </li>
        <li className="hover:text-white transition cursor-pointer">
          Freshers
        </li>
        <li className="hover:text-white transition cursor-pointer">
          Job Seekers
        </li>
        <li className="hover:text-white transition cursor-pointer">
          Colleges
        </li>
      </ul>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
      <p>
        © {new Date().getFullYear()} ResumeAI. All rights reserved.
      </p>

      <div className="flex gap-6 mt-3 md:mt-0">
        <span className="hover:text-white cursor-pointer transition">
          Privacy
        </span>
        <span className="hover:text-white cursor-pointer transition">
          Terms
        </span>
        <span className="hover:text-white cursor-pointer transition">
          Support
        </span>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

/* ===== Reusable Components ===== */

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-2xl shadow p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-2xl font-extrabold text-indigo-600">
      {value}
    </p>
  </div>
);

const PremiumUniqueCard = ({ title, desc, icon: Icon }: any) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="
      relative
      bg-white/5
      backdrop-blur-2xl
      border border-white/10
      rounded-3xl
      p-8
      shadow-[0_0_40px_rgba(99,102,241,0.25)]
      transition
    "
  >

    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl opacity-30" />

    <div className="relative">

      <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-indigo-500/20 mb-6">
        <Icon className="text-indigo-400" size={28}/>
      </div>

      <h3 className="font-bold text-lg text-white">
        {title}
      </h3>

      <p className="mt-3 text-gray-400 text-sm">
        {desc}
      </p>

    </div>

  </motion.div>
);


const PremiumFeature = ({ icon: Icon, title }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="
      relative
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-6
      shadow-[0_0_30px_rgba(139,92,246,0.25)]
      transition
    "
  >

    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-xl opacity-20" />

    <div className="relative">

      <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-xl bg-purple-500/20 mb-4">
        <Icon className="text-purple-400"/>
      </div>

      <h3 className="font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        Enterprise grade analytics with AI intelligence.
      </p>

    </div>

  </motion.div>
);


export default Landing;
