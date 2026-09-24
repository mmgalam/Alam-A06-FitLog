import { Workout, WorkoutDetailsPageProps } from "@/types/page";
import Image from "next/image";

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Workout not found");
  }

  const workout: Workout = await res.json();

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Section */}
        <div className="grid gap-7 lg:grid-cols-2">
          {/* Left Image */}
          <div className="relative h-100 overflow-hidden rounded-lg sm:h-125 lg:h-150">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-2 text-sm leading-5 text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#DFFF3F] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specifications */}
            <div className="mt-4 overflow-hidden rounded-lg border border-[#242830] bg-[#15181E]">
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
            <div className="mt-4">
              <h2 className="text-sm font-bold uppercase">Instructions</h2>

              <ol className="mt-2 space-y-1.5 text-[11px] leading-4 text-gray-400">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-2">
                    <span>{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-md bg-[#C2F800] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#b4e900]">
                ♧&nbsp; Add to today&apos;s plan
              </button>

              <button className="rounded-md border border-[#30343C] px-4 py-2 text-xs text-gray-300 transition hover:bg-[#1A1D23]">
                ♡&nbsp; Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;
