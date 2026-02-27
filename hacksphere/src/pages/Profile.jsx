import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/identity/profile")
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-32 p-6 pb-20">
        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
          
          {/* Cover Accent */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="px-10 pb-10">
            {/* Avatar & Basic Info */}
            <div className="relative -mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="h-32 w-32 rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center text-5xl">
                  {profile.name?.charAt(0) || "U"}
                </div>
                <div className="pb-2">
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    {profile.name || "User Name"}
                  </h1>
                  <p className="text-blue-600 font-bold uppercase text-xs tracking-[0.2em] mt-1">
                    Verified {profile.role || "Candidate"}
                  </p>
                </div>
              </div>
              <button className="mb-2 px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              
              {/* LEFT COLUMN: ACADEMICS */}
              <section>
                <ProfileSectionTitle title="Academic Background" />
                <div className="space-y-6">
                  <ProfileItem label="Institution" value={profile.college} />
                  <div className="grid grid-cols-2 gap-4">
                    <ProfileItem label="Branch" value={profile.branch} />
                    <ProfileItem label="Current Year" value={profile.year} />
                  </div>
                  <ProfileItem label="Email Address" value={profile.email} />

<ProfileItem label="Contact" value={profile?.phone} />
                </div>
              </section>

              {/* RIGHT COLUMN: PROFESSIONAL */}
              <section>
                <ProfileSectionTitle title="Digital Presence" />
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tech Stack</label>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills ? profile.skills.split(',').map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                          {skill.trim()}
                        </span>
                      )) : <span className="text-slate-400 text-sm italic">No skills listed</span>}
                    </div>
                  </div>

                  <div className="pt-2 space-y-4">
                    <SocialLink label="GitHub" value={profile.github} />
                    <SocialLink label="LinkedIn" value={profile.linkedin} />
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// HELPER COMPONENTS
function ProfileSectionTitle({ title }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">{title}</h3>
      <div className="h-px w-full bg-slate-100"></div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter mb-1">{label}</p>
      <p className="text-slate-900 font-bold">{value || "Not set"}</p>
    </div>
  );
}

function SocialLink({ label, value }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      {value ? (
        <a href={value} target="_blank" rel="noreferrer" className="text-blue-600 text-xs font-black hover:underline">VIEW PROFILE →</a>
      ) : (
        <span className="text-slate-300 text-xs italic">Not linked</span>
      )}
    </div>
  );
}