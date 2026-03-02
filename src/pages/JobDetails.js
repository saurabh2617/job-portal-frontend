import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  AlignLeft, 
  UploadCloud, 
  Send, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  FileText
} from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(res.data);
    } catch (err) {
      console.error("Error loading job:", err.response?.data || err);
      setMessage("Failed to load job details.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!resume) {
      setMessage("Please select a resume file first.");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await api.post(`/apply/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Application submitted successfully!");
      setIsError(false);
      setResume(null);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error applying for job");
      setIsError(true);
    }
  };

  return (
    <div style={styles.page}>
      {/* Injecting Keyframes & Hover Classes */}
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
          .hover-apply-btn {
            transition: all 0.3s ease;
          }
          .hover-apply-btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 210, 181, 0.4);
          }
          .upload-zone {
            transition: all 0.3s ease;
          }
          .upload-zone:hover {
            background-color: rgba(0, 210, 181, 0.05) !important;
            border-color: ${BRAND_COLOR} !important;
          }
        `}
      </style>

      <div style={styles.main}>
        {/* Header Section */}
        <div style={styles.headerContainer}>
          <button onClick={() => navigate(-1)} className="hover-back-btn" style={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Jobs
          </button>
          <h2 style={styles.pageTitle}>
            Opportunity <span style={styles.textHighlight}>Details</span>
          </h2>
        </div>

        {/* Content Section */}
        {loading ? (
          <div style={styles.statusBox}>
            <Loader2 size={36} color={BRAND_COLOR} className="spin-icon" style={{ marginBottom: "15px" }} />
            <p style={styles.loadingText}>Loading job details...</p>
          </div>
        ) : !job ? (
          <div style={styles.statusBox}>
            <AlertCircle size={36} color="#ef4444" style={{ marginBottom: "15px" }} />
            <p style={styles.errorText}>{message || "Job not found."}</p>
          </div>
        ) : (
          <div style={styles.card}>
            {/* Job Header */}
            <div style={styles.jobHeader}>
              <h1 style={styles.title}>{job.title}</h1>
              <div style={styles.badgesContainer}>
                <span style={styles.badge}>
                  <Briefcase size={16} /> {job.company}
                </span>
                <span style={styles.badge}>
                  <MapPin size={16} /> {job.location}
                </span>
              </div>
            </div>

            <div style={styles.divider}></div>

            {/* Description */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <AlignLeft size={20} /> About the Role
              </h3>
              <div style={styles.descriptionText}>
                {job.description.split("\n").map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: "15px" }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Application Zone */}
            <div style={styles.applyZone}>
              <h3 style={styles.applyTitle}>Submit Your Application</h3>
              <p style={styles.applySubtitle}>
                Upload your latest resume in PDF format to apply for this position.
              </p>

              {/* Modern Custom File Upload */}
              <div style={styles.fileUploadWrapper}>
                <label htmlFor="resume-upload" className="upload-zone" style={styles.customUploadLabel}>
                  {resume ? (
                    <>
                      <FileText size={32} color={BRAND_COLOR} style={{ marginBottom: "10px" }} />
                      <span style={{ color: TEXT_DARK, fontWeight: "600" }}>{resume.name}</span>
                      <span style={styles.uploadSubtext}>Click to choose a different file</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={32} color={TEXT_MUTED} style={{ marginBottom: "10px" }} />
                      <span style={{ color: TEXT_DARK, fontWeight: "600" }}>Click to select a PDF</span>
                      <span style={styles.uploadSubtext}>Maximum file size 5MB</span>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    setResume(e.target.files[0]);
                    setMessage(""); // Clear old messages when a new file is picked
                  }}
                  id="resume-upload"
                  style={{ display: "none" }} // Hidden native input
                />
              </div>

              <button className="hover-apply-btn" style={styles.applyBtn} onClick={handleApply}>
                <Send size={18} /> Apply Now
              </button>

              {/* Status Messages */}
              {message && (
                <div style={isError ? styles.errorMsgBox : styles.successMsgBox}>
                  {isError ? (
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  ) : (
                    <CheckCircle size={18} style={{ flexShrink: 0 }} />
                  )}
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>
        )}
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
    color: TEXT_DARK,
    marginTop: "40px", // added to clear absolute back button on mobile
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
  card: {
    background: "#ffffff",
    padding: "50px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
    opacity: 0,
    animation: "slideUp 0.6s ease-out forwards",
  },
  jobHeader: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "20px",
    color: TEXT_DARK,
    lineHeight: "1.2",
  },
  badgesContainer: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#F1F5F9",
    padding: "8px 16px",
    borderRadius: "40px",
    fontSize: "14px",
    fontWeight: "600",
    color: TEXT_MUTED,
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "35px 0",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "20px",
    color: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  descriptionText: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#475569", // Slightly darker muted for better readability on long text
  },
  applyZone: {
    backgroundColor: "#ffffff",
    border: `1px solid #e2e8f0`,
    borderRadius: "16px",
    padding: "40px 30px",
    textAlign: "center",
    marginTop: "50px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
  },
  applyTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
    color: TEXT_DARK,
  },
  applySubtitle: {
    fontSize: "15px",
    color: TEXT_MUTED,
    marginBottom: "30px",
  },
  fileUploadWrapper: {
    marginBottom: "25px",
  },
  customUploadLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: "#F8FAFC",
    border: "2px dashed #cbd5e1",
    borderRadius: "12px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  },
  uploadSubtext: {
    fontSize: "13px",
    color: TEXT_MUTED,
    marginTop: "6px",
  },
  applyBtn: {
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    border: "none",
    borderRadius: "40px",
    padding: "16px 40px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
  },
  successMsgBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "25px",
    padding: "16px",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: "#16a34a",
    borderRadius: "12px",
    border: "1px solid rgba(34, 197, 94, 0.2)",
    fontWeight: "600",
    maxWidth: "500px",
    margin: "25px auto 0",
  },
  errorMsgBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "25px",
    padding: "16px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#dc2626",
    borderRadius: "12px",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    fontWeight: "600",
    maxWidth: "500px",
    margin: "25px auto 0",
  },
};

export default JobDetails;