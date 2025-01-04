import React, { useEffect, useState } from "react";
import { marked } from "marked";
import "github-markdown-css/github-markdown.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import mermaid from "mermaid"; // Import Mermaid

const MarkdownRenderer = ({ markdown }) => {
  const [processedMarkdown, setProcessedMarkdown] = useState("");

  // Preprocess Markdown to render Mermaid diagrams
  useEffect(() => {
    const processMermaid = async () => {
      // Initialize Mermaid
      mermaid.initialize({ startOnLoad: false });

      // Find all Mermaid code blocks
      const mermaidBlocks = [];
      let processedMarkdown = markdown.replace(
        /```mermaid([\s\S]*?)```/g,
        (match, code) => {
          const id = `mermaid-${mermaidBlocks.length}`;
          mermaidBlocks.push({ id, code });
          return `<!-- MERMAID-PLACEHOLDER:${id} -->`;
        }
      );

      // Render Mermaid diagrams and replace placeholders with SVGs
      for (const block of mermaidBlocks) {
        try {
          const { svg } = await mermaid.render(block.id, block.code);
          processedMarkdown = processedMarkdown.replace(
            `<!-- MERMAID-PLACEHOLDER:${block.id} -->`,
            svg
          );
        } catch (error) {
          console.error("Error rendering Mermaid diagram:", error);
          processedMarkdown = processedMarkdown.replace(
            `<!-- MERMAID-PLACEHOLDER:${block.id} -->`,
            `<pre><code>Error rendering Mermaid diagram</code></pre>`
          );
        }
      }

      // Set the processed Markdown for rendering
      setProcessedMarkdown(processedMarkdown);
    };

    processMermaid();
  }, [markdown]);

  // Configure marked to use highlight.js for code blocks
  marked.setOptions({
    highlight: (code, language) => {
      const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(code, { language: validLanguage }).value;
    },
  });

  // Apply syntax highlighting after rendering
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [processedMarkdown]);

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: marked(processedMarkdown) }} />
    </div>
  );
};

export default MarkdownRenderer;
