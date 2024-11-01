"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function ButtonDarkMode() {
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
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
    <Button
      onClick={toggleDarkMode}
      className="p-4 rounded-md bg-gray-200 dark:bg-slate-800"
    >
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: darkMode ? 180 : 0, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {darkMode ? (
          <MoonIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        )}
      </motion.div>
    </Button>
  );
}
