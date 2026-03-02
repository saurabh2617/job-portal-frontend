import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { 
  Briefcase, 
  Mail, 
  Lock, 
  Loader2, 
  AlertCircle, 
  Star, 
  Globe, 
  ShieldCheck 
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/login", formData);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid Email or Password");
    }

    setLoading(false);
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
            box-shadow: 0 0 0 4px rgba(45, 212, 191, 0.15) !important;
            background: #182433 !important;
          }
          .input-field::placeholder {
            color: #64748b;
          }
          .hover-btn {
            transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
          }
          .hover-btn:not(:disabled):hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(45, 212, 191, 0.3);
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
            box-shadow: 0 12px 30px rgba(0,0,0,0.5) !important;
          }
        `}
      </style>

      {/* Ambient Background Glows */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.main}>
        {/* Hero Section */}
        <div style={styles.hero}>
          <div style={styles.brandBadge}>
            <Briefcase size={14} style={{ marginRight: "6px", verticalAlign: "middle" }} />
            JobPortal
          </div>
          <h2 style={styles.heading}>
            Welcome <span style={styles.textHighlight}>Back</span>
          </h2>
          <p style={styles.description}>
            Log in to continue your career journey and discover new opportunities.
          </p>
        </div>

        {/* Login Box */}
        <div style={styles.container}>
          <div style={styles.loginBox}>
            <h2 style={styles.title}>Sign In</h2>

            {error && (
              <div style={styles.errorBox}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrapper}>
                  <Mail size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                  <input
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    style={styles.input}
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
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <button className="hover-btn" style={styles.button} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin-icon" style={{ marginRight: "8px" }} />
                    Signing In...
                  </>
                ) : (
                  "Log In to Account"
                )}
              </button>
            </form>

            <p style={styles.registerText}>
              Don't have an account?
              <Link to="/register" className="hover-link" style={styles.registerLink}>
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Info Sections (Grid) */}
        <div style={styles.infoGrid}>
          <div className="hover-card" style={styles.infoCard}>
            <div style={styles.infoIconWrapper}>
              <Star size={28} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.infoTitle}>Trusted Platform</h3>
            <p style={styles.infoDesc}>Join thousands of professionals finding their dream roles.</p>
          </div>
          <div className="hover-card" style={styles.infoCard}>
            <div style={styles.infoIconWrapper}>
              <Globe size={28} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.infoTitle}>1000+ Jobs</h3>
            <p style={styles.infoDesc}>Explore opportunities from top companies worldwide.</p>
          </div>
          <div className="hover-card" style={styles.infoCard}>
            <div style={styles.infoIconWrapper}>
              <ShieldCheck size={28} color={BRAND_COLOR} />
            </div>
            <h3 style={styles.infoTitle}>Secure & Fast</h3>
            <p style={styles.infoDesc}>Your data is protected with enterprise-grade security.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dark Theme Variables Based on Screenshot
const BRAND_COLOR = "#2DD4BF"; // Vibrant Cyan/Teal
const BRAND_TEXT = "#022c22"; // Dark green/black for button text contrast
const TEXT_LIGHT = "#F8FAFC"; // Crisp white for headings
const TEXT_MUTED = "#94A3B8"; // Muted blue-gray for paragraphs
const BG_MAIN = "#0B111A"; // Deep dark navy background
const BG_CARD = "#121C29"; // Slightly lighter dark for cards
const BG_INPUT = "#1A2635"; // Dark input background
const BORDER_SUBTLE = "rgba(255, 255, 255, 0.08)"; // Very subtle white borders

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
    width: "500px",
    height: "500px",
    background: `radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, rgba(11, 17, 26, 0) 70%)`,
    borderRadius: "50%",
    filter: "blur(60px)",
    top: "-150px",
    left: "-150px",
    animation: "float 12s infinite ease-in-out",
    zIndex: 0,
    pointerEvents: "none",
  },
  circle2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: `radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, rgba(11, 17, 26, 0) 70%)`,
    borderRadius: "50%",
    filter: "blur(60px)",
    bottom: "5%",
    right: "-100px",
    animation: "float 10s infinite ease-in-out reverse",
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
    marginBottom: "50px",
    animation: "fadeIn 0.6s ease-out",
  },
  brandBadge: {
    display: "inline-block",
    padding: "8px 16px",
    backgroundColor: "rgba(45, 212, 191, 0.1)",
    color: BRAND_COLOR,
    borderRadius: "30px",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "25px",
    border: `1px solid rgba(45, 212, 191, 0.2)`,
  },
  textHighlight: {
    color: BRAND_COLOR,
  },
  heading: {
    fontSize: "42px",
    fontWeight: "800",
    margin: "0 0 15px 0",
    color: TEXT_LIGHT,
    letterSpacing: "-0.5px",
  },
  description: {
    color: TEXT_MUTED,
    fontSize: "17px",
    maxWidth: "550px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "70px",
  },
  loginBox: {
    width: "100%",
    maxWidth: "440px",
    padding: "45px 40px",
    background: BG_CARD,
    borderRadius: "20px",
    border: `1px solid ${BORDER_SUBTLE}`,
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    animation: "slideUp 0.6s ease-out forwards",
  },
  title: {
    textAlign: "center",
    marginBottom: "35px",
    fontSize: "24px",
    fontWeight: "700",
    color: TEXT_LIGHT,
  },
  errorBox: {
    padding: "14px 16px",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#f87171",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderRadius: "10px",
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
    marginBottom: "20px",
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
    padding: "14px 14px 14px 46px", 
    borderRadius: "12px",
    border: `1px solid ${BORDER_SUBTLE}`,
    background: BG_INPUT,
    color: TEXT_LIGHT,
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
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
  registerText: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "14px",
    color: TEXT_MUTED,
  },
  registerLink: {
    color: BRAND_COLOR,
    marginLeft: "6px",
    textDecoration: "none",
    fontWeight: "600",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    animation: "fadeIn 0.8s ease-out",
  },
  infoCard: {
    background: BG_CARD,
    padding: "35px 25px",
    borderRadius: "20px",
    border: `1px solid ${BORDER_SUBTLE}`,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  infoIconWrapper: {
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(45, 212, 191, 0.1)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    border: `1px solid rgba(45, 212, 191, 0.2)`,
  },
  infoTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: TEXT_LIGHT,
    marginBottom: "12px",
  },
  infoDesc: {
    fontSize: "14px",
    color: TEXT_MUTED,
    lineHeight: "1.7",
  },
};

export default Login;