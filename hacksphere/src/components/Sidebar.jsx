import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-200 p-4">

      <h2 className="font-bold mb-4">Menu</h2>

      <div className="flex flex-col gap-3">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/hackathons">Hackathons</Link>

        <Link to="/team">Team</Link>

        <Link to="/submission">Submission</Link>

        <Link to="/leaderboard">Leaderboard</Link>

      </div>

    </div>
  );
}