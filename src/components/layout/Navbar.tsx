import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <div className="text-2xl font-extrabold text-indigo-600">
          ResumeAI
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <NavLink to="/dashboard" className="hover:text-indigo-600 transition">
            Dashboard
          </NavLink>
          <NavLink to="/upload" className="hover:text-indigo-600 transition">
            Resume Upload
          </NavLink>
          <NavLink to="/jobs" className="hover:text-indigo-600 transition">
            Job Match
          </NavLink>
          <NavLink to="/admin" className="hover:text-indigo-600 transition">
            Admin
          </NavLink>
        </div>

        {/* CTA */}
        <Link
          to="/upload"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
        >
          Upload Resume
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
