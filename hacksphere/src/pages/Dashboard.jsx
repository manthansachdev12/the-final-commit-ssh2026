import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar"; // Assuming you want the nav here too

export default function Dashboard() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/hackathons")
      .then((res) => {
        setHackathons(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const applyHackathon = async (id) => {
    try {
      await API.post("/hackathons/apply/" + id);
      alert("Applied Successfully! Check your email for next steps.");
    } catch (err) {
      alert("Application failed. You might have already applied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Candidate <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Explore and apply for the most prestigious hackathons in India.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-sm font-bold text-slate-400 ml-2">Status:</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider">
              Active
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-200 animate-pulse rounded-[2.5rem]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathons.map((h) => (
              <div
                key={h._id}
                className="group bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-blue-500 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <span className="text-blue-600 group-hover:text-white text-xl">🚀</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-slate-100 rounded-full text-slate-500">
                      Open
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {h.title}
                  </h2>
                  
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {h.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 py-4 border-t border-slate-50">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400 italic">
                      +120 applicants
                    </span>
                  </div>

                  <button
                    onClick={() => applyHackathon(h._id)}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-blue-600 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && hackathons.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No hackathons available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}