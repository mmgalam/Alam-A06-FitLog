import Banner from "@/components/Banner/page";
import Footer from "@/components/Footer/page";
import WorkoutGrid from "@/components/WorkoutGrid/page";


const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#0D0F12]">
      <Banner />

      <WorkoutGrid />

      <Footer />
    </main>
  );
};

export default HomePage;