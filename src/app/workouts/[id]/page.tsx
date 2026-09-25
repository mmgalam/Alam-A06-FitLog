import WorkoutDetails from "@/components/WorkoutDetails/page";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  const workout = await response.json();

  return <WorkoutDetails workout={workout} />;
};

export default WorkoutDetailsPage;