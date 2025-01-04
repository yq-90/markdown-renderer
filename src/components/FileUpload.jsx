import React from "react";

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onFileUpload(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h1>Upload a Markdown File</h1>
      <input type="file" accept=".md" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
