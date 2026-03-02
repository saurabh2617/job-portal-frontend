import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FileText,
  Search,
  Briefcase,
  Monitor,
  Heart,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Palette,
  ArrowRight,
  MapPin
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [searchQuery, setSearchQuery] = useState("");

  // Protect the route
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div style={styles.page}>
      {/* Injecting CSS for hover effects since inline styles don't support :hover natively */}
      <style>
        {`
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          }
          .hover-btn {
            transition: opacity 0.3s ease, transform 0.2s ease;
          }
          .hover-btn:hover {
            opacity: 0.85;
            transform: scale(1.02);
          }
          .hover-link {
            transition: color 0.3s ease, padding-left 0.3s ease;
          }
          .hover-link:hover {
            color: ${BRAND_COLOR} !important;
          }
          .hover-explore:hover {
            color: ${BRAND_COLOR} !important;
            gap: 10px !important;
          }
          .hover-tab {
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          .hover-tab:hover:not(.active-tab) {
            background-color: #e2e8f0 !important;
            color: #0f172a !important;
          }
          .social-icons {
            display: flex;
            gap: 14px;
            margin-top: 20px;
          }
          .social-icon-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            color: #94a3b8;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
            text-decoration: none;
          }
          .social-icon-btn:hover {
            background-color: #00D2B5;
            border-color: #00D2B5;
            color: #ffffff;
            transform: translateY(-3px) scale(1.1);
          }
        `}
      </style>

      {/* =========================================
          SECTION 1: HERO
          ========================================= */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Find Your <span style={styles.textHighlight}>Dream Career</span><br />
              Start Today
            </h1>
            <p style={styles.heroDesc}>
              Connect with top companies and discover opportunities that match your skills. Your next career move is just a click away.
            </p>
            <button className="hover-btn" style={styles.primaryBtn} onClick={() => navigate("/jobs")}>
              Explore Opportunities
            </button>
          </div>

          <div style={styles.heroImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Professionals collaborating"
              style={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: DASHBOARD ACTIONS & JOBS
          ========================================= */}
      <section style={styles.lightSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Your Dashboard <span style={styles.textHighlight}>Actions</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Manage your profile, track applications, and navigate your career journey.
          </p>
        </div>

        <div style={styles.tabsContainer}>
          <button
            className="hover-tab active-tab"
            style={{ ...styles.tabBtn, ...styles.activeTab }}
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>

          {role === "jobseeker" && (
            <>
              <button className="hover-tab" style={styles.tabBtn} onClick={() => navigate("/jobs")}>Browse Jobs</button>
              <button className="hover-tab" style={styles.tabBtn} onClick={() => navigate("/applications")}>Applications</button>
            </>
          )}

          {role === "recruiter" && (
            <>
              <button className="hover-tab" style={styles.tabBtn} onClick={() => navigate("/post-job")}>Post a Job</button>
              <button className="hover-tab" style={styles.tabBtn} onClick={() => navigate("/my-jobs")}>My Jobs</button>
            </>
          )}
        </div>

        {/* --- JOB CARDS IN HORIZONTAL GRID --- */}
        <div style={styles.jobGridContainer}>

          {/* Job 1 */}
          <div className="hover-card" style={styles.jobGridCard}>
            <div style={styles.jobCardContent}>
              <h3 style={styles.jobCardTitle}>Game Programming</h3>
              <p style={styles.jobCardDesc}>
                A Gaming Professional designs, develops, tests, and maintains video games across platforms such as PC, console, and mobile.
              </p>
              <div style={styles.jobCardBadges}>
                <span style={styles.badge}><MapPin size={14} style={{ marginRight: "4px" }} /> Mumbai</span>
                <span style={styles.badge}>💰 ₹8,00,000 - ₹12,00,000/yr</span>
              </div>
            </div>
            <button className="hover-btn" style={styles.viewDetailsBtnGrid}>
              View Details <ArrowRight size={14} style={{ marginLeft: "4px" }} />
            </button>
          </div>

          {/* Job 2 */}
          <div className="hover-card" style={styles.jobGridCard}>
            <div style={styles.jobCardContent}>
              <h3 style={styles.jobCardTitle}>Data Analytics</h3>
              <p style={styles.jobCardDesc}>
                The Data Analyst is responsible for collecting, processing, and analyzing large datasets to generate actionable insights.
              </p>
              <div style={styles.jobCardBadges}>
                <span style={styles.badge}><MapPin size={14} style={{ marginRight: "4px" }} /> Mumbai</span>
                <span style={styles.badge}>💰 ₹6,50,000 - ₹9,50,000/yr</span>
              </div>
            </div>
            <button className="hover-btn" style={styles.viewDetailsBtnGrid}>
              View Details <ArrowRight size={14} style={{ marginLeft: "4px" }} />
            </button>
          </div>

          {/* Job 3 */}
          <div className="hover-card" style={styles.jobGridCard}>
            <div style={styles.jobCardContent}>
              <h3 style={styles.jobCardTitle}>Backend Developer</h3>
              <p style={styles.jobCardDesc}>
                 Backend Developer to design, develop, and maintain server-side applications and APIs. The candidate will be responsible for writing clean and efficient code to support frontend functionality.
              </p>
              <div style={styles.jobCardBadges}>
                <span style={styles.badge}><MapPin size={14} style={{ marginRight: "4px" }} /> pen</span>
                <span style={styles.badge}>💰 ₹3,00,000 - ₹5,00,000/yr</span>
              </div>
            </div>
            <button className="hover-btn" style={styles.viewDetailsBtnGrid}>
              View Details <ArrowRight size={14} style={{ marginLeft: "4px" }} />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 3: HOW IT WORKS
          ========================================= */}
      <section style={styles.lightGreySection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            How <span style={styles.textHighlight}>JobPortal</span> Works
          </h2>
          <p style={styles.sectionSubtitle}>
            Landing your dream job has never been easier. Follow these simple steps to kickstart your career journey.
          </p>
        </div>

        <div style={styles.stepsGrid}>
          <div style={styles.stepCard}>
            <div style={styles.stepIconWrapper}>
              <FileText size={32} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.stepTitle}>Create Your Profile</h3>
            <p style={styles.stepDesc}>Sign up and showcase your skills and experience.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepIconWrapper}>
              <Search size={32} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.stepTitle}>Explore Opportunities</h3>
            <p style={styles.stepDesc}>Browse through our curated job listings and find your match.</p>
          </div>
          <div style={styles.stepCard}>
            <div style={styles.stepIconWrapper}>
              <Briefcase size={32} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.stepTitle}>Apply with Ease</h3>
            <p style={styles.stepDesc}>Submit applications with just a few clicks and track your progress.</p>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: EXPLORE CATEGORIES
          ========================================= */}
      <section style={styles.whiteSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Explore Job <span style={styles.textHighlight}>Categories</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Find your perfect role across diverse industries. From tech startups to established enterprises.
          </p>
        </div>

        <div style={styles.gridContainer}>
          {[
            { icon: <Monitor size={24} color={BRAND_COLOR} />, title: "Technology", jobs: "1,240" },
            { icon: <Heart size={24} color={BRAND_COLOR} />, title: "Healthcare", jobs: "850" },
            { icon: <GraduationCap size={24} color={BRAND_COLOR} />, title: "Education", jobs: "430" },
            { icon: <DollarSign size={24} color={BRAND_COLOR} />, title: "Finance", jobs: "920" },
            { icon: <TrendingUp size={24} color={BRAND_COLOR} />, title: "Marketing", jobs: "650" },
            { icon: <Palette size={24} color={BRAND_COLOR} />, title: "Design", jobs: "310" },
          ].map((cat, index) => (
            <div key={index} className="hover-card" style={styles.categoryCard} onClick={() => navigate("/jobs")}>
              <div style={styles.cardHeader}>
                <div style={styles.catIconWrapper}>{cat.icon}</div>
                <h3 style={styles.catTitle}>{cat.title}</h3>
              </div>
              <p style={styles.catJobs}>{cat.jobs} jobs available</p>
              <button className="hover-explore" style={styles.exploreLink}>
                Explore Jobs <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          SECTION 5: FOOTER
          ========================================= */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerBrandCol}>
            <h3 style={styles.footerBrand}>
              <Briefcase size={24} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} color={BRAND_COLOR} />
              JobPortal
            </h3>
            <p style={styles.footerText}>
              Connecting talent with opportunity. Find your dream job or hire the
              perfect candidate with our AI-powered platform.
            </p>

            {/* Social Media Icons */}
            <div className="social-icons">
              {/* GitHub */}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div style={styles.footerLinksCol}>
            <h4 style={styles.footerHeading}>For Job Seekers</h4>
            <p className="hover-link" style={styles.footerLink} onClick={() => navigate("/jobs")}>Browse Jobs</p>
            <p className="hover-link" style={styles.footerLink}>Career Resources</p>
            <p className="hover-link" style={styles.footerLink}>Salary Guide</p>
            <p className="hover-link" style={styles.footerLink}>Resume Tips</p>
          </div>

          <div style={styles.footerLinksCol}>
            <h4 style={styles.footerHeading}>For Employers</h4>
            <p className="hover-link" style={styles.footerLink} onClick={() => navigate("/post-job")}>Post a Job</p>
            <p className="hover-link" style={styles.footerLink}>Pricing</p>
            <p className="hover-link" style={styles.footerLink}>Enterprise</p>
            <p className="hover-link" style={styles.footerLink}>Recruiting</p>
          </div>

          <div style={styles.footerLinksCol}>
            <h4 style={styles.footerHeading}>Support</h4>
            <p className="hover-link" style={styles.footerLink}>Help Center</p>
            <p className="hover-link" style={styles.footerLink}>Contact Us</p>
            <p className="hover-link" style={styles.footerLink}>Privacy Policy</p>
            <p className="hover-link" style={styles.footerLink}>Terms of Service</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const BRAND_COLOR = "#00D2B5";
const DARK_BG = "#0B141E";
const TEXT_MUTED = "#64748b";

const styles = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#334155",
    backgroundColor: "#ffffff",
    overflowX: "hidden",
  },
  textHighlight: {
    color: BRAND_COLOR,
  },

  /* --- Hero Section --- */
  heroSection: {
    backgroundColor: DARK_BG,
    padding: "80px 20px",
    display: "flex",
    justifyContent: "center",
  },
  heroContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1100px",
    width: "100%",
    gap: "40px",
    flexWrap: "wrap",
  },
  heroContent: {
    flex: "1 1 450px",
    textAlign: "left",
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: "52px",
    fontWeight: "800",
    lineHeight: "1.15",
    marginBottom: "20px",
  },
  heroDesc: {
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "35px",
    maxWidth: "500px",
  },
  primaryBtn: {
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    border: "none",
    borderRadius: "30px",
    padding: "14px 28px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  heroImageWrapper: {
    flex: "1 1 450px",
    display: "flex",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    maxWidth: "550px",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.2)",
    objectFit: "cover",
  },

  /* --- Reusable Layouts --- */
  lightSection: {
    padding: "60px 20px 80px", // Increased bottom padding to accommodate grid
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  whiteSection: {
    padding: "60px 20px",
    backgroundColor: "#ffffff",
    textAlign: "center",
  },
  lightGreySection: {
    padding: "80px 20px",
    backgroundColor: "#F8FAFC",
    textAlign: "center",
  },
  sectionHeader: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "15px",
  },
  sectionSubtitle: {
    fontSize: "16px",
    color: TEXT_MUTED,
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },

  /* --- Dashboard Tabs/Actions --- */
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#F1F5F9",
    padding: "8px",
    borderRadius: "50px",
    maxWidth: "fit-content",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  tabBtn: {
    padding: "12px 24px",
    borderRadius: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: TEXT_MUTED,
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  activeTab: {
    backgroundColor: "#ffffff",
    color: "#0f172a",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  /* --- Horizontal Job Grid --- */
  jobGridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1100px",
    margin: "50px auto 0", // 50px top margin to separate from tabs
  },
  jobGridCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Pushes the button to the bottom
    textAlign: "left",
    minHeight: "260px", // Ensures cards are roughly the same height
  },
  jobCardContent: {
    marginBottom: "20px",
  },
  jobCardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "12px",
    marginTop: 0,
  },
  jobCardDesc: {
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  jobCardBadges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    color: "#475569",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
  viewDetailsBtnGrid: {
    backgroundColor: "transparent",
    color: BRAND_COLOR,
    border: `1px solid ${BRAND_COLOR}`,
    borderRadius: "6px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Centers text & icon in the button
    width: "100%", // Makes the button span the bottom of the card
    transition: "all 0.3s ease",
  },

  /* --- How It Works --- */
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  stepCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepIconWrapper: {
    width: "80px",
    height: "80px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  stepTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px",
  },
  stepDesc: {
    fontSize: "15px",
    color: TEXT_MUTED,
    lineHeight: "1.6",
  },

  /* --- Grid Cards (Categories) --- */
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "left",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px",
  },
  catIconWrapper: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  catTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  catJobs: {
    fontSize: "14px",
    color: TEXT_MUTED,
    marginBottom: "20px",
  },
  exploreLink: {
    background: "none",
    border: "none",
    color: "#0f172a",
    fontWeight: "600",
    fontSize: "14px",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "gap 0.3s ease, color 0.3s ease",
  },

  /* --- Footer --- */
  footer: {
    backgroundColor: DARK_BG,
    color: "#ffffff",
    padding: "60px 20px 20px 20px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    maxWidth: "1100px",
    margin: "0 auto 40px auto",
  },
  footerBrandCol: {
    gridColumn: "span 1",
  },
  footerBrand: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "15px",
  },
  footerText: {
    color: "#94a3b8",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  footerLinksCol: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerHeading: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#ffffff",
  },
  footerLink: {
    color: "#94a3b8",
    fontSize: "14px",
    cursor: "pointer",
    margin: 0,
  },
  footerBottom: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "20px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
};

export default Dashboard;