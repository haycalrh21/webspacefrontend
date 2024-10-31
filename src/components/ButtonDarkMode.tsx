"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";

export default function ButtonDarkMode() {
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    // Memeriksa mode dari localStorage di sisi klien
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    document.documentElement.classList.toggle("dark", storedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div>
      <Button
        onClick={toggleDarkMode}
        className="bg-slate-800 text-white p-2 rounded-md"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
}
