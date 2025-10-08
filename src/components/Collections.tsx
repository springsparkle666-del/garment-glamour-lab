import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";

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
];

const Collections = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Featured Collections</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our curated selection of contemporary fashion pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
