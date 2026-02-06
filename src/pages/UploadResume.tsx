import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Upload, Clipboard, Cloud, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// 🔥 REAL LOGIC IMPORTS
import { extractSkills } from "../utils/skillExtractor";
import { calculateResumeScore } from "../utils/resumeScore";
import { calculateATSScore } from "../utils/atsScore";

type Mode = "file" | "text" | "drive";

const UploadResume = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("file");
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const handleUpload = async () => {

  if (!file) {
    alert("Upload resume first");
    return;
  }

  try {
    console.log("📤 Sending PDF to backend...");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobTitle", jobTitle);

    const res = await fetch("http://localhost:5000/upload-resume", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    console.log("📥 Backend response:", data);

    // ❌ ERROR CASE
    if (!data || data.error) {
      alert("Resume text not extracted properly");
      return;
    }

    // ✅ SAVE TO LOCAL STORAGE
    localStorage.setItem("resumeAnalytics", JSON.stringify(data));

    // ✅ GO TO DASHBOARD
    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert("Upload failed");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 to-cyan-300 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden"
      >

        {/* TOP BAR */}
        <div className="px-10 pt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        {/* STEPS */}
        <div className="px-10 pt-4 text-sm text-gray-400 flex gap-6">
          <span className="text-indigo-600 font-semibold">1. Add Resume</span>
          <span>2. Analyze</span>
          <span>3. Match Jobs</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 px-10 py-8">

          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Add Your Resume</h2>
            <p className="text-sm text-gray-500 mb-6">
              Upload your resume to analyze it with AI
            </p>

            {/* JOB TITLE */}
            <div className="mb-5">
              <label className="text-sm font-semibold block mb-1">
                Desired Job Title
              </label>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* UPLOAD OPTIONS */}
            <div className="mb-5">
              <p className="text-sm font-semibold mb-2">Upload Options</p>

              <label
                onClick={() => setMode("file")}
                className={`flex items-center gap-3 text-sm border rounded-md px-3 py-2 mb-2 cursor-pointer
                ${mode === "file" ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"}`}
              >
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                  }
                />
                <Upload size={16} />
                Upload Resume
              </label>

              <div
                onClick={() => setMode("text")}
                className={`flex items-center gap-3 text-sm border rounded-md px-3 py-2 mb-2 cursor-pointer
                ${mode === "text" ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"}`}
              >
                <Clipboard size={16} />
                Copy and Paste Resume
              </div>

              <div
                onClick={() => setMode("drive")}
                className={`flex items-center gap-3 text-sm border rounded-md px-3 py-2 mb-2 cursor-pointer
                ${mode === "drive" ? "border-indigo-500 bg-indigo-50" : "hover:bg-gray-50"}`}
              >
                <Cloud size={16} />
                Add from Google Drive
              </div>
            </div>

            {mode === "text" && (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your full resume text here..."
                className="w-full h-40 border rounded-md p-3 text-sm mb-4"
              />
            )}

            {mode === "drive" && (
              <input
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="Paste Google Drive resume link"
                className="w-full border rounded-md px-3 py-2 text-sm mb-4"
              />
            )}

            <button
              onClick={handleUpload}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
            >
              Analyze Resume
            </button>

            {file && mode === "file" && (
              <p className="text-xs text-green-600 mt-3">
                ✅ {file.name} selected
              </p>
            )}
          </div>

          {/* RIGHT PREVIEW */}
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
            <h3 className="text-sm font-semibold mb-2">Resume Preview</h3>

            {mode === "file" && !file && (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-400 border rounded-md">
                Upload a resume to preview it here
              </div>
            )}

            {mode === "file" && file && file.type === "application/pdf" && (
              <iframe
                src={URL.createObjectURL(file)}
                title="Resume Preview"
                className="flex-1 w-full border rounded-md"
              />
            )}

            {mode === "text" && (
              <div className="flex-1 border rounded-md p-3 text-sm overflow-y-auto bg-white">
                {resumeText || "Paste resume text to preview it here"}
              </div>
            )}

            {mode === "drive" && (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-500 border rounded-md">
                Google Drive resume link added
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default UploadResume;
