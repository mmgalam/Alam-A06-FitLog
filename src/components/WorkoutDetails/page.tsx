"use client";

import { Workout } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { LuCalendarPlus2 } from "react-icons/lu";

interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  const [toast, setToast] = useState("");

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ================= ADD TO PLAN ================= */

  const addToPlan = () => {
    const oldPlan: Workout[] = JSON.parse(
      localStorage.getItem("todayPlan") || "[]",
    );

    if (oldPlan.length >= 5) {
      showToast("Maximum 5 workouts allowed");
      return;
    }

    const alreadyAdded = oldPlan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      showToast("Workout is already in your plan");
      return;
    }

    const newPlan = [...oldPlan, workout];

    localStorage.setItem("todayPlan", JSON.stringify(newPlan));

    window.dispatchEvent(new Event("fitlog-storage-update"));

    showToast("Added to today's plan ✓");
  };

  /* ================= SAVE ================= */

  const saveWorkout = () => {
    const oldSaved: Workout[] = JSON.parse(
      localStorage.getItem("savedWorkouts") || "[]",
    );

    const alreadySaved = oldSaved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      showToast("Workout is already saved");
      return;
    }

    const newSaved = [...oldSaved, workout];

    localStorage.setItem("savedWorkouts", JSON.stringify(newSaved));

    window.dispatchEvent(new Event("fitlog-storage-update"));

    showToast("Saved for later ✓");
  };

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-block text-xs text-gray-500 transition hover:text-[#C2F800]"
        >
          <IoIosArrowRoundBack /> Back to workouts
        </Link>

        <div className="grid gap-7 lg:grid-cols-2">
          <div className="relative h-100 overflow-hidden rounded-xl sm:h-125 lg:h-150">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold uppercase sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {workout.description}
            </p>

            {/* Badge */}
            <div className="mt-3 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#C2F800] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Spece */}
            <div className="mt-5 overflow-hidden rounded-xl border border-[#242830] bg-[#15181E]">
              <div className="flex justify-between border-b border-[#242830] px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Equipment</span>
                <span>{workout.equipment}</span>
              </div>

              <div className="flex justify-between border-b border-[#242830] px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Difficulty</span>
                <span>{workout.difficulty}</span>
              </div>

              <div className="flex justify-between border-b border-[#242830] px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Sets</span>
                <span>{workout.sets}</span>
              </div>

              <div className="flex justify-between border-b border-[#242830] px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Reps</span>
                <span>{workout.reps}</span>
              </div>

              <div className="flex justify-between border-b border-[#242830] px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Duration</span>
                <span>{workout.duration} min</span>
              </div>

              <div className="flex justify-between border-b border-[#242830] px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Calories</span>
                <span>{workout.caloriesBurned} kcal</span>
              </div>

              <div className="flex justify-between px-4 py-3 text-xs">
                <span className="uppercase text-gray-500">Rating</span>
                <span>{workout.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-5">
              <h2 className="text-sm font-bold uppercase">Instructions</h2>

              <ol className="mt-3 space-y-2 text-xs text-gray-400">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-2">
                    <span>{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={addToPlan}
                className="flex items-center gap-1.5 rounded-md bg-[#C2F800] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#b5eb00]"
              >
                <LuCalendarPlus2 /> Add to today&apos;s plan
              </button>

              <button
                onClick={saveWorkout}
                className="flex items-center gap-1.5 rounded-md border border-[#30343C] px-5 py-2.5 text-xs text-gray-300 transition hover:bg-[#1A1D23]"
              >
                <CiBookmark /> Save for later
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#C2F800] px-5 py-3 text-xs font-bold text-black shadow-2xl">
          {toast}
        </div>
      )}
    </main>
  );
};

export default WorkoutDetails;
