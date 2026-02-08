import "./Journey.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const journeyData = [
  {
    title: "🌱 Semester 1 – 2",
    subtitle: "Discovering Programming",
    content: `
Joined Computer Science Engineering — a dream turning into reality.
Got introduced to programming with C and Python.
Built logic-based programs and learned problem-solving basics.
Started exploring Data Science and Web Development.
`,
    points: [
      "Static Travel Website (HTML/CSS)",
      "Joined GLUG & Robotics Club – REVA as a Technical Member",
      "IIC Regional Meet Volunteer"
    ],
    link: "https://github.com/deekshithagowdaar/Travel_Website"
  },
  {
    title: "🚀 Semester 3",
    subtitle: "Exploring & Experimenting",
    content: `
Started backend development and full-stack projects.
Explored Unity Game Development and cybersecurity basics.
Java became my strongest and favorite language.
`,
    points: [
      "Top 5 – Code Quest 2.0",
      "Finalist – Innotech Ideathon (IIT Bombay)",
      "Outstanding Student – Unity Game Dev",
      "Hackathons, Microsoft / SAP / Nokia workshops"
    ],
    links: [
      {
        label: "🌍 TravelLoop – Full Stack Web App",
        url: "https://github.com/deekshithagowdaar/traveloop-journeys"
      },
      {
        label: "✈️ Unity Plane Game",
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
    title: "⚙️ Semester 4",
    subtitle: "Strengthening Foundations",
    content: `
Deep dive into DSA, Java, DBMS, DAA and IoT.
Built real-world database & IoT-based projects.
`,
    points: [
      "Scheme Recommendation System (SQL)",
      "Smart Parking System (IoT)",
      "MongoDB & Power BI Projects",
      "Intro to Cloud (IDMC)"
    ],
    links: [
      {
        label: "🗂️ Scheme Recommendation System",
        url: "https://github.com/deekshithagowdaar/scheme_recommendation_system"
      },
      {
        label: "📊 Power BI Dashboards",
        url: "https://github.com/deekshithagowdaar/PowerBI_Dashboards"
      },
      {
        label: "🚙IOT Smart Parking System",
        url: "https://github.com/deekshithagowdaar/Smart_Parking_System-IOT-"
      }
    ]
  },
  {
    title: "🤖 Semester 5",
    subtitle: "AI, ML & Big Data",
    content: `
Entered the world of Machine Learning & AI.
Worked on predictive systems and NLP-based solutions.
Joined Spark Club at REVA as Technical Team Lead.
`,
    points: [
      "Road Accident Prediction",
      "Heart Attack Risk Prediction",
      "Loan Approval (PySpark)",
      "Fake News Detection (NLP)",
      "Advanced Cloud Platforms"
    ],
    links: [
      {
        label: "🚦 Road Accident Prediction",
        url: "https://github.com/deekshithagowdaar/Road_Accident_Prediction"
      },
      {
        label: "❤️ Heart Attack Risk Prediction",
        url: "https://github.com/deekshithagowdaar/HeartAttack_Risk_Preddiction"
      },
      {
        label: "💳 Loan Approval (PySpark)",
        url: "https://github.com/deekshithagowdaar/Loan_Approval_Prediction"
      },
      {
        label: "📰 Fake News Detection (NLP)",
        url: "https://github.com/deekshithagowdaar/FakeNews_Detection"
      }
    ]
  },
  {
    title: "✨ What’s Next?",
    subtitle: "Journey Continues",
    content: `
This journey is still being written.
New semesters, new challenges, stronger skills ahead.
`,
    points: ["Updating as I cross the next semester 🚀"],
    isFinal: true
  }
];

function Journey() {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    cardRefs.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="journey-page">
      <h1 className="journey-title">My_learning_journey</h1>

      <div className="timeline">
        {journeyData.map((item, index) => (
          <div
            key={index}
            ref={el => (cardRefs.current[index] = el)}
            data-index={index}
            className={`journey-card ${
              visibleIndex === index ? "active" : "inactive"
            }`}
          >
            <h2>{item.title}</h2>
            <h4>{item.subtitle}</h4>
            <p>{item.content}</p>

            <ul>
              {item.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>

            {/* Single GitHub link */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="github-link"
              >
                View GitHub →
              </a>
            )}

            {/* Multiple GitHub links */}
            {item.links && (
              <div className="github-links">
                {item.links.map((repo, i) => (
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

      {/* CTA */}
      <div className="journey-cta">
        <p>Want to see what I’ve built through this journey?</p>
        <button onClick={() => navigate("/projects")}>
          Explore My Projects →
        </button>
      </div>
    </div>
  );
}

export default Journey;
