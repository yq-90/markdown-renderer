import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";

const UploadPage = () => {
  const navigate = useNavigate();

  const handleFileUpload = (content) => {
    // Navigate to the render page with the Markdown content
    navigate("/render", { state: { markdown: content } });
  };

  return (
    <div>
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
};

export default UploadPage;
