import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { 
  Briefcase, 
  Mail, 
  Lock, 
  User, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Star,
  GraduationCap,
  Building,
  Sparkles
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState("");

  // Password Strength Function
  const checkStrength = (password) => {
    if (password.length < 6) return "Weak";

    if (
      password.match(/(?=.*[A-Z])/) &&
      password.match(/(?=.*[0-9])/) &&
      password.length >= 8
    )
      return "Strong";

    return "Medium";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setStrength(checkStrength(value));
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/register", formData);
      setMessage("Registration Successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Injecting Keyframes and Hover/Focus Effects for Dark Mode */}
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
            box-shadow: 0 0 0 2px rgba(45, 212, 191, 0.15) !important;
            background: #1A1A20 !important;
          }
          .input-field::placeholder {
            color: #64748B;
          }
          .hover-btn {
            transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          }
          .hover-btn:not(:disabled):hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(45, 212, 191, 0.25);
          }
          .hover-link {
            transition: color 0.2s ease;
          }
          .hover-link:hover {
            color: #ffffff !important;
            text-decoration: underline !important;
          }
          .hover-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }
          .hover-card:hover {
            transform: translateY(-5px);
            border-color: rgba(45, 212, 191, 0.3) !important;
            box-shadow: 0 12px 30px rgba(0,0,0,0.8) !important;
          }
        `}
      </style>

      {/* Ambient Background Glows */}
      <div style={styles.circle1}></div>

      <div style={styles.main}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.brandBadge}>
            <Sparkles size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            JobPortal AI Access
          </div>
          <h2 style={styles.heading}>
            Create an <span style={styles.textHighlight}>Account</span>
          </h2>
          <p style={styles.description}>
            Find Jobs. Hire Talent. Build your Career. Join us today.
          </p>
        </div>

        {/* Registration Box */}
        <div style={styles.container}>
          <div style={styles.formBox}>
            <h2 style={styles.formTitle}>Register</h2>

            {error && (
              <div style={styles.errorBox}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}
            
            {message && (
              <div style={styles.successBox}>
                <CheckCircle size={18} style={{ flexShrink: 0 }} />
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <Mail size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                  <input
                    className="input-field"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrapper}>
                  <Lock size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                  <input
                    className="input-field"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <p
                    style={{
                      marginTop: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color:
                        strength === "Strong"
                          ? "#34D399" // Emerald 400
                          : strength === "Medium"
                          ? "#FBBF24" // Amber 400
                          : "#F87171", // Red 400
                    }}
                  >
                    Strength: {strength}
                  </p>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <div style={styles.inputWrapper}>
                  <Lock size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                  <input
                    className="input-field"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    style={styles.input}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>I am a...</label>
                <div style={styles.inputWrapper}>
                  <User size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                  <select
                    className="input-field"
                    name="role"
                    style={styles.selectInput}
                    onChange={handleChange}
                    value={formData.role}
                  >
                    <option value="jobseeker" style={{ background: BG_INPUT }}>Job Seeker</option>
                    <option value="recruiter" style={{ background: BG_INPUT }}>Recruiter</option>
                  </select>
                </div>
              </div>

              <button className="hover-btn" style={styles.button} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin-icon" style={{ marginRight: "8px" }} />
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <p style={styles.loginText}>
              Already have an account?
              <Link to="/" className="hover-link" style={styles.loginLink}>
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Info Sections (Grid) */}
        <div style={styles.infoGrid}>
          <div className="hover-card" style={styles.infoCard}>
            <div style={styles.infoIconWrapper}>
              <Star size={24} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.infoTitle}>Why Choose Us</h3>
            <p style={styles.infoDesc}>
              5000+ Jobs Available<br/>Top Companies Hiring<br/>Fast Recruitment
            </p>
          </div>
          <div className="hover-card" style={styles.infoCard}>
            <div style={styles.infoIconWrapper}>
              <GraduationCap size={24} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.infoTitle}>For Job Seekers</h3>
            <p style={styles.infoDesc}>
              Apply Easily<br/>Track Status<br/>Get Alerts
            </p>
          </div>
          <div className="hover-card" style={styles.infoCard}>
            <div style={styles.infoIconWrapper}>
              <Building size={24} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.infoTitle}>For Recruiters</h3>
            <p style={styles.infoDesc}>
              Post Jobs<br/>Hire Talent<br/>Manage Candidates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Deep Black Theme Variables
const BRAND_COLOR = "#2DD4BF"; // Vibrant Cyan/Teal
const BRAND_TEXT = "#022C22";  // Dark green/black for button text contrast
const TEXT_LIGHT = "#FFFFFF";  // Crisp white for headings
const TEXT_MUTED = "#8B9BB4";  // Muted blue-gray for paragraphs and placeholders
const BG_MAIN = "#000000";     // Pure Black Background
const BG_CARD = "#09090B";     // Extremely dark gray for cards
const BG_INPUT = "#141418";    // Slightly elevated dark for inputs
const BORDER_SUBTLE = "rgba(255, 255, 255, 0.08)"; // Very subtle borders

const styles = {
  page: {
    backgroundColor: BG_MAIN,
    minHeight: "100vh",
    color: TEXT_LIGHT,
    overflowY: "auto",
    overflowX: "hidden",
    position: "relative",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "60px 20px",
  },
  circle1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: `radial-gradient(circle, rgba(45, 212, 191, 0.12) 0%, rgba(0, 0, 0, 0) 60%)`,
    borderRadius: "50%",
    filter: "blur(60px)",
    top: "-150px",
    left: "50%",
    transform: "translateX(-50%)",
    animation: "float 12s infinite ease-in-out",
    zIndex: 0,
    pointerEvents: "none",
  },
  main: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1000px",
    margin: "0 auto",
  },
  hero: {
    textAlign: "center",
    marginBottom: "40px",
    animation: "fadeIn 0.6s ease-out",
  },
  brandBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 18px",
    backgroundColor: "rgba(45, 212, 191, 0.05)",
    color: BRAND_COLOR,
    borderRadius: "40px",
    fontWeight: "600",
    fontSize: "13px",
    marginBottom: "25px",
    border: `1px solid rgba(45, 212, 191, 0.15)`,
  },
  heading: {
    fontSize: "44px",
    fontWeight: "800",
    margin: "0 0 15px 0",
    color: TEXT_LIGHT,
    letterSpacing: "-0.5px",
  },
  textHighlight: {
    color: BRAND_COLOR,
  },
  description: {
    color: TEXT_MUTED,
    fontSize: "16px",
    maxWidth: "550px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "70px",
  },
  formBox: {
    width: "100%",
    maxWidth: "460px",
    padding: "35px 40px",
    background: BG_CARD,
    borderRadius: "20px",
    border: `1px solid ${BORDER_SUBTLE}`,
    boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
    animation: "slideUp 0.6s ease-out forwards",
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "24px",
    fontWeight: "700",
    color: TEXT_LIGHT,
  },
  errorBox: {
    padding: "14px 16px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#f87171",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "25px",
    fontSize: "14px",
    fontWeight: "600",
  },
  successBox: {
    padding: "14px 16px",
    backgroundColor: "rgba(45, 212, 191, 0.1)",
    color: BRAND_COLOR,
    border: `1px solid rgba(45, 212, 191, 0.2)`,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "25px",
    fontSize: "14px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#e2e8f0",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 48px", // Space for the left icon
    borderRadius: "14px",
    border: `1px solid ${BORDER_SUBTLE}`,
    background: BG_INPUT,
    color: TEXT_LIGHT,
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  selectInput: {
    width: "100%",
    padding: "16px 16px 16px 48px", // Space for the left icon
    borderRadius: "14px",
    border: `1px solid ${BORDER_SUBTLE}`,
    background: BG_INPUT,
    color: TEXT_LIGHT,
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    cursor: "pointer",
    appearance: "none", // To make it match input cleanly (removes default dropdown arrow on some browsers)
  },
  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: BRAND_COLOR,
    color: BRAND_TEXT,
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15px",
    letterSpacing: "0.5px",
  },
  loginText: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "14px",
    color: TEXT_MUTED,
  },
  loginLink: {
    color: BRAND_COLOR,
    marginLeft: "6px",
    textDecoration: "none",
    fontWeight: "600",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    animation: "fadeIn 0.8s ease-out",
  },
  infoCard: {
    background: BG_CARD,
    padding: "30px 20px",
    borderRadius: "20px",
    border: `1px solid ${BORDER_SUBTLE}`,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  infoIconWrapper: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(45, 212, 191, 0.05)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
    border: `1px solid rgba(45, 212, 191, 0.1)`,
  },
  infoTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: TEXT_LIGHT,
    marginBottom: "10px",
  },
  infoDesc: {
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.7",
  },
};

export default Register;