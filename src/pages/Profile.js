import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  FileText, 
  Code, 
  Edit3, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    about: "",
    skills: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data);
      setProfileExists(true);
    } catch {
      setProfileExists(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (profileExists) {
        await api.put("/profile", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Profile updated successfully!");
      } else {
        await api.post("/profile", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Profile created successfully!");
        setProfileExists(true);
      }
      setEditing(false);
    } catch {
      setMessage("Error saving profile.");
    }
  };

  const skillsArray =
    formData.skills && formData.skills.trim() !== ""
      ? formData.skills.split(",").map((s) => s.trim())
      : [];

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
          .hover-btn-outline {
            transition: all 0.3s ease;
          }
          .hover-btn-outline:hover {
            background: #f8fafc !important;
            color: #0f172a !important;
            border-color: #94a3b8 !important;
          }
        `}
      </style>

      {/* Ambient Background Glows */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.main}>
        {/* Top Header / Back Button */}
        <div style={styles.headerContainer}>
          <button className="hover-back-btn" style={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.banner}></div>

          <div style={styles.card}>
            {profileExists && !editing ? (
              <div style={styles.fadeInContainer}>
                {/* Profile View Header */}
                <div style={styles.profileHeader}>
                  <div style={styles.avatar}>
                    {formData.name
                      ? formData.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>

                  <div style={styles.headerText}>
                    <h2 style={styles.name}>{formData.name}</h2>
                    <p style={styles.headline}>{formData.headline}</p>
                  </div>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>
                    <User size={20} color={BRAND_COLOR} /> About
                  </h3>
                  <p style={styles.aboutText}>
                    {formData.about || "No description added yet."}
                  </p>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>
                    <Code size={20} color={BRAND_COLOR} /> Skills
                  </h3>
                  <div style={styles.skillContainer}>
                    {skillsArray.length > 0 ? (
                      skillsArray.map((skill, i) => (
                        <span key={i} style={styles.skillTag}>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p style={{ color: "#94a3b8", fontSize: "15px" }}>No skills added.</p>
                    )}
                  </div>
                </div>

                <button
                  className="hover-btn"
                  style={styles.editBtn}
                  onClick={() => {
                    setEditing(true);
                    setMessage("");
                  }}
                >
                  <Edit3 size={16} /> Edit Profile
                </button>
              </div>
            ) : (
              /* Profile Edit/Create Form */
              <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.formTitle}>
                  {profileExists ? "Edit Profile" : "Create Profile"}
                </h2>
                <p style={styles.formSubtitle}>
                  Update your details to stand out to recruiters and companies.
                </p>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <div style={styles.inputWrapper}>
                    <User size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                    <input
                      className="input-field"
                      type="text"
                      name="name"
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Professional Headline</label>
                  <div style={styles.inputWrapper}>
                    <Briefcase size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                    <input
                      className="input-field"
                      type="text"
                      name="headline"
                      placeholder="e.g. Senior Software Engineer at TechCorp"
                      value={formData.headline}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>About You</label>
                  <div style={styles.textareaWrapper}>
                    <FileText size={18} color={TEXT_MUTED} style={styles.textareaIcon} />
                    <textarea
                      className="input-field"
                      name="about"
                      placeholder="Tell us a little about your experience, goals, and passions..."
                      value={formData.about}
                      onChange={handleChange}
                      style={styles.textarea}
                      rows="5"
                      required
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Skills</label>
                  <div style={styles.inputWrapper}>
                    <Code size={18} color={TEXT_MUTED} style={styles.inputIcon} />
                    <input
                      className="input-field"
                      type="text"
                      name="skills"
                      placeholder="e.g. React, Node.js, Python (comma separated)"
                      value={formData.skills}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div style={styles.actionRow}>
                  <button type="submit" className="hover-btn" style={styles.saveBtn}>
                    <Save size={16} /> Save Profile
                  </button>

                  {profileExists && (
                    <button
                      type="button"
                      className="hover-btn-outline"
                      style={styles.cancelBtn}
                      onClick={() => {
                        setEditing(false);
                        setMessage("");
                      }}
                    >
                      <X size={16} /> Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {/* Status Messages */}
            {message && (
              <div style={message.includes("Error") ? styles.errorBox : styles.successBox}>
                {message.includes("Error") ? (
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                ) : (
                  <CheckCircle size={18} style={{ flexShrink: 0 }} />
                )}
                <span>{message}</span>
              </div>
            )}
          </div>
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
    padding: "60px 20px",
    position: "relative",
    overflowX: "hidden",
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
    maxWidth: "800px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  headerContainer: {
    marginBottom: "40px",
    position: "relative",
    height: "40px",
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
  wrapper: {
    animation: "slideUp 0.6s ease-out forwards",
    boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
  },
  banner: {
    height: "180px",
    background: `linear-gradient(135deg, ${BRAND_COLOR}, #2563eb)`,
    borderRadius: "20px 20px 0 0",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "0 40px 40px 40px",
    borderRadius: "0 0 20px 20px",
  },
  fadeInContainer: {
    animation: "fadeIn 0.5s ease-out",
  },
  profileHeader: {
    display: "flex",
    alignItems: "flex-end",
    gap: "25px",
    marginTop: "-60px",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    border: "6px solid #ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    fontWeight: "800",
    color: BRAND_COLOR,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  headerText: {
    paddingBottom: "10px",
  },
  name: {
    fontSize: "32px",
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: "5px",
  },
  headline: {
    color: TEXT_MUTED,
    fontSize: "18px",
    fontWeight: "500",
  },
  section: {
    marginBottom: "35px",
  },
  sectionTitle: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "700",
    color: TEXT_DARK,
    borderBottom: "2px solid #f1f5f9",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  aboutText: {
    color: TEXT_MUTED,
    lineHeight: "1.8",
    fontSize: "16px",
  },
  skillContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  skillTag: {
    backgroundColor: "rgba(0, 210, 181, 0.1)",
    color: "#00b39b",
    padding: "8px 18px",
    borderRadius: "40px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid rgba(0, 210, 181, 0.2)",
  },
  editBtn: {
    padding: "14px 30px",
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    marginTop: "10px",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "40px",
    animation: "fadeIn 0.5s ease-out",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: TEXT_DARK,
    marginBottom: "10px",
  },
  formSubtitle: {
    color: TEXT_MUTED,
    marginBottom: "30px",
    fontSize: "15px",
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
    resize: "vertical",
    boxSizing: "border-box",
  },
  actionRow: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    flexWrap: "wrap",
  },
  saveBtn: {
    padding: "14px 30px",
    backgroundColor: BRAND_COLOR,
    color: "#ffffff",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  cancelBtn: {
    padding: "14px 30px",
    backgroundColor: "#ffffff",
    color: TEXT_MUTED,
    border: "1px solid #cbd5e1",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  successBox: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    color: "#16a34a",
    borderRadius: "10px",
    border: "1px solid rgba(34, 197, 94, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
  },
  errorBox: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#dc2626",
    borderRadius: "10px",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
  },
};

export default Profile;