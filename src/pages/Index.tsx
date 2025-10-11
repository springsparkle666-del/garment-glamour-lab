import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import CinematicRunway from "@/components/CinematicRunway";
import FabricInteraction from "@/components/FabricInteraction";
import FashionDNA from "@/components/FashionDNA";
import PremiumMembership from "@/components/PremiumMembership";
import SustainabilityTracker from "@/components/SustainabilityTracker";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Collections />
      <CinematicRunway />
      <FabricInteraction />
      <FashionDNA />
      <PremiumMembership />
      <SustainabilityTracker />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
