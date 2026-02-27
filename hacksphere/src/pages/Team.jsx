import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  searchUsers,
  sendInvite,
  getInvites,
  acceptInvite,
  rejectInvite
} from "../services/api";

export default function Team() {
  const [skills, setSkills] = useState("");
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!skills.trim()) return;
    setLoading(true);
    try {
      const res = await searchUsers(skills);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadInvites = async () => {
    try {
      const res = await getInvites();
      setInvites(res.data);
    } catch (err) {
      console.error("Failed to load invites");
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100">
      <Navbar />

      {/* FORCE SHIFT USING INLINE STYLE:
          We use style={{ paddingTop: '350px' }} to ensure the browser 
          ignores any Tailwind conflicts and pushes the content down.
      */}
      <div 
        className="max-w-7xl mx-auto px-6 md:px-10 relative z-10" 
        style={{ paddingTop: '100px' }} 
      >
        
        {/* HEADER SECTION */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase italic text-slate-900 leading-[0.85]">
              Team <br />
              <span className="text-blue-600">Formation</span>
            </h1>
            <p className="text-slate-500 font-medium mt-8 max-w-lg leading-relaxed text-lg">
              Assemble your elite unit. Discovery pipelines are active for national project nodes.
            </p>
          </div>
          
          <div className="bg-blue-50 px-6 py-4 rounded-3xl border border-blue-100 flex items-center gap-4 shadow-xl shadow-blue-100/20">
             <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
             </span>
             <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-700">Sync Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* DISCOVERY SECTION */}
          <div className="lg:col-span-7">
            <div className="mb-12 group">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 ml-2 italic">Search Query Input</h3>
              <div className="flex gap-3 p-3 bg-white border-2 border-slate-100 rounded-[2.5rem] focus-within:border-blue-500 focus-within:ring-8 focus-within:ring-blue-500/5 transition-all shadow-2xl shadow-slate-200/50">
                <input
                  placeholder="Query skills (e.g. Next.js, Go, PyTorch)"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent px-6 py-2 outline-none font-bold text-sm text-slate-700 placeholder:text-slate-300 placeholder:italic"
                />
                <button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-slate-900 text-white px-12 py-4 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50 shadow-2xl shadow-blue-900/20"
                >
                  {loading ? "Discovering..." : "Execute Search"}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {users.length === 0 && !loading && (
                <div className="py-32 text-center border-4 border-dashed border-slate-50 rounded-[4rem] bg-slate-50/10">
                  <div className="text-6xl mb-6 opacity-5 italic font-black text-slate-900 select-none tracking-tighter">NULL_DATA</div>
                  <p className="text-slate-300 font-black italic tracking-widest uppercase text-[10px]">Awaiting Signal Input...</p>
                </div>
              )}
              
              {users.map((u) => (
                <div key={u._id} className="group flex items-center justify-between p-8 bg-white border border-slate-200 rounded-[3rem] hover:border-blue-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500">
                  <div className="flex items-center gap-8">
                    <div className="h-20 w-20 rounded-[2rem] bg-slate-50 border-2 border-white shadow-inner flex items-center justify-center text-3xl font-black text-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-[1000] text-2xl text-slate-900 leading-none mb-2 uppercase tracking-tighter italic">{u.name}</h4>
                      <p className="text-xs text-slate-400 font-bold mb-5 tracking-wide">{u.email}</p>
                      <div className="flex flex-wrap gap-2">
                        {u.skills?.map(s => (
                          <span key={s} className="text-[10px] font-black px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl uppercase tracking-tighter text-slate-500 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => sendInvite(u._id)}
                    className="bg-white text-slate-900 border-4 border-slate-900 px-10 py-4 rounded-[1.5rem] font-black uppercase text-[11px] tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                  >
                    Invite
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* REQUESTS SECTION */}
          <div className="lg:col-span-5">
            <div 
              className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 sticky shadow-2xl"
              style={{ top: '150px' }} // Adjusted sticky top to handle the shift
            >
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-400 mb-12 flex items-center gap-4 italic">
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]"></span>
                Inbound Node Requests ({invites.length})
              </h3>

              <div className="space-y-6">
                {invites.length === 0 && (
                  <div className="text-center py-20 opacity-20">
                    <p className="text-white text-[11px] font-black uppercase tracking-[0.4em] italic leading-relaxed">No Pending <br/> Transmissions</p>
                  </div>
                )}
                
                {invites.map((i) => (
                  <div key={i._id} className="bg-white/5 border border-white/10 p-8 rounded-[3rem] backdrop-blur-xl hover:bg-white/10 transition-all group">
                    <div className="mb-6">
                      <h4 className="font-black text-white uppercase italic tracking-tighter text-2xl group-hover:text-blue-400 transition-colors">{i.senderId.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] mt-1">{i.senderId.email}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {i.senderId.skills?.map(s => (
                        <span key={s} className="text-[9px] font-black text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg uppercase border border-blue-500/20">{s}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={async () => {

 await acceptInvite(i._id);

 loadInvites();

 alert("Team Joined");

}}
                        className="bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-blue-600 transition-all active:scale-95 shadow-xl shadow-blue-900/40"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => rejectInvite(i._id)}
                        className="bg-transparent border-2 border-white/10 text-slate-400 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-red-500 hover:text-red-500 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}