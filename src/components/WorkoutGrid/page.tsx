
import { Workout } from '@/types/workout';
import WorkoutCard from '../WorkoutCard/page';

const workoutLibraries = async() => {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data: Workout[] = await res.json();
    return data;
}

const WorkoutGrid = async() => {
    const workoutLibrariesData = await workoutLibraries();
    
    return (
        <div>
             {workoutLibrariesData.map((workout)=> (
                <WorkoutCard key={workout.id} workout={workout} />
             ))}        
        </div>
    );
};

export default WorkoutGrid;