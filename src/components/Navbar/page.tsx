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

  useEffect(() => {
    const updateCounts = () => {
      try {
        const plan = JSON.parse(localStorage.getItem("todayPlan") || "[]");

        const saved = JSON.parse(localStorage.getItem("savedWorkouts") || "[]");

        setPlanCount(Array.isArray(plan) ? plan.length : 0);
        setSavedCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setPlanCount(0);
        setSavedCount(0);
      }
    };

    updateCounts();

    const handleFitLogUpdate = () => {
      updateCounts();
    };

    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-storage-update", handleFitLogUpdate);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-storage-update", handleFitLogUpdate);
    };
  }, []);

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={`rounded-full px-5 py-2 ${
            pathname === "/"
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
          className={`rounded-full px-5 py-2 ${
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
        {/* Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Image src={Logo} alt="FitLog Logo" width={35} height={35} />
            FITLOG
          </Link>
        </div>

        {/* Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{links}</ul>
        </div>

        {/* Badges */}
        <div className="navbar-end gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#C2F800] px-4 py-2 text-sm font-bold text-black"
          >
            Plan
            <span className="rounded-full bg-black px-2 text-[#C2F800]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-[#C2F800] px-4 py-2 text-sm font-bold"
          >
            Saved
            <span className="rounded-full bg-[#C2F800] px-2 text-black">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
