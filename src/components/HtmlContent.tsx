import React from "react";

interface HtmlContentProps {
  content?: string;
  className?: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ content, className }) => {
  if (!content) return null;

  // Tambahkan styling langsung ke konten HTML
  let styledContent = content;

  // Tentukan style untuk mode terang dan gelap
  const darkModeStyles = {
    backgroundColor: "black",
    color: "white",
  };

  const lightModeStyles = {
    backgroundColor: "white",
    color: "black",
  };

  // Ganti semua tag <ul> dengan styling inline untuk bullet points
  styledContent = styledContent.replace(
    /<ul>/g,
    `<ul style="list-style-type: disc; margin-left: 20px; padding-left: 0;">`
  );

  // Ganti semua tag <li> dengan styling inline untuk menambah jarak antar item
  styledContent = styledContent.replace(
    /<li>/g,
    `<li style="margin-bottom: 8px;">`
  );

  // Ganti semua tag <pre> dengan styling inline untuk background dan teks
  styledContent = styledContent.replace(
    /<pre(.*?)>/g,
    `<pre$1 style="background-color: ${darkModeStyles.backgroundColor}; color: ${darkModeStyles.color}; padding: 10px; border-radius: 5px; overflow: auto; white-space: pre-wrap; word-wrap: break-word;">`
  );

  return (
    <div
      className={className}
      style={{
        backgroundColor: darkModeStyles.backgroundColor,
        color: darkModeStyles.color,
      }}
      dangerouslySetInnerHTML={{ __html: styledContent }}
    />
  );
};

export default HtmlContent;
