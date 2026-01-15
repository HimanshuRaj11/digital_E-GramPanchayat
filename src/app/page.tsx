import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Footer from "@/components/layout/Footer";
import Announcements from "@/components/home/Announcements";
import Stats from "@/components/home/Stats";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex flex-col">
      <Navbar />
      <main className="grow pt-24"> {/* Adjusted padding for taller navbar */}
        <Announcements />
        <Hero />
        <Stats />
        <Services />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
