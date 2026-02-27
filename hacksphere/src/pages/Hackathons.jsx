import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { Calendar, Trophy, Users, MapPin, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export default function Hackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [apply, setApply] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    teamName: "",
    teamSize: 1,
    leaderName: "",
    leaderEmail: "",
    leaderPhone: "",
    college: "",
    idea: "",
    skills: "",
    github: "",
    linkedin: "",
    terms: false,
  });

  const [members, setMembers] = useState([{ name: "", email: "" }]);

  useEffect(() => {
    API.get("/hackathons").then((res) => setHackathons(res.data));
  }, []);

  const addMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const updateMember = (index, field, value) => {
    const copy = [...members];
    copy[index][field] = value;
    setMembers(copy);
  };

  const submitApplication = async () => {
    if (!form.terms) return alert("Please accept the terms and conditions.");
    setLoading(true);

    try {
      const res = await API.post(`/applications/apply/${selected._id}`, {
        ...form,
        members,
      });

      alert(`Applied Successfully!\n\nYour Team ID: ${res.data.teamId}`);
      setApply(false);
      setSelected(null);
    } catch (err) {
      alert("Error submitting application. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 md:p-10 pt-40" style={{ paddingTop: '140px' }}>
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold uppercase tracking-widest text-indigo-600 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            System Status: 24 Active Arenas
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-[ -0.04em] text-slate-950 leading-[0.9]">
            NATIONAL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">ARENAS.</span>
          </h1>
          <p className="mt-8 text-slate-500 max-w-xl text-lg font-medium leading-relaxed">
            Participate in high-stakes engineering challenges. Build solutions for national infrastructure and compete for major grants.
          </p>
        </header>

        {/* --- ENHANCED GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hackathons.map((h) => (
            <div
              key={h._id}
              onClick={() => setSelected(h)}
              className="group bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                    <Globe size={24} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tighter border border-emerald-100">
                    Registering
                  </div>
                </div>
                
                <h2 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase italic tracking-tighter leading-none mb-4">
                  {h.title}
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium mb-8">
                  {h.description}
                </p>

                {/* VISUAL METADATA BENTO SECTION */}
                <div className="grid grid-cols-2 gap-3 mb-8">

  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
    <Trophy size={14} className="text-amber-500 mb-2" />
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      Prize Pool
    </p>

    <p className="text-sm font-black text-slate-800 tracking-tight">
      ₹{h.prize || "Not set"}
    </p>

  </div>


  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">

    <Calendar size={14} className="text-indigo-500 mb-2" />

    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      Deadline
    </p>

    <p className="text-sm font-black text-slate-800 tracking-tight">

      {h.deadline
        ? new Date(h.deadline).toLocaleDateString()
        : "Not set"}

    </p>

  </div>

</div>
              </div>
              
              <div className="mt-auto p-8 pt-0 border-t border-slate-50 bg-slate-50/30">
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                      </div>
                    ))}
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                      +12
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- DETAILS MODAL (BLUR BACKGROUND) --- */}
        {selected && !apply && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setSelected(null)}></div>
            <div className="relative bg-white p-10 md:p-16 rounded-[3.5rem] w-full max-w-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300">
              <div className="flex gap-4 mb-10">
                <div className="p-4 bg-blue-50 rounded-3xl text-blue-600"><Globe size={32}/></div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600">Event Specification</span>
                  <h2 className="text-5xl font-black text-slate-950 tracking-tighter mt-1 uppercase italic leading-none">{selected.title}</h2>
                </div>
              </div>
              
              <p className="text-slate-500 leading-relaxed text-xl font-medium mb-12 border-l-4 border-blue-600 pl-8 italic">
                {selected.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-12 border-t border-slate-100">
                <button
                  onClick={() => setSelected(null)}
                  className="px-8 py-5 rounded-[2rem] bg-slate-100 text-slate-500 font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
                >
                  Terminate Request
                </button>
                <button
                  onClick={() => setApply(true)}
                  className="px-8 py-5 rounded-[2rem] bg-slate-950 text-white font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-600 shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 group"
                >
                  Execute Application <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- APPLICATION FLOW --- */}
        {apply && (
          <div className="fixed inset-0 z-[120] flex items-center justify-end">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setApply(false)}></div>
            <div className="relative bg-white w-full max-w-3xl h-full overflow-y-auto shadow-[-50px_0_100px_-20px_rgba(0,0,0,0.3)] animate-in slide-in-from-right duration-500 flex flex-col">
              
              <div className="sticky top-0 bg-white/80 backdrop-blur-xl px-12 py-10 border-b border-slate-100 flex justify-between items-center z-20">
                <div>
                  <h2 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">Project Submission</h2>
                  <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mt-2 flex items-center gap-2">
                    <ShieldCheck size={14}/> Verified Secure Gateway: {selected.title}
                  </p>
                </div>
                <button onClick={() => setApply(false)} className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">✕</button>
              </div>

              <div className="p-12 pb-32">
                <SectionHeader title="01. Administrative Core" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fleet / Team Name</label>
                    <Input placeholder="E.g. Alpha Protocol" onChange={e => setForm({...form, teamName: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Capacity</label>
                    <Input type="number" placeholder="Max 4" onChange={e => setForm({...form, teamSize: e.target.value})} />
                  </div>
                </div>

                <SectionHeader title="02. Command Node (Leader)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <Input placeholder="Legal Name" onChange={e => setForm({...form, leaderName: e.target.value})} />
                  <Input placeholder="Professional Email" onChange={e => setForm({...form, leaderEmail: e.target.value})} />
                  <Input placeholder="Contact String (Phone)" onChange={e => setForm({...form, leaderPhone: e.target.value})} />
                  <Input placeholder="Academic Institution" onChange={e => setForm({...form, college: e.target.value})} />
                </div>

                <SectionHeader title="03. Resource Nodes (Members)" />
                <div className="space-y-4 mb-6">
                  {members.map((m, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-200/60 animate-in slide-in-from-bottom-2">
                      <Input className="bg-white" placeholder="Member Alias" onChange={e => updateMember(i, "name", e.target.value)} />
                      <Input className="bg-white" placeholder="Registry Email" onChange={e => updateMember(i, "email", e.target.value)} />
                    </div>
                  ))}
                </div>
                <button onClick={addMember} className="mb-14 text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:bg-indigo-50 px-6 py-3 rounded-full border border-indigo-100 transition-all">+ Add New Member Slot</button>

                <SectionHeader title="04. Strategic Objective" />
                <div className="space-y-6">
                  <textarea
                    placeholder="Describe the technical problem and your proposed architecture..."
                    className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-slate-200 mb-2 h-48 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all font-medium text-lg leading-relaxed shadow-inner"
                    onChange={e => setForm({...form, idea: e.target.value})}
                  />
                  
                  <Input
                     placeholder="Tech Stack (e.g., Solidity, Next.js, PyTorch)"
                     onChange={e => setForm({...form, skills: e.target.value})}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Input placeholder="Source Control (GitHub)" onChange={e => setForm({...form, github: e.target.value})} />
                    <Input placeholder="Professional Sync (LinkedIn)" onChange={e => setForm({...form, linkedin: e.target.value})} />
                  </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-indigo-950 text-indigo-100 mb-12 shadow-2xl relative overflow-hidden">
                   <ShieldCheck className="absolute -right-4 -bottom-4 text-white/5 h-32 w-32" />
                   <div className="flex items-start gap-5 relative z-10">
                      <input type="checkbox" className="mt-1 h-6 w-6 rounded-lg border-white/20 bg-white/10 text-blue-600 accent-blue-500" onChange={e => setForm({...form, terms: e.target.checked})} />
                      <p className="text-sm font-medium leading-relaxed">
                        By submitting, you authorize that your team's code and assets are original and you agree to the National Code of Ethics for Digital Competition.
                      </p>
                   </div>
                </div>

                <div className="flex gap-6 pb-20">
                  <button onClick={() => setApply(false)} className="flex-1 py-6 font-black uppercase text-xs tracking-widest text-slate-400 bg-slate-100 rounded-3xl hover:bg-slate-200 transition-all">Abort</button>
                  <button 
                    onClick={submitApplication} 
                    disabled={loading}
                    className="flex-[2] py-6 font-black uppercase text-xs tracking-widest text-white bg-blue-600 rounded-3xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-95"
                  >
                    {loading ? "Transmitting Data..." : "Finalize Application"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Internal Styled Helpers
function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400 whitespace-nowrap italic">{title}</h3>
      <div className="h-px w-full bg-slate-200/60"></div>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className={`px-8 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-200 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-300 font-bold text-sm shadow-sm ${props.className}`}
    />
  );
}