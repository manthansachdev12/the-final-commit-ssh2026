import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/applications/my")
      .then((res) => {
        setApps(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <div className="max-w-5xl mx-auto pt-32 p-6">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My <span className="text-blue-600">Participations</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Track your application status and team details for active hackathons.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="h-40 bg-slate-100 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        ) : apps.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">You haven't applied to any hackathons yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {apps.map((a) => (
              <div
                key={a._id}
                className="group bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      Active Application
                    </span>
                    <span className="text-slate-300 text-xs font-medium">ID: {a._id.slice(-6).toUpperCase()}</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {a.hackathon?.title || "National Hackathon"}
                  </h2>
                  
                  <div className="mt-4 flex flex-wrap gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Team Name / ID</p>
                      <p className="text-sm font-bold text-slate-700">{a.teamName || a.teamId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Your Role</p>
                      <p className="text-sm font-bold text-slate-700">Team Leader</p>
                    </div>
                  </div>
                </div>

                {/* STATUS TRACKER UI */}
                <div className="w-full md:w-auto flex flex-col items-end gap-4">
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-2">Current Phase</p>
                    <div className="flex items-center gap-2">
                       <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                       <span className="text-sm font-black text-slate-900 uppercase italic">Applied & Under Review</span>
                    </div>
                  </div>
                  
                  <button className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100">
                    View Submission
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}