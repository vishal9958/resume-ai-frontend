import { useState, useEffect } from "react";
import { Briefcase, Plus, Trash2 } from "lucide-react";

type Job = {
  id: number;
  role: string;
  skills: string[];
};

const Admin = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("resumeai_jobs") || "[]"
    );
    setJobs(saved);
  }, []);

  const addJob = () => {
    if (!role || !skills) {
      alert("Fill all fields");
      return;
    }

    const newJob: Job = {
      id: Date.now(),
      role,
      skills: skills.split(",").map((s) => s.trim().toLowerCase()),
    };

    const updated = [...jobs, newJob];
    setJobs(updated);
    localStorage.setItem("resumeai_jobs", JSON.stringify(updated));

    setRole("");
    setSkills("");
  };

  const deleteJob = (id: number) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    localStorage.setItem("resumeai_jobs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold">
          ResumeAI – Admin Panel
        </h1>
        <p className="text-sm text-gray-500">
          Manage job roles used for resume matching
        </p>
      </div>

      {/* ADD JOB */}
      <div className="bg-white rounded-xl shadow p-6 mb-10 max-w-xl">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} />
          Add Job Role
        </h2>

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Job Role (e.g. Frontend Developer)"
          className="w-full border rounded-md px-3 py-2 mb-3 text-sm"
        />

        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Required Skills (comma separated)"
          className="w-full border rounded-md px-3 py-2 mb-4 text-sm"
        />

        <button
          onClick={addJob}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Save Job
        </button>
      </div>

      {/* JOB LIST */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Briefcase size={18} />
          Job Templates
        </h2>

        {jobs.length === 0 && (
          <p className="text-sm text-gray-500">
            No job roles added yet.
          </p>
        )}

        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex justify-between items-start border rounded-lg p-4"
            >
              <div>
                <p className="font-semibold">
                  {job.role}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => deleteJob(job.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
