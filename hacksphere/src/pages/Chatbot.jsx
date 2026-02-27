import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { Send, Bot, User, Sparkles, Command } from "lucide-react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const send = async () => {
    if (!message.trim()) return;
    const userText = message;
    setMessage("");

    setChat((prev) => [...prev, { sender: "user", text: userText }]);

    try {
      setLoading(true);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userText }] }],
          }),
        }
      );

      const data = await response.json();
      const reply = data.candidates[0].content.parts[0].text;

      setChat((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      setChat((prev) => [...prev, { sender: "bot", text: "Neural Link Failure: API Error" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100">
      <Navbar />

      {/* Main Container with the "Massive Shift" logic for the Navbar */}
      <div className="max-w-5xl mx-auto pt-40 p-6 md:p-10 flex flex-col h-[calc(100vh-40px)]" style={{ paddingTop: '100px' }}>
        
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-[1000] tracking-tighter uppercase italic text-slate-900 leading-none">
              Neural <span className="text-blue-600">Assistant</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 text-sm uppercase tracking-widest italic opacity-70">
              Direct Link to HackSphere Intelligence
            </p>
          </div>
          <div className="bg-slate-900 px-4 py-2 rounded-xl flex items-center gap-3 shadow-xl shadow-slate-200">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">System Active</span>
          </div>
        </div>

        {/* CHAT INTERFACE */}
        <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-[3rem] shadow-2xl overflow-hidden relative border-b-8 border-b-slate-900">
          
          {/* Chat History Container */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50 scrollbar-hide"
          >
            {chat.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
                <Command size={64} className="text-slate-900" />
                <p className="font-black uppercase tracking-[0.4em] text-xs italic">Awaiting System Query...</p>
              </div>
            )}

            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex w-full ${c.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${c.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar Icon */}
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                    c.sender === "user" ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
                  }`}>
                    {c.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm ${
                    c.sender === "user" 
                    ? "bg-slate-900 text-white rounded-tr-none" 
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                  }`}>
                    {c.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex gap-4 items-center bg-blue-50 text-blue-600 px-6 py-3 rounded-full border border-blue-100 shadow-sm">
                  <Sparkles size={16} className="animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Synthesizing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="max-w-4xl mx-auto flex gap-3 p-2 bg-slate-50 border border-slate-200 rounded-[2.2rem] focus-within:border-blue-500 focus-within:ring-8 focus-within:ring-blue-500/5 transition-all">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Query the infrastructure (e.g. How do I join a team?)"
                className="flex-1 bg-transparent px-6 py-2 outline-none font-bold text-sm text-slate-700 placeholder:text-slate-300 placeholder:italic"
              />
              <button
                onClick={send}
                disabled={loading}
                className="bg-slate-900 text-white h-12 w-12 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 disabled:opacity-50 shadow-xl"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4 opacity-50">
              National AI Gateway • v2.5 Flash Precision
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}