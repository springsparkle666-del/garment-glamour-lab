import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import collection1 from "@/assets/collection-luxury-couture.jpg";
import collection2 from "@/assets/collection-runway-2025.jpg";
import collection3 from "@/assets/collection-urban-vogue.jpg";
import collection4 from "@/assets/collection-premium-bridal.jpg";
import collection5 from "@/assets/collection-heritage-revival.jpg";
import collection6 from "@/assets/collection-future-form.jpg";

const runwayCollections = [
  { image: collection1, title: "Luxury Couture", tagline: "Handcrafted Excellence" },
  { image: collection2, title: "Runway 2025", tagline: "Future of Fashion" },
  { image: collection3, title: "Urban Vogue", tagline: "Street Sophistication" },
  { image: collection4, title: "Premium Bridal", tagline: "Eternal Elegance" },
  { image: collection5, title: "Heritage Revival", tagline: "Timeless Tradition" },
  { image: collection6, title: "Future Form", tagline: "Tomorrow's Vision" },
];

const CinematicRunway = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Auto-scroll when playing
    let scrollInterval: NodeJS.Timeout;
    if (isPlaying && scrollContainerRef.current) {
      scrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft += 1;
          
          // Loop back to start
          const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
          if (scrollContainerRef.current.scrollLeft >= maxScroll) {
            scrollContainerRef.current.scrollLeft = 0;
          }
        }
      }, 30);
    }
    return () => clearInterval(scrollInterval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 py-24">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground font-serif">
            Cinematic Runway
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Experience fashion in motion. A curated journey through our exclusive collections.
          </p>
          
          {/* Controls */}
          <div className="flex gap-4 justify-center items-center">
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-5 w-5" /> Pause Show
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" /> Start Show
                </>
              )}
            </Button>
            <Button
              onClick={toggleMute}
              variant="outline"
              size="lg"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Horizontal Scrolling Runway */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide px-8 py-12"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {runwayCollections.map((collection, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] md:w-[600px] group"
              style={{
                animation: isPlaying ? `fadeInSlide 0.8s ease-out ${index * 0.2}s both` : "none",
              }}
            >
              <div className="relative h-[70vh] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Collection Info */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-4xl font-bold mb-2 font-serif">
                    {collection.title}
                  </h3>
                  <p className="text-xl text-white/90 mb-4">{collection.tagline}</p>
                  <div className="w-20 h-1 bg-accent" />
                </div>

                {/* Spotlight Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-radial from-white/50 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Audio Element - using a royalty-free ambient track URL */}
        <audio
          ref={audioRef}
          loop
          muted={isMuted}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CinematicRunway;
