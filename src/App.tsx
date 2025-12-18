import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaseDetails from "./pages/CaseDetails";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/case/:slug" element={<CaseDetails />} />
    </Routes>
  );
}

export default App;
