import React from "react";
import { useLocation } from "react-router-dom";
import MarkdownRenderer from "../components/MarkdownRenderer";

const RenderPage = () => {
  const location = useLocation();
  const markdown = location.state?.markdown || "";

  return (
    <div>
      <MarkdownRenderer markdown={markdown} />
    </div>
  );
};

export default RenderPage;
