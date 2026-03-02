import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (!e.target.closest(".navbar")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Don't show Navbar on Login/Register pages
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  const navTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar__brand" onClick={() => navTo("/dashboard")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#brandGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, display: 'block' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
        <span>JobPortal</span>
      </div>

      {/* Desktop links */}
      {token && (
        <div className="navbar__links">
          <button className="navbar__btn" onClick={() => navTo("/dashboard")}>Dashboard</button>
          <button className="navbar__btn" onClick={() => navTo("/profile")}>Profile</button>

          {role === "jobseeker" && (
            <>
              <button className="navbar__btn" onClick={() => navTo("/jobs")}>Browse Jobs</button>
              <button className="navbar__btn" onClick={() => navTo("/applications")}>My Applications</button>
            </>
          )}

          {role === "recruiter" && (
            <>
              <button className="navbar__btn" onClick={() => navTo("/post-job")}>Post Job</button>
              <button className="navbar__btn" onClick={() => navTo("/my-jobs")}>My Jobs</button>
            </>
          )}

          <button className="navbar__logout" onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Hamburger button — Mobile only */}
      {token && (
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      )}

      {/* Mobile dropdown menu */}
      {token && (
        <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
          <button className="navbar__mobile-btn" onClick={() => navTo("/dashboard")}>📊 Dashboard</button>
          <button className="navbar__mobile-btn" onClick={() => navTo("/profile")}>👤 Profile</button>

          {role === "jobseeker" && (
            <>
              <button className="navbar__mobile-btn" onClick={() => navTo("/jobs")}>💼 Browse Jobs</button>
              <button className="navbar__mobile-btn" onClick={() => navTo("/applications")}>📋 My Applications</button>
            </>
          )}

          {role === "recruiter" && (
            <>
              <button className="navbar__mobile-btn" onClick={() => navTo("/post-job")}>➕ Post Job</button>
              <button className="navbar__mobile-btn" onClick={() => navTo("/my-jobs")}>📁 My Jobs</button>
            </>
          )}

          <button className="navbar__mobile-logout" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;