import { useEffect, useState, useRef } from "react";
import { Bot, Send, User } from "lucide-react";
import { motion } from "framer-motion";
import API from "../config/api";

const ChatBotPanel = ({ resumeData }: any) => {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [resume, setResume] = useState(resumeData);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);



  /* ================= AUTO INTRO MESSAGE ================= */

  useEffect(() => {

    const introMessage = {
      role: "bot",
      text: `Hi 👋 I analyzed your resume.

❌ Weakness:
${resumeData?.weaknesses?.join(", ") || "None"}

⚠ Missing Skills:
${resumeData?.skillGap?.join(", ") || "None"}

✅ Suggestions:
${resumeData?.suggestions?.join(", ") || "None"}

Do you want me to improve your resume?`
    };

    setMessages([introMessage]);

  }, []);



  /* ================= AUTO SCROLL ================= */

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);



  /* ================= SEND MESSAGE ================= */

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    setLoading(true);

    try {

      const res = await fetch(`${API}/ai-resume-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input,
          resume: resume
        })
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data.reply || "AI did not respond"
      };

      setMessages(prev => [...prev, botMsg]);

      if (data.resume) {
        setResume(data.resume);
        localStorage.setItem("editedResume", JSON.stringify(data.resume));
window.dispatchEvent(new Event("storage"));

      }

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "⚠ Server connection failed. Check backend."
        }
      ]);

    }

    setLoading(false);
    setInput("");
  };



  /* ================= ENTER SEND ================= */

  const handleKey = (e: any) => {
    if (e.key === "Enter") sendMessage();
  };



  return (
    <div className="flex flex-col h-full bg-white">

      {/* ================= HEADER ================= */}

      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center gap-2 shadow">
        <Bot size={18}/>
        AI Resume Coach
      </div>



      {/* ================= CHAT AREA ================= */}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg, i) => (

          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >

            <div className={`flex gap-2 max-w-[80%]`}>

              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Bot size={16}/>
                </div>
              )}

              <div
                className={`p-3 rounded-xl text-sm shadow
                ${msg.role === "bot"
                  ? "bg-indigo-50 text-gray-800"
                  : "bg-indigo-600 text-white"
                }`}
              >

                {msg.text.split("\n").map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}

              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User size={16}/>
                </div>
              )}

            </div>

          </motion.div>
        ))}



        {/* ================= LOADING BUBBLE ================= */}

        {loading && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Bot size={16}/>
            </div>

            <div className="bg-indigo-50 px-4 py-2 rounded-xl text-sm animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={scrollRef}/>

      </div>



      {/* ================= INPUT ================= */}

      <div className="p-4 border-t flex gap-2 bg-white">

        <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask AI to improve resume..."
          className="flex-1 border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-xl flex items-center justify-center"
        >
          <Send size={18}/>
        </button>

      </div>

    </div>
  );
};

export default ChatBotPanel;
