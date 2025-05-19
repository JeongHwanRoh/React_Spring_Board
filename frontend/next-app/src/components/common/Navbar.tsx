"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, ArrowUpRight, Home, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function GNB() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // 현재 경로를 확인하는 훅

  const navLinks = [
    { href: "/blog", label: "BLOG",},
    { href: "/projects", label: "PROJECTS",},
    { href: "/resume", label: "RESUME"},
  ];


  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-14 px-5 sticky top-0 z-50 w-full border-b flex justify-between items-center bg-background">
      <div className="flex items-center">
        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-primary bg-transparent hover:border-2 h-8 w-8 sm:hidden"
        >
          <ChevronRight className="h-4 w-4 text-primary" />
        </button>

        {/* Navigation Links */}
        <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium gap-2">
        {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors py-3 text-primary flex items-center ${
                  isActive
                    ? "underline underline-offset-4 font-black"
                    : "hover:font-black font-bold"
                }`}
              >
                {label}
              </Link>
            );
          })}
          {/* <a
            href="https://notes.miryang.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:font-black py-3 text-primary font-bold flex items-center"
          >
            NOTES <ArrowUpRight className="h-4 w-4 ml-1" />
          </a> */}
        </nav>
      </div>

      {/* Right side: theme toggle & home */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="inline-flex items-center justify-center border border-primary bg-transparent hover:border-2 h-8 w-8 rounded-full"
          aria-label="Toggle theme"
        >
          {mounted &&
            (theme === "dark" ? (
              <Moon className="h-5 w-5 text-primary stroke-1" />
            ) : (
              <Sun className="h-5 w-5 text-primary stroke-1" />
            ))}
        </button>

        <Link href="/" className="font-extrabold">
          <button className="inline-flex items-center justify-center border border-primary bg-transparent hover:border-2 h-8 w-8 rounded-full">
            <Home className="h-5 w-5 text-primary stroke-1" />
          </button>
        </Link>
      </div>
    </header>
  );
}
