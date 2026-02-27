import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 flex items-center justify-center ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl italic">H</span>
          </div>
          <span className="font-black text-xl tracking-tight text-slate-900 uppercase italic">
            HACK<span className="text-blue-600">SPHERE</span>
          </span>
        </Link>

        {/* Navigation Links - Centered desktop */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" label="Home" active={isActive("/")} />

          {role === "candidate" && (
            <>
              <NavLink
                to="/hackathons"
                label="Hackathons"
                active={isActive("/hackathons")}
              />
              <NavLink
                to="/team"
                label="Team"
                active={isActive("/team")}
              />
              <NavLink
                to="/dashboard"
                label="Dashboard"
                active={isActive("/dashboard")}
              />
              <NavLink
                to="/chat"
                label="Chatbot"
                active={isActive("/chat")}
              />
              <NavLink
                to="/my"
                label="Applied"
                active={isActive("/my")}
              />
              <NavLink
                to="/profile"
                label="Profile"
                active={isActive("/profile")}
              />
            </>
          )}

          {role === "organizer" && (
            <NavLink
              to="/admin"
              label="Organizer Panel"
              active={isActive("/admin")}
            />
          )}
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-blue-600 hover:-translate-y-0.5 transition-all active:scale-95 shadow-slate-200"
              >
                Join Now
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="rounded-xl bg-red-500/10 px-5 py-2 text-sm font-bold text-red-600 hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-100"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`relative text-[13px] font-black uppercase tracking-widest transition-all hover:text-blue-600 ${
        active ? "text-blue-600" : "text-slate-500"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-2 left-0 h-1 w-full bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300" />
      )}
    </Link>
  );
}