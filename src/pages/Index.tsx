import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import PremiumMembership from "@/components/PremiumMembership";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Collections />
      <PremiumMembership />
      <About />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
