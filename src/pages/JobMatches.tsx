import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import API from "../config/api";

const JobMatches = () => {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    const resumeData = JSON.parse(
      localStorage.getItem("resumeAnalytics") || "{}"
    );

    fetch(`${API}/match-jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skills: resumeData.skills,
        jobTitle: resumeData.jobTitle
      })
    })
      .then(res => res.json())
      .then(data => setJobs(data));

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">

      {/* ===== BACK BUTTON ===== */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-3xl font-extrabold mb-8">
        🎯 Job Matches For You
      </h1>

      {/* ===== JOB GRID ===== */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {jobs.map((job, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            className="bg-white/70 backdrop-blur-xl border border-white/40 
            p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          >

            <h2 className="font-bold text-lg mb-1">
              {job.title}
            </h2>

            <p className="text-indigo-600 font-semibold">
              {job.company}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              📍 {job.location}
            </p>

            {/* MATCH BAR */}
            <div className="mt-4">
              <p className="text-sm font-semibold mb-1">
                Match Score
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                  style={{ width: `${job.match}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {job.match}% Match
              </p>
            </div>

            {/* APPLY BUTTON */}
            <a
              href={job.url}
              target="_blank"
              className="inline-block mt-5 w-full text-center 
              bg-indigo-600 text-white py-2 rounded-lg font-semibold
              hover:bg-indigo-700 transition"
            >
              Apply Now
            </a>

          </motion.div>

        ))}

      </div>

    </div>
  );
};

export default JobMatches;
