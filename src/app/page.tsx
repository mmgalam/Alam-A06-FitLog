import Banner from "@/components/Banner/page";
import WorkoutGrid from "@/components/WorkoutGrid/page";


const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#0D0F12]">
      <Banner />

      <WorkoutGrid />

    </main>
  );
};

export default HomePage;