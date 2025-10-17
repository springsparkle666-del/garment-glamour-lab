import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import CinematicRunway from "@/components/CinematicRunway";
import FabricInteraction from "@/components/FabricInteraction";
import FashionDNA from "@/components/FashionDNA";
import FashionDNAQuiz from "@/components/FashionDNAQuiz";
import AIStyleAssistant from "@/components/AIStyleAssistant";
import VirtualMirror from "@/components/VirtualMirror";
import TimeCapsuleWardrobe from "@/components/TimeCapsuleWardrobe";
import DesignerConnect from "@/components/DesignerConnect";
import AIRunwayMode from "@/components/AIRunwayMode";
import PremiumMembership from "@/components/PremiumMembership";
import DigitalCloset from "@/components/DigitalCloset";
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
      <AIStyleAssistant />
      <VirtualMirror />
      <FabricInteraction />
      <FashionDNA />
      <FashionDNAQuiz />
      <TimeCapsuleWardrobe />
      <AIRunwayMode />
      <DigitalCloset />
      <DesignerConnect />
      <PremiumMembership />
      <SustainabilityTracker />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
