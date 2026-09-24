import { Workout } from "@/types/page";
import WorkoutCard from "../WorkoutCard/page";

import { oswald } from "@/app/layout";

const workoutLibraries = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data: Workout[] = await res.json();
  return data;
};

const WorkoutGrid = async () => {
  const workoutLibrariesData = await workoutLibraries();

  return (
    <div className="container mx-auto">
      <div className="pb-6">
        <h2 className={`${oswald.className} font-bold text-2xl`}>
          THE LIBRARY
        </h2>
        <p>Twelve lifts covering every major muscle group.</p>
      </div>

      <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workoutLibrariesData.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutGrid;
