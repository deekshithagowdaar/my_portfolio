import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Index() {
  const [text, setText] = useState("");
  const fullText = "Booting my interactive portfolio environment...";
  const navigate = useNavigate();

  // Typing animation
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // ✅ Load Chatbase only on Home page
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "z9GGP7DGnqi4jz2gj161I";
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("z9GGP7DGnqi4jz2gj161I");
      if (existingScript) {
        existingScript.remove();
      }
    };
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
