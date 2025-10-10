import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collectionLuxuryCouture from "@/assets/collection-luxury-couture.jpg";
import collectionRunway2025 from "@/assets/collection-runway-2025.jpg";
import collectionUrbanVogue from "@/assets/collection-urban-vogue.jpg";
import collectionPremiumBridal from "@/assets/collection-premium-bridal.jpg";
import collectionHeritageRevival from "@/assets/collection-heritage-revival.jpg";
import collectionFutureForm from "@/assets/collection-future-form.jpg";

const collections = [
  {
    title: "Spring Essentials",
    description: "Contemporary pieces for the modern wardrobe",
    image: collection1,
  },
  {
    title: "Evening Elegance",
    description: "Sophisticated designs for special occasions",
    image: collection2,
  },
  {
    title: "Urban Collection",
    description: "Street-ready fashion with designer edge",
    image: collection3,
  },
  {
    title: "Luxury Couture",
    description: "Handmade exclusive designer pieces",
    image: collectionLuxuryCouture,
  },
  {
    title: "Runway Season 2025",
    description: "Current designer line fresh from the catwalk",
    image: collectionRunway2025,
  },
  {
    title: "Urban Vogue",
    description: "Streetwear meets luxury sophistication",
    image: collectionUrbanVogue,
  },
  {
    title: "Premium Bridal",
    description: "High-end wedding couture for your special day",
    image: collectionPremiumBridal,
  },
  {
    title: "Heritage Revival",
    description: "Sustainable eco-conscious timeless fashion",
    image: collectionHeritageRevival,
  },
  {
    title: "Future Form",
    description: "Tech-inspired avant-garde designs",
    image: collectionFutureForm,
  },
];

const Collections = () => {
  return (
    <section id="collections" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Collections</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated selection of contemporary fashion pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-foreground">{collection.title}</h3>
              <p className="text-muted-foreground">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
