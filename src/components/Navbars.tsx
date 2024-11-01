"use client";
import Link from "next/link";
import React, { useState } from "react";

import AvatarNavbar from "./AvatarNavbar";
import ButtonDarkMode from "./ButtonDarkMode";
import { usePathname } from "next/navigation";

export default function NavbarAvatar() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const pathname = usePathname();

  // Cek jika pathname dimulai dengan "/dashboard", maka tidak render navbar
  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <>
      <header className="relative z-20 w-full  bg-background dark:bg-black border-b border-black dark:border-gray-700 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="max-w-7xl mx-auto w-full">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/* Brand logo */}
            <Link
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
              href="/"
            >
              <img src="/logo.jpg" alt="Logo" className="w-15 h-16 px-4" />
            </Link>
            {/* Mobile trigger */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/* Navigation links */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-center lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-center">
                <Link
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-foreground dark:text-gray-300 hover:text-gray-400 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="/blog"
                >
                  <span>Blog</span>
                </Link>
              </li>
              <li role="none" className="flex items-center">
                <Link
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-foreground dark:text-gray-300 hover:text-gray-400 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="/discuss"
                >
                  <span>Discuss</span>
                </Link>
              </li>
              <li role="none" className="flex items-center">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-foreground dark:text-gray-300 hover:text-gray-400 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="/about"
                >
                  <span>About me</span>
                </a>
              </li>
              <li role="none" className="flex items-center mr-4">
                <ButtonDarkMode />
              </li>
            </ul>
            <div className="mr-6 flex items-center px-6 lg:ml-0 lg:p-0">
              <AvatarNavbar />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
