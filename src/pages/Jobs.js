import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  ChevronRight
} from "lucide-react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* Injecting Keyframes and Hover Effects */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin-icon {
            animation: spin 1.5s linear infinite;
          }
          .hover-back-btn {
            transition: all 0.3s ease;
          }
          .hover-back-btn:hover {
            background: #f1f5f9 !important;
            color: ${BRAND_COLOR} !important;
            border-color: ${BRAND_COLOR} !important;
          }
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.1) !important;
          }
          .search-box {
            transition: all 0.3s ease;
          }
          .search-box:focus-within {
            border-color: ${BRAND_COLOR} !important;
            box-shadow: 0 0 0 4px rgba(0, 210, 181, 0.1) !important;
          }
          .btn-view {
            transition: all 0.3s ease;
          }
          .btn-view:hover {
            background-color: ${BRAND_COLOR} !important;
            color: #ffffff !important;
            transform: translateY(-2px);
          }
        `}
      </style>

      <div style={styles.main}>
        {/* Header Section */}
        <div style={styles.headerContainer}>
          <button onClick={() => navigate(-1)} className="hover-back-btn" style={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 style={styles.pageTitle}>
            Available <span style={styles.textHighlight}>Jobs</span>
          </h2>
          <p style={styles.pageSubtitle}>
            Find opportunities that perfectly match your skills and aspirations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-box" style={styles.searchContainer}>
          <Search size={20} color={TEXT_MUTED} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for job titles, keywords, or companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Content Section */}
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.statusBox}>
              <Loader2 size={36} color={BRAND_COLOR} className="spin-icon" style={{ marginBottom: "15px" }} />
              <p style={styles.loadingText}>Loading available jobs...</p>
            </div>
          ) : error ? (
            <div style={styles.statusBox}>
              <AlertCircle size={36} color="#ef4444" style={{ marginBottom: "15px" }} />
              <p style={styles.errorText}>Failed to load jobs. Please try again later.</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div style={styles.emptyBox}>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" 
                alt="No Data Search" 
                style={styles.emptyImage}
              />
              <div style={styles.emptyIconWrapper}>
                <Briefcase size={32} color={BRAND_COLOR} />
              </div>
              <h3 style={styles.emptyTitle}>No Jobs Found</h3>
              <p style={styles.emptyDesc}>
                We couldn't find any jobs matching "{search}". Try using different keywords or checking back later!
              </p>
              <button 
                className="btn-view" 
                style={styles.clearBtn}
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="hover-card"
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.05}s`, // Staggered animation
                }}
              >
                <div style={styles.cardInfo}>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <p style={styles.jobDesc}>
                    {job.description?.substring(0, 150)}
                    {job.description?.length > 150 ? "..." : ""}
                  </p>
                  
                  <div style={styles.badgesContainer}>
                    <span style={styles.badge}>
                      <MapPin size={14} style={{ marginRight: "4px" }} /> {job.location}
                    </span>
                  </div>
                </div>
                
                <div style={styles.cardActions}>
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    style={styles.viewBtn}
                  >
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const BRAND_COLOR = "#00D2B5";
const TEXT_MUTED = "#64748b";
const TEXT_DARK = "#0f172a";

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F8FAFC", 
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: TEXT_DARK,
    padding: "80px 20px",
  },
  textHighlight: {
    color: BRAND_COLOR,
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "40px",
    animation: "fadeIn 0.6s ease-out",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: "0",
    left: "0",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    color: TEXT_MUTED,
    padding: "8px 16px",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "15px",
    color: TEXT_DARK,
    marginTop: "40px", // added margin to clear absolute back button on smaller screens
  },
  pageSubtitle: {
    fontSize: "16px",
    color: TEXT_MUTED,
    maxWidth: "600px",
    margin: "0 auto",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: "40px",
    padding: "12px 24px",
    maxWidth: "700px",
    margin: "0 auto 40px auto",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    animation: "fadeIn 0.8s ease-out",
  },
  searchIcon: {
    marginRight: "12px",
    flexShrink: 0,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: TEXT_DARK,
    background: "transparent",
    width: "100%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  statusBox: {
    textAlign: "center",
    padding: "60px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loadingText: {
    color: BRAND_COLOR,
    fontSize: "16px",
    fontWeight: "600",
  },
  errorText: {
    color: "#ef4444",
    fontSize: "16px",
    fontWeight: "500",
  },
  emptyBox: {
    textAlign: "center",
    padding: "50px 30px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    animation: "fadeIn 0.6s ease-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  emptyImage: {
    width: "100%",
    maxWidth: "350px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "30px",
  },
  emptyIconWrapper: {
    width: "70px",
    height: "70px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  emptyTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
    color: TEXT_DARK,
  },
  emptyDesc: {
    color: TEXT_MUTED,
    lineHeight: "1.6",
    maxWidth: "400px",
    marginBottom: "25px",
  },
  clearBtn: {
    padding: "10px 24px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    color: "#00b39b",
    border: "1px solid rgba(0, 210, 181, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    opacity: 0,
    animation: "slideUp 0.5s ease-out forwards",
  },
  cardInfo: {
    flex: "1 1 400px",
  },
  jobTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
    color: TEXT_DARK,
  },
  jobDesc: {
    fontSize: "15px",
    color: TEXT_MUTED,
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  badgesContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#F1F5F9",
    padding: "6px 14px",
    borderRadius: "40px",
    fontSize: "13px",
    fontWeight: "600",
    color: TEXT_MUTED,
    border: "1px solid #e2e8f0",
    display: "inline-flex",
    alignItems: "center",
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
  },
  viewBtn: {
    padding: "12px 24px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    color: "#00b39b", 
    border: "1px solid rgba(0, 210, 181, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
};

export default Jobs;