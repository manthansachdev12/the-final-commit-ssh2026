import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [hackathons, setHackathons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    mode: "Online",
    prize: "",
    deadline: "",
    startDate: "",
    endDate: "",
  });

  const [round, setRound] = useState("");
  const [rounds, setRounds] = useState([]);

  const loadHackathons = async () => {
    const res = await API.get("/hackathons/myhackathons");
    setHackathons(res.data);
  };

  useEffect(() => {
    loadHackathons();
  }, []);

  const createHackathon = async () => {
    setLoading(true);
    try {
      await API.post("/hackathons/create", form);
      setForm({ title: "", description: "", mode: "Online", prize: "", deadline: "", startDate: "", endDate: "" });
      loadHackathons();
      alert("Success! Hackathon is live.");
    } catch (err) {
      alert("Failed to create hackathon.");
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async (id) => {
    const res = await API.get(`/applications/${id}`);
    setApplications(res.data);
  };

  const addRound = () => {
    if (!round) return;
    setRounds([...rounds, round]);
    setRound("");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 p-6">
        {/* CONCISE HEADER */}
        <div className="mb-12 flex justify-between items-end border-b border-slate-100 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Organizer Console</h1>
            <p className="text-slate-500 text-sm mt-1">Deploy new challenges and evaluate submissions.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Live Events</p>
            <p className="text-4xl font-light text-blue-600 leading-none">{hackathons.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: MINIMALIST FORM */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Create New Event</h2>
              
              <div className="space-y-4">
                <SimpleInput label="Event Title" placeholder="e.g. National AI Challenge" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Description</label>
                  <textarea 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all h-28 resize-none"
                    placeholder="Describe the themes and rules..."
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <SimpleInput label="Prize Pool" placeholder="₹ Amount" value={form.prize} onChange={(e) => setForm({...form, prize: e.target.value})} />
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Mode</label>
                    <select 
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white transition-all cursor-pointer" 
                        onChange={(e) => setForm({...form, mode: e.target.value})}
                    >
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </div>
                </div>

                <SimpleInput type="date" label="Application Deadline" value={form.deadline} onChange={(e) => setForm({...form, deadline: e.target.value})} />
                
                <button 
                  onClick={createHackathon} 
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-[0.98]"
                >
                  {loading ? "Launching..." : "Launch Hackathon"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: CLEAN EVENT LIST */}
          <div className="lg:col-span-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 px-2">Manage Existing</h2>
            <div className="space-y-3">
              {hackathons.map((h) => (
                <div 
                  key={h._id} 
                  onClick={() => { setSelected(h); loadApplications(h._id); }}
                  className="group p-6 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors tracking-tight">{h.title}</h3>
                        <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-tighter">{h.mode}</span>
                    </div>
                    <p className="text-slate-400 text-xs">Deadline: {h.deadline?.slice(0,10)} • Prize: ₹{h.prize}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDE DRAWER (Management) */}
        {selected && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] transition-opacity" onClick={() => setSelected(null)}></div>
            <div className="relative bg-white w-full max-w-xl h-full shadow-2xl p-10 overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-100">
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-900 text-[10px] font-black uppercase tracking-widest mb-10 flex items-center gap-2 transition-all">
                <span className="text-lg">←</span> Back to Dashboard
              </button>
              
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{selected.title}</h2>
              <p className="text-slate-500 mt-3 mb-12 text-sm leading-relaxed">{selected.description}</p>

              <SectionHeader title="Event Workflow" />
              <div className="space-y-2 mb-10">
                {rounds.map((r, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl text-sm font-semibold border border-slate-100 flex gap-4 items-center">
                    <span className="text-blue-600 font-black">0{i+1}</span> {r}
                  </div>
                ))}
                <div className="flex gap-2 mt-4">
                  <input className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white transition-all" placeholder="New round name..." value={round} onChange={(e) => setRound(e.target.value)} />
                  <button onClick={addRound} className="bg-slate-900 text-white px-8 rounded-2xl text-xs font-bold hover:bg-blue-600 transition-all">Add</button>
                </div>
              </div>

              <SectionHeader title={`Review Submissions (${applications.length})`} />
              <div className="space-y-2">
                {applications.length === 0 ? (
                    <p className="text-center py-10 text-slate-400 text-sm italic">No applications received yet.</p>
                ) : (
                    applications.map((app) => (
                    <div 
                        key={app._id} 
                        onClick={() => setSelectedApp(app)}
                        className="p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer flex justify-between items-center group"
                    >
                        <span className="text-sm font-bold text-slate-700">Team: {app.teamId}</span>
                        <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Evaluate →</span>
                    </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* PROJECT EVALUATION MODAL */}
        {selectedApp && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-all" onClick={() => setSelectedApp(null)}></div>
            <div className="relative bg-white p-12 rounded-[3rem] w-full max-w-lg shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-200">
              
              <h2 className="text-2xl font-bold mb-1 tracking-tight">Submission Review</h2>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-10">Team ID: {selectedApp.teamId}</p>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Project Vision</h4>
                  <p className="text-sm leading-relaxed text-slate-700 italic">"{selectedApp.idea}"</p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Core Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.skills.split(',').map((skill, i) => (
                        <span key={i} className="text-xs font-bold bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">{skill.trim()}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Code Repository</h4>
                  {selectedApp.github ? (
                    <a href={selectedApp.github} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline font-bold flex items-center gap-2">
                      🔗 {selectedApp.github}
                    </a>
                  ) : (
                    <p className="text-slate-300 text-sm italic">Repository not linked</p>
                  )}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-50">
                <button 
                  onClick={() => setSelectedApp(null)} 
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SHARED COMPONENTS
function SimpleInput({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold uppercase text-slate-400 ml-1 tracking-wider">{label}</label>
      <input 
        {...props} 
        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/5 outline-none transition-all placeholder:text-slate-300"
      />
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">{title}</h3>
      <div className="h-px w-full bg-slate-50"></div>
    </div>
  );
}