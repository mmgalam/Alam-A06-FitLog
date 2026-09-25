"use client";

import { Workout } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

type Tab = "plan" | "saved";
type SortType = "duration" | "calories" | "rating";

const MyPlan = () => {
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const [sortBy, setSortBy] = useState<SortType>("duration");

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  /* ================= LOAD DATA ================= */

  const loadData = () => {
    try {
      const planData = JSON.parse(localStorage.getItem("todayPlan") || "[]");

      const savedData = JSON.parse(
        localStorage.getItem("savedWorkouts") || "[]",
      );

      return {
        plan: Array.isArray(planData) ? planData : [],
        saved: Array.isArray(savedData) ? savedData : [],
      };
    } catch {
      return {
        plan: [],
        saved: [],
      };
    }
  };

  useEffect(() => {
    const updateData = () => {
      const data = loadData();

      setPlan(data.plan);
      setSaved(data.saved);
      setLoading(false);
    };

    updateData();

    window.addEventListener("storage", updateData);
    window.addEventListener("fitlog-storage-update", updateData);

    return () => {
      window.removeEventListener("storage", updateData);
      window.removeEventListener("fitlog-storage-update", updateData);
    };
  }, []);

  /* ================= TOAST ================= */

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ================= REMOVE PLAN ================= */

  const removeFromPlan = (id: number) => {
    const updatedPlan = plan.filter((workout) => workout.id !== id);

    setPlan(updatedPlan);

    localStorage.setItem("todayPlan", JSON.stringify(updatedPlan));

    window.dispatchEvent(new Event("fitlog-storage-update"));

    showToast("Removed from today's plan");
  };

  /* ================= REMOVE SAVED ================= */

  const removeFromSaved = (id: number) => {
    const updatedSaved = saved.filter((workout) => workout.id !== id);

    setSaved(updatedSaved);

    localStorage.setItem("savedWorkouts", JSON.stringify(updatedSaved));

    window.dispatchEvent(new Event("fitlog-storage-update"));

    showToast("Removed from saved");
  };

  /* ================= MARK AS DONE ================= */

  const markAsDone = (workout: Workout) => {
    showToast(`${workout.name} marked as done ✓`);
  };

  /* ================= CURRENT DATA ================= */

  const currentWorkouts = activeTab === "plan" ? [...plan] : [...saved];

  /* ================= SORT ================= */

  const sortedWorkouts = currentWorkouts.sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  /* ================= METRICS ================= */

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <main className="min-h-screen bg-[#0D0F12] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold uppercase sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* ================= METRICS ================= */}

        <div className="mb-6 grid grid-cols-3 overflow-hidden rounded-xl border border-[#242830] bg-[#15181E]">

          {/* Exercises */}
          <div className="border-r border-[#242830] p-4 sm:p-5">
            <p className="text-[9px] uppercase text-gray-500 sm:text-xs">
              Exercises
            </p>

            <p className="mt-2 text-2xl font-bold text-[#C2F800] sm:text-3xl">
              {currentWorkouts.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="border-r border-[#242830] p-4 sm:p-5">
            <p className="text-[9px] uppercase text-gray-500 sm:text-xs">
              Minutes
            </p>

            <p className="mt-2 text-2xl font-bold sm:text-3xl">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="p-4 sm:p-5">
            <p className="text-[9px] uppercase text-gray-500 sm:text-xs">
              Calories
            </p>

            <p className="mt-2 text-2xl font-bold sm:text-3xl">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* ================= TABS + SORT ================= */}

        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Tabs */}
          <div className="flex w-fit rounded-md border border-[#242830] bg-[#15181E] p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`rounded px-4 py-2 text-[10px] font-semibold transition ${
                activeTab === "plan"
                  ? "bg-[#252A31] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded px-4 py-2 text-[10px] font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#252A31] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Sort By</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortType)}
              className="rounded-md border border-[#30343C] bg-[#15181E] px-3 py-2 text-xs text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        {loading ? (
          <div className="flex min-h-75 items-center justify-center rounded-xl border border-[#242830] bg-[#111419]">
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-md text-[#C2F800]" />

              <p className="text-xs text-gray-500">Loading workouts…</p>
            </div>
          </div>
        ) : sortedWorkouts.length === 0 ? (

          /* ================= EMPTY STATE ================= */

          <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed border-[#30343C] bg-[#111419] px-5 text-center">
            <h2 className="text-sm font-bold uppercase sm:text-base">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 max-w-md text-xs text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-5 rounded-full bg-[#C2F800] px-6 py-2.5 text-xs font-bold text-black transition hover:bg-[#b5eb00]"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        ) : (
          
          /* ================= WORKOUT LIST ================= */

          <div className="space-y-3">
            {sortedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-xl border border-[#242830] bg-[#15181E] p-3 transition hover:border-[#3B414B] sm:flex sm:items-center sm:gap-4"
              >
                {/* Image */}
                <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-28">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="mt-3 min-w-0 flex-1 sm:mt-0">
                  <h3 className="truncate text-sm font-bold uppercase">
                    {workout.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-gray-400">
                    <span>◷ {workout.duration} min</span>

                    <span>♥ {workout.caloriesBurned} kcal</span>

                    <span>☆ {workout.rating}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex shrink-0 items-center gap-2 sm:mt-0">
                  {/* View Details */}
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-full border border-[#30343C] px-3 py-1.5 text-[10px] text-gray-300 transition hover:bg-[#20242B]"
                  >
                    View Details
                  </Link>

                  {/* Mark Done */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(workout)}
                      className="rounded-full bg-[#C2F800] px-3 py-1.5 text-[10px] font-bold text-black transition hover:bg-[#b5eb00]"
                    >
                      ✓ Mark as Done
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="px-1 text-lg text-gray-500 transition hover:text-red-400"
                    title="Remove"
                  >
                    <ImCross />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= TOAST ================= */}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-999 -translate-x-1/2 rounded-lg bg-[#C2F800] px-5 py-3 text-xs font-bold text-black shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
};

export default MyPlan;
