import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Announcements from "@/components/home/Announcements";
import Stats from "@/components/home/Stats";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <Announcements />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
    </>
  );
}
