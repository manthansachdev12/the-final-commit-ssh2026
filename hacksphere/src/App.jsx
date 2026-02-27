import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import JudgeDashboard from "./pages/JudgeDashboard";

import Hackathons from "./pages/Hackathons";
import HackathonDetails from "./pages/HackathonDetails";

import Team from "./pages/Team";
import Submission from "./pages/Submission";
import IdentityForm from "./pages/IdentityForm";

import Leaderboard from "./pages/Leaderboard";

import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Pages */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/hackathon/:id" element={<HackathonDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/my" element={<MyApplications />} />

        {/* Role Based Pages */}

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/judge" element={<JudgeDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chatbot/>}/>
        <Route
 path="/identityform"
 element={<IdentityForm/>}
/>


      </Routes>
      

    </BrowserRouter>
  );
}

export default App;