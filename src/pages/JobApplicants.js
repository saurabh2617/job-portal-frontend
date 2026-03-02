import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  ArrowLeft, 
  Users, 
  Mail, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Check, 
  X 
} from "lucide-react";

function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await api.get(`/job-applicants/${jobId}`);
        setApplicants(res.data);
      } catch (err) {
        console.error("Applicants error:", err.response?.data || err.message);
        setError("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const viewResume = async (filename) => {
    try {
      const response = await api.get(`/resume/${filename}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (err) {
      console.error("Resume error:", err.response?.data || err.message);
      alert("Failed to load resume");
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(`/update-status/${applicationId}`, { status });

      setApplicants((prev) =>
        prev.map((app) =>
          app.application_id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      alert("Failed to update status");
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Shortlisted":
      case "Accepted":
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
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.1) !important;
          }
          .btn-resume {
            transition: all 0.2s ease;
          }
          .btn-resume:hover {
            background-color: ${BRAND_COLOR} !important;
            color: #ffffff !important;
          }
          .btn-shortlist {
            transition: all 0.2s ease;
          }
          .btn-shortlist:hover {
            background-color: #15803d !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(22, 163, 74, 0.2);
          }
          .btn-reject {
            transition: all 0.2s ease;
          }
          .btn-reject:hover {
            background-color: #fef2f2 !important;
            transform: translateY(-2px);
          }
        `}
      </style>

      <div style={styles.main}>
        {/* Header Section */}
        <div style={styles.headerContainer}>
          <button onClick={() => navigate(-1)} className="hover-back-btn" style={styles.backBtn}>
            <ArrowLeft size={16} /> Back
          </button>
          <h2 style={styles.pageTitle}>
            Review <span style={styles.textHighlight}>Applicants</span>
          </h2>
          <p style={styles.pageSubtitle}>
            Manage candidates who have applied to your job posting.
          </p>
        </div>

        {/* Content Section */}
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.statusBox}>
              <Clock size={32} color={BRAND_COLOR} style={{ marginBottom: "15px", animation: "spin 2s linear infinite" }} />
              <p style={styles.loadingText}>Loading candidates...</p>
            </div>
          ) : error ? (
            <div style={styles.statusBox}>
              <XCircle size={32} color="#ef4444" style={{ marginBottom: "15px" }} />
              <p style={styles.errorText}>{error}</p>
            </div>
          ) : applicants.length === 0 ? (
            <div style={styles.emptyBox}>
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80" 
                alt="Empty Office" 
                style={styles.emptyImage}
              />
              <div style={styles.emptyIconWrapper}>
                <Users size={32} color={BRAND_COLOR} />
              </div>
              <h3 style={styles.emptyTitle}>No Applicants Yet</h3>
              <p style={styles.emptyDesc}>
                Candidates haven't applied to this position yet. Check back later to review new submissions!
              </p>
            </div>
          ) : (
            applicants.map((app, index) => {
              const statusConfig = getStatusConfig(app.status);
              return (
                <div
                  key={app.application_id}
                  className="hover-card"
                  style={{
                    ...styles.card,
                    animationDelay: `${index * 0.1}s`, // Staggered animation
                  }}
                >
                  {/* Candidate Info */}
                  <div style={styles.cardInfo}>
                    <div style={styles.avatarWrapper}>
                      {app.name ? app.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 style={styles.candidateName}>{app.name}</h3>
                      <p style={styles.candidateEmail}>
                        <Mail size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                        {app.email}
                      </p>
                      <span style={{ ...styles.statusBadge, ...statusConfig.style }}>
                        {statusConfig.icon}
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions (Resume & Decision) */}
                  <div style={styles.cardActions}>
                    {app.resume && (
                      <button
                        className="btn-resume"
                        onClick={() => viewResume(app.resume)}
                        style={styles.resumeBtn}
                      >
                        <FileText size={16} /> View Resume
                      </button>
                    )}

                    {app.status === "Pending" && (
                      <div style={styles.decisionBtns}>
                        <button
                          className="btn-shortlist"
                          onClick={() => updateStatus(app.application_id, "Shortlisted")}
                          style={styles.shortlistBtn}
                        >
                          <Check size={16} /> Shortlist
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => updateStatus(app.application_id, "Rejected")}
                          style={styles.rejectBtn}
                        >
                          <X size={16} /> Reject
                        </button>
                      </div>
                    )}
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
    maxWidth: "900px",
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
    marginTop: "40px", // Prevents overlap with absolute back button on smaller screens
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
    lineHeight: "1.6",
    maxWidth: "400px",
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
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flex: "1 1 300px",
  },
  avatarWrapper: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    color: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "700",
    border: `1px solid rgba(0, 210, 181, 0.2)`,
  },
  candidateName: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "6px",
    color: TEXT_DARK,
  },
  candidateEmail: {
    fontSize: "14px",
    color: TEXT_MUTED,
    margin: "0 0 12px 0",
    display: "flex",
    alignItems: "center",
  },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 14px",
    borderRadius: "40px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
    flex: "1 1 200px",
  },
  decisionBtns: {
    display: "flex",
    gap: "10px",
    width: "100%",
    justifyContent: "flex-end",
  },
  resumeBtn: {
    padding: "10px 16px",
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    color: "#00b39b",
    border: "1px solid rgba(0, 210, 181, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    width: "100%", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  shortlistBtn: {
    padding: "10px 16px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    flex: 1,
  },
  rejectBtn: {
    padding: "10px 16px",
    backgroundColor: "transparent",
    color: "#dc2626",
    border: "1px solid #dc2626",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    flex: 1,
  },
};

export default JobApplicants;