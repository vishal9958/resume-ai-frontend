import ChatBotPanel from "../components/ChatBotPanel";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AiResumeBuilder = () => {

  const resumeData = JSON.parse(
    localStorage.getItem("resumeAnalytics") || "{}"
  );

  return (

    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* ================= PREMIUM HEADER ================= */}

      <header className="h-16 backdrop-blur-lg bg-white/70 border-b shadow-sm flex items-center justify-between px-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft size={18}/>
            Dashboard
          </Link>

          <div className="h-5 w-px bg-gray-300"/>

          <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
            <Sparkles className="text-indigo-600"/>
            AI Resume Builder
          </div>

        </div>


        {/* RIGHT */}
        <div className="text-xs text-gray-400">
          Premium AI Editor
        </div>

      </header>



      {/* ================= MAIN SPLIT LAYOUT ================= */}

      <div className="flex flex-1 overflow-hidden">

        {/* ================= CHAT PANEL ================= */}

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-[34%] min-w-[320px] border-r bg-white/80 backdrop-blur-xl shadow-xl flex flex-col"
        >
          <ChatBotPanel resumeData={resumeData}/>
        </motion.div>



        {/* ================= PREVIEW PANEL ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-y-auto p-10"
        >
          <ResumePreview resumeData={resumeData}/>
        </motion.div>

      </div>

    </div>
  );
};

export default AiResumeBuilder;
