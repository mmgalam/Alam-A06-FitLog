export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface WorkoutCardProps {
  workout: Workout;
}

export interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}