import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

function Chat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I’m Deekshitha’s AI assistant. Ask me about her journey, projects, or skills."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔽 Auto-scroll to latest message
  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages, loading]);

  // ✅ UPDATED sendMessage logic
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      fetch("http://localhost:5000/chat", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "🤖 I didn’t get that. Could you rephrase?",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ I’m having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <h1 className="chat-title">Ask_me_anything</h1>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="chat-message bot typing">
            Thinking<span>.</span><span>.</span><span>.</span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          placeholder="Ask about projects, skills, journey..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>

      {/* EXTRA SECTION */}
      <div className="chat-extras">
        <p className="chat-note">
          Want to explore more about my work and profile?
        </p>

        <div className="chat-links">
          <a
            href="https://drive.google.com/uc?export=download&id=1zE5bfv4TsYQZbJWpRxJ_IuI1DAAUgTke"
            target="_blank"
            rel="noreferrer"
            className="resume-btn"
          >
            📄 Download Resume
          </a>

          <a
            href="https://linkedin.com/in/deekshitha-a-r-103855303"
            target="_blank"
            rel="noreferrer"
          >
            🔗 LinkedIn
          </a>

          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noreferrer"
          >
            💻 LeetCode
          </a>
        </div>

        <button
          className="feedback-btn"
          onClick={() => navigate("/feedback")}
        >
          ⭐ Rate & Review My Portfolio
        </button>
      </div>
    </div>
  );
}

export default Chat;
