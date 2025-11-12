import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import products from "@/data/products.json";
import { ArrowRight, Gem, ChefHat, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Import images for the new sections
import heroImage1 from "@/assets/Soya stick.jpg"; // Now Soya Stick
import heroImage2 from "@/assets/Banana chips.jpg";
import heroImage3 from "@/assets/Chocobiscuit.jpg"; // Now Choco Biscuit
import heroImage4 from "@/assets/Dall mount mixer.jpg";
import heroImage5 from "@/assets/masalmuruku.jpg";
import heroImage6 from "@/assets/Moong dal.jpg";
import promiseImage from "@/assets/masalmuruku.jpg";

const heroImages = [
  heroImage1, // Soya Stick
  heroImage3, // Choco Biscuit
  heroImage2,
  heroImage4,
  heroImage5,
  heroImage6,
];

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center ">
            {/* Text Content */}
            <div className="flex flex-col text-center md:text-left animate-fade-in">
              <div className="order-2 md:order-1">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4 text-foreground animate-slide-up leading-tight">
                  Your Favorite South Indian Snacks, Now Online!
                </h1>
                <h2 className="text-lg md:text-xl text-primary font-semibold tracking-wider mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                 “Crispy, spicy, and made fresh just for you.”
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                 SS Snacks brings you homemade chips, mixtures, and traditional treats packed with authentic flavor. Taste the joy of South India in every bite.
                </p>
              </div>
              <div className="order-3 md:order-2 flex flex-col sm:flex-row gap-4 justify-center md:justify-start" style={{ animationDelay: "0.4s" }}>
                <Link to="/shop">
                  <Button size="lg" className="text-lg px-10 py-6 rounded-full">
                    Explore Snacks 
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-6 rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="animate-fade-in flex justify-center md:justify-end" style={{ animationDelay: "0.2s" }}>
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-sm md:max-w-md mt-8 md:mt-0"
              >
                <CarouselContent>
                  {heroImages.map((img, index) => (
                    <CarouselItem key={index}><img src={img} alt={`Showcase snack ${index + 1}`} className="w-full h-auto rounded-2xl shadow-2xl object-cover aspect-square" /></CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Our Signature Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted with passion, served with pride
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Promise Image */}
              <div className="animate-fade-in md:col-span-2">
                <img src={promiseImage} alt="Freshly made snacks" className="rounded-2xl shadow-xl" />
              </div>

              {/* Promise Points */}
              <div className="animate-fade-in md:col-span-3" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-4xl md:text-5xl font-semibold mb-8">The SS Snacks Promise</h2>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="w-12 h-12 mr-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Gem className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Premium Quality</h3>
                      <p className="text-muted-foreground">We source only the finest ingredients to ensure every snack meets our high standards.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-12 h-12 mr-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Traditional Methods</h3>
                      <p className="text-muted-foreground">Time-honored recipes crafted with care, preserving authentic flavors.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-12 h-12 mr-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Always Fresh</h3>
                      <p className="text-muted-foreground">Made fresh to order, delivering maximum crunch and flavor in every pack.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
                </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
