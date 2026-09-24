"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    try {
      const plan = JSON.parse(localStorage.getItem("todayPlan") || "[]");
      const saved = JSON.parse(
        localStorage.getItem("savedWorkouts") || "[]"
      );

      setPlanCount(Array.isArray(plan) ? plan.length : 0);
      setSavedCount(Array.isArray(saved) ? saved.length : 0);
    } catch {
      setPlanCount(0);
      setSavedCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-storage-update", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-storage-update", updateCounts);
    };
  }, []);

  // Desktop menu
  const desktopLinks = (
    <>
      <li>
        <Link
          href="/workouts"
          className={`rounded-full px-5 py-2 transition ${
            pathname === "/workouts"
              ? "bg-[#1A2312] text-[#C2F800]"
              : "text-white hover:bg-[#1A2312] hover:text-[#C2F800]"
          }`}
        >
          Workout
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan"
          className={`rounded-full px-5 py-2 transition ${
            pathname === "/my-plan"
              ? "bg-[#1A2312] text-[#C2F800]"
              : "text-white hover:bg-[#1A2312] hover:text-[#C2F800]"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  // Mobile menu
  const mobileLinks = (
    <>
      <li>
        <Link
          href="/workouts"
          className={`rounded-lg px-4 py-3 text-base font-medium ${
            pathname === "/workouts"
              ? "bg-[#1A2312] text-[#C2F800]"
              : "text-white hover:bg-[#1A2312] hover:text-[#C2F800]"
          }`}
        >
          Workout
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan"
          className={`rounded-lg px-4 py-3 text-base font-medium ${
            pathname === "/my-plan"
              ? "bg-[#1A2312] text-[#C2F800]"
              : "text-white hover:bg-[#1A2312] hover:text-[#C2F800]"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-black text-white">
      <div className="navbar container mx-auto min-h-20 px-4">

        {/* ================= LEFT ================= */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost mr-1 text-white hover:bg-[#1A2312] lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            {/* Mobile Dropdown */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-100 mt-3 w-56 rounded-xl border border-gray-700 bg-[#15171D] p-3 shadow-2xl"
            >
              {mobileLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-white sm:gap-3 sm:text-xl"
          >
            <Image
              src={Logo}
              alt="FitLog Logo"
              width={35}
              height={35}
              priority
            />

            <span>FITLOG</span>
          </Link>
        </div>

        {/* ================= CENTER ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {desktopLinks}
          </ul>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end gap-2 sm:gap-4">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#C2F800] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#b5eb00] sm:gap-2 sm:px-4 sm:text-sm"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] text-[#C2F800] sm:h-6 sm:min-w-6">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-[#C2F800] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#1A2312] sm:gap-2 sm:px-4 sm:text-sm"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C2F800] px-1 text-[11px] text-black sm:h-6 sm:min-w-6">
              {savedCount}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;