import { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [role, setRole] = useState("");

  const submitFeedback = () => {
    console.log({ rating, review, role });
    alert("Thank you for your feedback! 🙌");
  };

  return (
    <div className="feedback-page">
      <div className="feedback-card">
        <h1>My_portfolio_feedback</h1>

        <p className="subtitle">
          Your valuable feedback helps me improve as a developer 🚀
        </p>

        <div className="rating">
          {[1, 2, 3, 4, 5].map(num => (
            <span
              key={num}
              className={rating >= num ? "star active" : "star"}
              onClick={() => setRating(num)}
            >
              ★
            </span>
          ))}
        </div>

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="">You are a...</option>
          <option>Recruiter</option>
          <option>Developer</option>
          <option>Teacher</option>
          <option>Student</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="What did you like? What can be improved?"
          value={review}
          onChange={e => setReview(e.target.value)}
        />

        <button onClick={submitFeedback}>Submit Feedback</button>
      </div>
    </div>
  );
}

export default Feedback;
