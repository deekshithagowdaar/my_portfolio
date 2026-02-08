import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Index() {
  const [text, setText] = useState("");
  const fullText = "Booting my interactive portfolio environment...";
  const navigate = useNavigate();

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      <h2 className="welcome-text">
        Welcome to <span>Deekshitha A R’s</span> Portfolio
      </h2>

      <h1 className="boot-text">{text}</h1>

      

      {text.length === fullText.length && (
        <button
          className="explore-btn"
          onClick={() => navigate("/about")}
        >
          Explore More →
        </button>
      )}
    </div>
  );
}

export default Index;
