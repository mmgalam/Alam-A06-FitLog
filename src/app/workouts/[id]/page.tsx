"use client";

import { useEffect, useState } from "react";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading workouts…</p>;
  }

  return (
    <div>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <h2>{workout.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;