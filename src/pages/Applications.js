import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  ArrowLeft, 
  MapPin, 
  Inbox, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Briefcase 
} from "lucide-react";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      // Mocked for demonstration. Replace with your actual API endpoint.
      const res = await api.get("/my-applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Accepted":
      case "Shortlisted":
        return {
          style: {
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            color: "#16a34a",
            border: "1px solid rgba(34, 197, 94, 0.2)",
          },
          icon: <CheckCircle size={14} style={{ marginRight: "6px" }} />,
        };
      case "Rejected":
        return {
          style: {
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "#dc2626",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          },
          icon: <XCircle size={14} style={{ marginRight: "6px" }} />,
        };
      default: // Pending
        return {
          style: {
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            color: "#d97706",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          },
          icon: <Clock size={14} style={{ marginRight: "6px" }} />,
        };
    }
  };

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
          .hover-back-btn {
            transition: all 0.3s ease;
          }
          .hover-back-btn:hover {
            background: #f1f5f9 !important;
            color: ${BRAND_COLOR} !important;
            border-color: ${BRAND_COLOR} !important;
          }
          .hover-btn {
            transition: background 0.3s ease, transform 0.2s ease;
          }
          .hover-btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 210, 181, 0.3);
          }
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.1) !important;
          }
        `}
      </style>

      <div style={styles.main}>
        {/* Header Section */}
        <div style={styles.headerContainer}>
          <button 
            onClick={() => navigate(-1)} 
            className="hover-back-btn" 
            style={styles.backBtn}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h2 style={styles.pageTitle}>
            My <span style={styles.textHighlight}>Applications</span>
          </h2>
          <p style={styles.pageSubtitle}>
            Track the status of the roles you have applied for.
          </p>
        </div>

        {/* Content Section */}
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.statusBox}>
              <Clock size={32} color={BRAND_COLOR} style={{ marginBottom: "15px", animation: "spin 2s linear infinite" }} />
              <p style={styles.loadingText}>Loading your applications...</p>
            </div>
          ) : error ? (
            <div style={styles.statusBox}>
              <XCircle size={32} color="#ef4444" style={{ marginBottom: "15px" }} />
              <p style={styles.errorText}>Failed to load applications. Please try again later.</p>
            </div>
          ) : applications.length === 0 ? (
            <div style={styles.emptyBox}>
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80" 
                alt="Empty Desk" 
                style={styles.emptyImage}
              />
              <div style={styles.emptyIconWrapper}>
                <Inbox size={32} color={BRAND_COLOR} />
              </div>
              <h3 style={styles.emptyTitle}>No Applications Yet</h3>
              <p style={styles.emptyDesc}>
                You haven't applied to any jobs yet. Start exploring opportunities to see them tracked here!
              </p>
              <button className="hover-btn" style={styles.exploreBtn} onClick={() => navigate("/jobs")}>
                <Briefcase size={16} style={{ marginRight: "8px" }} />
                Browse Jobs
              </button>
            </div>
          ) : (
            applications.map((app, index) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <div
                  key={app.id}
                  className="hover-card"
                  style={{
                    ...styles.card,
                    animationDelay: `${index * 0.1}s`, // Staggered animation
                  }}
                >
                  <div style={styles.cardInfo}>
                    <h3 style={styles.jobTitle}>{app.title}</h3>
                    <p style={styles.jobLocation}>
                      <MapPin size={14} style={{ marginRight: "4px", verticalAlign: "middle" }} /> 
                      {app.location}
                    </p>
                  </div>
                  
                  <div style={styles.cardStatus}>
                    <span style={{ ...styles.statusBadge, ...statusConfig.style }}>
                      {statusConfig.icon}
                      {app.status}
                    </span>
                  </div>
                </div>
              );
            })
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
    maxWidth: "800px",
    margin: "0 auto",
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
    marginTop: "40px", // added margin to clear the absolute positioned back button on smaller screens
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
    padding: "50px",
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
    padding: "40px",
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
    height: "200px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "30px",
  },
  emptyIconWrapper: {
    width: "80px",
    height: "80px",
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
  exploreBtn: {
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    border: "none",
    borderRadius: "40px",
    padding: "12px 30px",
    fontSize: "15px",
    fontWeight: "600",
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
    gap: "15px",
    opacity: 0,
    animation: "slideUp 0.5s ease-out forwards",
  },
  cardInfo: {
    flex: "1 1 200px",
  },
  jobTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "8px",
    color: TEXT_DARK,
  },
  jobLocation: {
    fontSize: "14px",
    color: TEXT_MUTED,
    margin: 0,
    display: "flex",
    alignItems: "center",
  },
  cardStatus: {
    display: "flex",
    alignItems: "center",
  },
  statusBadge: {
    padding: "8px 16px",
    borderRadius: "40px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
  },
};

export default Applications;