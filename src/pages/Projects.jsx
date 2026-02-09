import "./Projects.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const projectsData = [
  {
    title: "Travel Website",
    domain: "Web Development",
    desc: "My first web project — started as a static website and later evolved with backend concepts.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/deekshithagowdaar/traveloop-journeys"
  },
  {
    title: "Scheme Recommendation System",
    domain: "Full Stack | DBMS",
    desc: "A database-driven system to recommend government schemes based on user eligibility.",
    tech: ["Java", "SQL", "DBMS"],
    link: "https://github.com/deekshithagowdaar/scheme_recommendation_system"
  },
  {
    title: "Smart Parking System",
    domain: "IoT",
    desc: "IoT-based solution to monitor and manage parking slots efficiently.",
    tech: ["IoT", "Sensors", "MongoDB"],
    link: "https://github.com/deekshithagowdaar/Smart_Parking_System-IOT-"
  },
  {
    title: "Road Accident Prediction",
    domain: "AI / ML",
    desc: "Machine learning model to predict accident severity using real-world datasets.",
    tech: ["Python", "ML", "scikit-learn"],
    link: "https://github.com/deekshithagowdaar/Road_Accident_Prediction"
  },
  {
    title: "Heart Attack Risk Prediction",
    domain: "Machine Learning",
    desc: "Predictive system to assess heart attack risk using medical parameters.",
    tech: ["Python", "ML"],
    link: "https://github.com/deekshithagowdaar/HeartAttack_Risk_Preddiction"
  },
  {
    title: "Loan Approval Prediction",
    domain: "Big Data Analytics",
    desc: "Loan approval prediction using PySpark on large datasets.",
    tech: ["PySpark", "Big Data"],
    link: "https://github.com/deekshithagowdaar/Loan_Approval_Prediction"
  },
  {
    title: "Fake News Detection",
    domain: "AI / NLP",
    desc: "NLP-based system to classify news articles as real or fake.",
    tech: ["Python", "NLP", "ML"],
    link: "https://github.com/deekshithagowdaar/FakeNews_Detection"
  },
  {
    title: "Unity Game Development",
    domain: "Game Development",
    desc: "Built interactive games using Unity; recognized with Outstanding Student Certificate.",
    tech: ["Unity", "C#"],
    links: [
      {
        label: "✈️ Unity Plane",
        url: "https://github.com/deekshithagowdaar/Unity_plane"
      },
      {
        label: "🏎️ Unity Car Race",
        url: "https://github.com/deekshithagowdaar/Unity_CarRace"
      },
      {
        label: "🎮 Unity Roll-a-Ball",
        url: "https://github.com/deekshithagowdaar/Unity_Rollaball"
      }
    ]
  },
  {
    title: "Power BI Analytics Dashboard",
    domain: "Data Analytics",
    desc: "End-to-end dashboards for data visualization and insights.",
    tech: ["Power BI"],
    link: "https://github.com/deekshithagowdaar/PowerBI_Dashboards"
  },
  {
    title: "Plex Shield - Mobile Security & Privacy Shield",
    domain: "Mobile Application",
    desc: "Android app to detect malware, spyware, and data leaks, ensuring user privacy and security.",
    tech: ["Flutter", "Mobile Security"],
    link: "https://github.com/deekshithagowdaar/plex_shield"
  }
];

function Projects() {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.55 }
    );

    cardRefs.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects-page">
      <h1 className="projects-title">Projects_I_Built</h1>

      <div className="projects-timeline">
        {projectsData.map((project, index) => (
          <div
            key={index}
            ref={el => (cardRefs.current[index] = el)}
            data-index={index}
            className={`project-card ${
              activeIndex === index ? "active" : "inactive"
            }`}
          >
            <h2>{project.title}</h2>
            <h4>{project.domain}</h4>
            <p>{project.desc}</p>

            <div className="tech-stack">
              {project.tech.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>

            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer">
                View on GitHub →
              </a>
            )}

            {project.links && (
              <div className="github-links">
                {project.links.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="github-link"
                  >
                    {repo.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className="projects-feedback">
        <h3>Share Your Perspective ["Your Thoughts = My Growth"]</h3>
        <button
          className="feedback-btn"
          onClick={() => navigate("/feedback")}
        >
          Leave Feedback →
        </button>
      </div>
    </div>
  );
}

export default Projects;
