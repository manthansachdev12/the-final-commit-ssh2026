import React from 'react';
import { 
  Terminal, Users, Trophy, ChevronRight, Zap, 
  Cpu, Globe, ArrowUpRight, Code2, Layers, 
  Settings, BarChart3, ShieldCheck, Rocket, 
  CheckCircle2, Globe2
} from 'lucide-react';
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-indigo-100">
      <Navbar />

      {/* --- 1. HERO: DUAL MISSION --- */}
      <header className="pt-40 pb-24 px-6 text-center bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-blue-50/50 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-[1000] leading-[0.9] tracking-tighter mb-8 text-slate-900 uppercase">
            Host. Compete. <br /> <span className="text-blue-600 italic underline decoration-blue-200">Innovate.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            The all-in-one infrastructure for national-scale hackathons. Whether you're 
            launching a corporate challenge or building the next big thing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl active:scale-95">
              BROWSE EVENTS
            </button>
            <button className="bg-white border-2 border-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
              START ORGANIZING
            </button>
          </div>
        </div>
      </header>

      {/* --- 2. THE DUAL PATHS (Bento Split) --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Candidate Path */}
        <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-200 group">
          <div className="h-14 w-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Code2 size={28} />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-4 italic uppercase">For Candidates</h2>
          <ul className="space-y-4 mb-10">
            <FeatureItem text="Verified Developer Profiles & Portfolios" />
            <FeatureItem text="AI-Powered Team Matching" />
            <FeatureItem text="Seamless GitHub & Project Submissions" />
            <FeatureItem text="National Leaderboard Participation" />
          </ul>
          <button className="w-full py-4 rounded-2xl bg-white border border-slate-200 font-bold text-sm hover:border-blue-500 transition-all flex items-center justify-center gap-2">
            Create Talent Profile <ArrowUpRight size={16}/>
          </button>
        </div>

        {/* Organizer Path */}
        <div className="p-10 rounded-[3rem] bg-blue-600 text-white shadow-2xl shadow-blue-200 group">
          <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-blue-600 transition-all">
            <Settings size={28} />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-4 italic uppercase">For Organizers</h2>
          <ul className="space-y-4 mb-10 opacity-90">
            <FeatureItem text="Customizable Round-based Workflows" />
            <FeatureItem text="Integrated Judging & Evaluation Tools" />
            <FeatureItem text="Automated Mailing & Notifications" />
            <FeatureItem text="Real-time Analytics Dashboard" />
          </ul>
          <button className="w-full py-4 rounded-2xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            Create Hackathon <ArrowUpRight size={16}/>
          </button>
        </div>

      </section>

      {/* --- 3. THE "ECOSYSTEM" (Visual Details) --- */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">The Ecosystem</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mt-4 uppercase italic leading-none">
                One Platform. <br /> Infinite Projects.
              </h2>
            </div>
            <p className="text-slate-400 font-medium max-w-xs mt-6 md:mt-0">
              Supporting the entire lifecycle of a hackathon, from planning to prize distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <DetailCard 
              icon={<ShieldCheck className="text-blue-600"/>} 
              title="Identity Sync" 
              desc="Single-sign-on for students across India, verified with academic credentials." 
            />
            <DetailCard 
              icon={<Globe2 className="text-emerald-500"/>} 
              title="National Reach" 
              desc="Connect with 500+ universities and thousands of specialized technical communities." 
            />
            <DetailCard 
              icon={<BarChart3 className="text-amber-500"/>} 
              title="Metric Engine" 
              desc="Track participant engagement, code quality, and project viability automatically." 
            />
          </div>
        </div>
      </section>

      {/* --- 4. STEP-BY-STEP (The "Long" Walkthrough) --- */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeader title="How the Platform Works" />
        
        <div className="mt-16 space-y-16">
          <Step 
            num="01" 
            title="Configure Your Arena" 
            desc="Organizers set dates, rounds, and judging criteria. Candidates build their technical stacks and join the ecosystem." 
          />
          <Step 
            num="02" 
            title="The Matching Phase" 
            desc="Our algorithms suggest teammates based on skill gaps. Organizers review pre-qualification tasks." 
          />
          <Step 
            num="03" 
            title="Execution & Judging" 
            desc="Live coding commences. Integrated project vaults collect submissions while judges use our proprietary evaluation matrix." 
          />
          <Step 
            num="04" 
            title="Legacy & Rewards" 
            desc="Winners are announced on the national leaderboard. Certificates and prize distributions are handled automatically." 
          />
        </div>
      </section>

      {/* --- 5. FINAL CTA --- */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#1e293b_0%,transparent_70%)] opacity-50"></div>
          <h2 className="text-4xl md:text-6xl font-[1000] tracking-tighter mb-8 relative z-10 uppercase italic">
            Empowering India's <br /> Technical Talent.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="bg-blue-600 px-10 py-4 rounded-2xl font-black uppercase text-sm hover:bg-white hover:text-black transition-all">Start Your Journey</button>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">
        HACKSPHERE INFRASTRUCTURE © 2026 • BUILT FOR INNOVATORS
      </footer>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function FeatureItem({ text }) {
  return (
    <li className="flex items-center gap-3 font-bold text-sm tracking-tight">
      <CheckCircle2 size={16} className="shrink-0" />
      {text}
    </li>
  );
}

function DetailCard({ icon, title, desc }) {
  return (
    <div className="group">
      <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-xl bg-slate-50 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-xl font-black mb-3 italic uppercase tracking-tighter">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-px flex-1 bg-slate-100"></div>
      <h2 className="text-sm font-black tracking-[0.3em] uppercase text-slate-400 whitespace-nowrap">{title}</h2>
      <div className="h-px flex-1 bg-slate-100"></div>
    </div>
  );
}

function Step({ num, title, desc }) {
  return (
    <div className="flex gap-10 group">
      <span className="text-6xl font-[1000] text-slate-100 group-hover:text-blue-600 transition-colors leading-none">{num}</span>
      <div>
        <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{title}</h4>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}