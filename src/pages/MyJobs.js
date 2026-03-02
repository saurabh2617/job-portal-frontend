import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Users, 
  Loader2, 
  AlertCircle,
  PlusCircle
} from "lucide-react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/my-jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your posted jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

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
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
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
          .hover-btn-primary {
            transition: all 0.3s ease;
          }
          .hover-btn-primary:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 210, 181, 0.4);
          }
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.06) !important;
          }
          .btn-view {
            transition: all 0.2s ease;
          }
          .btn-view:hover {
            background-color: ${BRAND_COLOR} !important;
            color: #ffffff !important;
            transform: translateY(-2px);
          }
        `}
      </style>

      {/* Ambient Background Glows */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.main}>
        {/* Header Section */}
        <div style={styles.headerContainer}>
          <button onClick={() => navigate(-1)} className="hover-back-btn" style={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 style={styles.pageTitle}>
            My <span style={styles.textHighlight}>Posted Jobs</span>
          </h2>
          <p style={styles.pageSubtitle}>
            Manage your active job listings and review incoming candidates.
          </p>
        </div>

        {/* Content Section */}
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.statusBox}>
              <Loader2 size={36} color={BRAND_COLOR} className="spin-icon" style={{ marginBottom: "15px" }} />
              <p style={styles.loadingText}>Loading your jobs...</p>
            </div>
          ) : error ? (
            <div style={styles.statusBox}>
              <AlertCircle size={36} color="#ef4444" style={{ marginBottom: "15px" }} />
              <p style={styles.errorText}>{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div style={styles.emptyBox}>
              <img 
                src="https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&w=600&q=80" 
                alt="Empty Office Desk" 
                style={styles.emptyImage}
              />
              <div style={styles.emptyIconWrapper}>
                <Briefcase size={32} color={BRAND_COLOR} />
              </div>
              <h3 style={styles.emptyTitle}>No Jobs Posted Yet</h3>
              <p style={styles.emptyDesc}>
                You haven't posted any opportunities. Create a new job listing to start finding great talent!
              </p>
              <button className="hover-btn-primary" style={styles.postBtn} onClick={() => navigate("/post-job")}>
                <PlusCircle size={18} style={{ marginRight: "8px" }} />
                Post a Job
              </button>
            </div>
          ) : (
            jobs.map((job, index) => (
              <div
                key={job.id}
                className="hover-card"
                style={{
                  ...styles.card,
                  animationDelay: `${index * 0.1}s`, // Staggered animation
                }}
              >
                <div style={styles.cardInfo}>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <div style={styles.badgesContainer}>
                    <span style={styles.badge}>
                      <Briefcase size={14} style={{ marginRight: "6px" }} /> {job.company}
                    </span>
                    <span style={styles.badge}>
                      <MapPin size={14} style={{ marginRight: "6px" }} /> {job.location}
                    </span>
                  </div>
                </div>

                <div style={styles.cardActions}>
                  <button
                    className="btn-view"
                    onClick={() => navigate(`/job-applicants/${job.id}`)}
                    style={styles.viewBtn}
                  >
                    <Users size={16} /> View Applicants
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
    position: "relative",
    overflowX: "hidden",
  },
  circle1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: `linear-gradient(135deg, rgba(0, 210, 181, 0.1), rgba(99, 102, 241, 0.05))`,
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px",
    zIndex: 0,
    pointerEvents: "none",
    animation: "float 12s infinite ease-in-out",
  },
  circle2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(244, 114, 182, 0.05))",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "10%",
    right: "-100px",
    zIndex: 0,
    pointerEvents: "none",
    animation: "float 10s infinite ease-in-out reverse",
  },
  textHighlight: {
    color: BRAND_COLOR,
  },
  main: {
    maxWidth: "800px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "50px",
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
    marginTop: "40px", // added to avoid overlap with back btn on mobile
  },
  pageSubtitle: {
    fontSize: "16px",
    color: TEXT_MUTED,
    maxWidth: "600px",
    margin: "0 auto",
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
    padding: "40px 30px",
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
    maxWidth: "400px",
    height: "220px",
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
    marginBottom: "30px",
    lineHeight: "1.6",
    maxWidth: "400px",
  },
  postBtn: {
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    border: "none",
    borderRadius: "40px",
    padding: "14px 32px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#ffffff",
    padding: "25px 30px",
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
    flex: "1 1 300px",
  },
  jobTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
    color: TEXT_DARK,
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
    padding: "12px 20px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    color: "#00b39b",
    border: "1px solid rgba(0, 210, 181, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

export default MyJobs;