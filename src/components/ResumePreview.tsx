import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const ResumePreview = ({ resumeData }: any) => {

  const [resume, setResume] = useState(resumeData);

  /* ================= SYNC WITH BOT ================= */

  useEffect(() => {

    const syncResume = () => {

      const edited = JSON.parse(
        localStorage.getItem("editedResume") || "null"
      );

      if (edited) {
        setResume(edited);
      }

    };

    syncResume();

    window.addEventListener("storage", syncResume);

    return () =>
      window.removeEventListener("storage", syncResume);

  }, [resumeData]);


  /* ================= PDF DOWNLOAD ================= */

  const downloadPDF = async () => {

    const element = document.getElementById("resume-preview");

    if (!element) return;

    const canvas = await html2canvas(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

    pdf.save(`${resume.name || "Resume"}.pdf`);
  };



  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">

      {/* ================= TOP BAR ================= */}

      <div className="flex justify-between items-center mb-4">

        <h2 className="font-bold text-lg">
          Live Resume Preview
        </h2>

        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          <Download size={16}/>
          Download PDF
        </button>

      </div>


      {/* ================= RESUME CARD ================= */}

      <motion.div
        id="resume-preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto bg-white shadow-2xl rounded-xl p-8"
      >

        {/* NAME */}
        <h1 className="text-3xl font-bold">
          {resume?.name || "Your Name"}
        </h1>

        <p className="text-indigo-600 font-medium mb-4">
          {resume?.jobTitle || "Job Title"}
        </p>



        {/* SUMMARY */}
        <Section title="Professional Summary">
          {resume?.summary || "Add professional summary"}
        </Section>



        {/* SKILLS */}
        <Section title="Skills">

          <div className="flex flex-wrap gap-2">

            {resume?.skills?.length ? (
              resume.skills.map((s:string,i:number)=>(
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm"
                >
                  {s}
                </span>
              ))
            ) : (
              <p>Add skills...</p>
            )}

          </div>

        </Section>



        {/* PROJECTS */}
        <Section title="Projects">

          {resume?.projects?.length ? (
            resume.projects.map((p:any,i:number)=>(
              <p key={i}>• {p}</p>
            ))
          ) : (
            <p>Add projects...</p>
          )}

        </Section>



        {/* EXPERIENCE */}
        <Section title="Experience">

          {resume?.experience?.length ? (
            resume.experience.map((e:any,i:number)=>(
              <p key={i}>• {e}</p>
            ))
          ) : (
            <p>Add experience...</p>
          )}

        </Section>

      </motion.div>
    </div>
  );
};



/* ================= SECTION COMPONENT ================= */

const Section = ({ title, children }: any) => (

  <div className="mb-6">

    <h3 className="font-semibold border-b pb-1 mb-2 text-gray-800">
      {title}
    </h3>

    {children}

  </div>
);

export default ResumePreview;
