// components/Navbar.tsx
"use client";
import React from "react";
import ButtonDarkMode from "./ButtonDarkMode";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Cek jika pathname dimulai dengan "/dashboard", maka tidak render navbar
  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <nav className="bg-background dark:bg-black p-4 w-full border-b border-black dark:border-gray-700">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-lg font-semibold flex items-center justify-between">
          <Link href="/">
            <img src="/logo.jpg" alt="Logo" className="w-20 h-20" />
          </Link>
          <ul className="flex space-x-6 items-center ">
            <li>
              <Link
                className="text-foreground dark:text-gray-300 hover:text-gray-400"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-foreground dark:text-gray-300 hover:text-gray-400"
                href="/blog"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="text-foreground dark:text-gray-300 hover:text-gray-400"
                href="#services"
              >
                Discussion
              </Link>
            </li>
            <li>
              <Link
                className="text-foreground dark:text-gray-300 hover:text-gray-400"
                href="#contact"
              >
                Contact
              </Link>
            </li>
            <li>
              <ButtonDarkMode />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
