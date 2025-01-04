import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import RenderPage from "./pages/RenderPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/render" element={<RenderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
