import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  ArrowLeft, 
  Briefcase, 
  Building2, 
  MapPin, 
  AlignLeft, 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await api.post("/jobs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Job posted successfully!");
      setIsError(false);

      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error posting job.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Injecting Keyframes and Hover/Focus Effects */}
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
          .input-field {
            transition: all 0.3s ease;
          }
          .input-field:focus {
            border-color: ${BRAND_COLOR} !important;
            box-shadow: 0 0 0 4px rgba(0, 210, 181, 0.1) !important;
            background: #ffffff !important;
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
            transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          }
          .hover-btn:not(:disabled):hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 210, 181, 0.4);
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
            Post a <span style={styles.textHighlight}>New Job</span>
          </h2>
          <p style={styles.pageSubtitle}>
            Create a listing to find the perfect candidate for your team.
          </p>
        </div>

        {/* Form Card */}
        <div style={styles.card}>
          {message && (
            <div style={isError ? styles.errorBox : styles.successBox}>
              {isError ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Job Title</label>
              <div style={styles.inputWrapper}>
                <Briefcase size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                <input
                  className="input-field"
                  type="text"
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.title}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Company Name</label>
              <div style={styles.inputWrapper}>
                <Building2 size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                <input
                  className="input-field"
                  type="text"
                  name="company"
                  placeholder="e.g. TechCorp Inc."
                  value={formData.company}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Location</label>
              <div style={styles.inputWrapper}>
                <MapPin size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                <input
                  className="input-field"
                  type="text"
                  name="location"
                  placeholder="e.g. Remote, New York, NY"
                  value={formData.location}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Job Description</label>
              <div style={styles.textareaWrapper}>
                <AlignLeft size={18} color={TEXT_MUTED} style={styles.textareaIcon} />
                <textarea
                  className="input-field"
                  name="description"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={formData.description}
                  onChange={handleChange}
                  style={styles.textarea}
                  rows="6"
                  required
                />
              </div>
            </div>

            <button type="submit" className="hover-btn" style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="spin-icon" /> Posting...
                </>
              ) : (
                <>
                  <Send size={18} /> Publish Job Listing
                </>
              )}
            </button>
          </form>
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
    backgroundColor: "#F8FAFC", 
    minHeight: "100vh",
    color: TEXT_DARK,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "60px 20px",
  },
  circle1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: `linear-gradient(135deg, rgba(0, 210, 181, 0.15), rgba(99, 102, 241, 0.05))`,
    borderRadius: "50%",
    filter: "blur(100px)",
    top: "-100px",
    left: "-100px",
    animation: "float 10s infinite ease-in-out",
    zIndex: 0,
    pointerEvents: "none",
  },
  circle2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(244, 114, 182, 0.1))",
    borderRadius: "50%",
    filter: "blur(100px)",
    bottom: "10%",
    right: "-100px",
    animation: "float 12s infinite ease-in-out reverse",
    zIndex: 0,
    pointerEvents: "none",
  },
  main: {
    position: "relative",
    zIndex: 1,
    maxWidth: "700px",
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
  textHighlight: {
    color: BRAND_COLOR,
  },
  pageTitle: {
    fontSize: "36px",
    fontWeight: "800",
    margin: "0 0 15px 0",
    color: TEXT_DARK,
    marginTop: "40px", // added to avoid overlap with absolute back btn on mobile
  },
  pageSubtitle: {
    color: TEXT_MUTED,
    fontSize: "16px",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  card: {
    background: "#ffffff",
    padding: "50px",
    borderRadius: "20px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
    animation: "slideUp 0.6s ease-out forwards",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: TEXT_DARK,
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  textareaWrapper: {
    position: "relative",
    display: "flex",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    pointerEvents: "none",
  },
  textareaIcon: {
    position: "absolute",
    left: "14px",
    top: "14px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "15px 15px 15px 44px", // Extra padding-left for the icon
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "#F8FAFC",
    color: TEXT_DARK,
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "15px 15px 15px 44px", // Extra padding-left for the icon
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "#F8FAFC",
    color: TEXT_DARK,
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "10px",
    background: BRAND_COLOR,
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  successBox: {
    padding: "15px",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: "#16a34a",
    border: "1px solid rgba(34, 197, 94, 0.2)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "30px",
    fontSize: "15px",
    fontWeight: "600",
  },
  errorBox: {
    padding: "15px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#dc2626",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "30px",
    fontSize: "15px",
    fontWeight: "600",
  },
};

export default PostJob;