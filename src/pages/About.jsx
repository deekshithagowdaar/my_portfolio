import "./About.css";
import profilePic from "../me_portfolio.jpeg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function About() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Apply theme globally
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="about-page">
      {/* Theme Toggle */}
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <a href="https://github.com/deekshithagowdaar" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/deekshitha-a-r-103855303" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:deekshitharaman07@gmail.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>

      {/* Main Content */}
      <div className="about-container">
        {/* Profile */}
        <div className="profile-row fade-up">
          <div className="profile-img-wrapper">
            <img src={profilePic} alt="Deekshitha A R" className="profile-pic" />
          </div>

          <div className="profile-info">
            <h1 className="name">Deekshitha A R</h1>
            <p className="role">Aspiring Software Developer</p>
          </div>
        </div>

        {/* Education */}
        <div className="info-section fade-up">
          <h3>Education</h3>
          <p>
            <strong>B.Tech – Computer Science Engineering</strong><br />
            REVA University<br />
            <span className="muted">Expected Graduation: 2027</span>
          </p>
        </div>

        {/* Skills */}
        <div className="info-section fade-up delay">
          <h3>Skills</h3>

          <div className="skills-group">
            <h4>Programming Languages</h4>
            <div className="interests">
              <span>Java</span>
              <span>Python</span>
              <span>C</span>
              <span>SQL</span>
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>OOPS</span>
            </div>
          </div>

          <div className="skills-group">
            <h4>Computer Science Core</h4>
            <div className="interests">
              <span>Data Structures & Algorithms</span>
              <span>DBMS</span>
              <span>Operating Systems</span>
              <span>Computer Networks</span>
              <span>Problem Solving</span>
            </div>
          </div>

          <div className="skills-group">
            <h4>AI / ML & Data</h4>
            <div className="interests">
              <span>Machine Learning</span>
              <span>NLP</span>
              <span>Data Science</span>
              <span>Model Training & Evaluation</span>
              <span>AI-Powered Applications</span>
            </div>
          </div>

          <div className="skills-group">
            <h4>Development & Tools</h4>
            <div className="interests">
              <span>Full Stack Development</span>
              <span>Flutter App Development</span>
              <span>Web Development</span>
              <span>Git & GitHub</span>
              <span>VS Code</span>
              <span>Unity</span>
              <span>Android Studio</span>
              <span>Power BI</span>
            </div>
          </div>

          <div className="skills-group">
            <h4>Security & Systems</h4>
            <div className="interests">
              <span>Mobile App Security</span>
              <span>Malware & Spyware Detection</span>
              <span>Data Leak Detection</span>
              <span>Privacy & Security Compliance</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section fade-up delay-more">
          <button onClick={() => navigate("/journey")}>
            Explore My Learning Journey →
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
