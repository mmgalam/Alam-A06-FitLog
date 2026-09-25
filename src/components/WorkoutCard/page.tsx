import { WorkoutCardProps } from "@/types/page";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiFireSimpleFill } from "react-icons/pi";



const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="w-full cursor-pointer overflow-hidden rounded-2xl bg-[#15171D] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-56 w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Muscle Badges */}
          <div className="mb-4 flex flex-wrap gap-3">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#DFFF3F] px-5 py-2 text-sm font-bold uppercase text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h2 className="text-2xl font-extrabold uppercase tracking-wide">
            {workout.name}
          </h2>

          {/* Equipment */}
          <p className="mt-2 text-base text-gray-400">{workout.equipment}</p>

          
          <div className="my-5 border-t border-gray-700" />

          {/* Bottom Info */}
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span className="flex items-center gap-1.5"><MdOutlineWatchLater /> {workout.duration} min</span>

            <span className="flex items-center gap-1.5"><PiFireSimpleFill /> {workout.caloriesBurned} kcal</span>

            <span className="flex items-center gap-1.5"><FaRegStar /> {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
