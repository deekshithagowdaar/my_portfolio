import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Journey from "./pages/Journey";
import Projects from "./pages/Projects";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

function App() {

  useEffect(() => {
  if (!document.getElementById("chatbase-script")) {
    window.chatbaseConfig = {
      chatbotId: "z9GGP7DGnqi4jz2gj161I",
    };

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.id = "chatbase-script";

    document.body.appendChild(script);
  }
}, []);


  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/journey" element={<Journey />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
