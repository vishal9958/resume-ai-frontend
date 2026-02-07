import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Sparkles } from "lucide-react";

const ResumeInsights = ({ data }: any) => {


  // ⭐ SAFE DATA READ
  const weaknesses = data?.weaknesses || [];
  const skillGap = data?.skillGap || [];
  const suggestions = data?.suggestions || [];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-8">

      {/* ================= WEAKNESS CARD ================= */}
      <motion.div
        whileHover={{ y: -6 }}
        className="p-6 rounded-3xl shadow-xl backdrop-blur-lg
        bg-white/80 border border-red-200 transition"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-xl">
            <AlertTriangle className="text-red-600" />
          </div>

          <h3 className="font-bold text-lg">Resume Weakness</h3>
        </div>

        <ul className="space-y-2 text-sm">
          {weaknesses.length ? (
            weaknesses.map((w:string, i:number) => (
              <li key={i} className="flex gap-2 text-red-600">
                ❌ {w}
              </li>
            ))
          ) : (
            <p className="text-gray-400">
              No major weaknesses 🎉
            </p>
          )}
        </ul>
      </motion.div>


      {/* ================= SKILL GAP CARD ================= */}
      <motion.div
        whileHover={{ y: -6 }}
        className="p-6 rounded-3xl shadow-xl backdrop-blur-lg
        bg-white/80 border border-amber-200 transition"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-xl">
            <TrendingUp className="text-amber-600" />
          </div>

          <h3 className="font-bold text-lg">Missing Skills</h3>
        </div>

        <ul className="space-y-2 text-sm">
          {skillGap.length ? (
            skillGap.map((s:string, i:number) => (
              <li key={i} className="flex gap-2 text-amber-600">
                ⚠ {s}
              </li>
            ))
          ) : (
            <p className="text-gray-400">
              Skills look strong 💪
            </p>
          )}
        </ul>
      </motion.div>


      {/* ================= AI SUGGESTIONS CARD ================= */}
      <motion.div
        whileHover={{ y: -6 }}
        className="p-6 rounded-3xl shadow-xl backdrop-blur-lg
        bg-white/80 border border-green-200 transition"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-xl">
            <Sparkles className="text-green-600" />
          </div>

          <h3 className="font-bold text-lg">AI Suggestions</h3>
        </div>

        <ul className="space-y-2 text-sm">
          {suggestions.length ? (
            suggestions.map((s:string, i:number) => (
              <li key={i} className="flex gap-2 text-green-600">
                ✅ {s}
              </li>
            ))
          ) : (
            <p className="text-gray-400">
              Your resume looks polished ✨
            </p>
          )}
        </ul>
      </motion.div>

    </div>
  );
};

export default ResumeInsights;
