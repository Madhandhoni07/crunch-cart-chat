import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import products from "@/data/products.json";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCartHook } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import BounceCard from "@/components/BounceCard";

// Use Cloudinary URLs for hero images
const heroImages = [
  "https://res.cloudinary.com/dnktlb1cp/image/upload/v1764314561/Soya_stick_nvhj76.jpg", // Soya Stick
  "https://res.cloudinary.com/dnktlb1cp/image/upload/v1764314290/Chocobiscuit_xppdsu.jpg", // Choco Biscuit
  "https://res.cloudinary.com/dnktlb1cp/image/upload/v1764314586/Banana_chips_gix4so.jpg", // Banana Chips
  "https://res.cloudinary.com/dnktlb1cp/image/upload/v1764314559/Dall_mount_mixer_hzkxsu.jpg", // Dalmount Mixture
  "https://res.cloudinary.com/dnktlb1cp/image/upload/v1764314632/Murukku_salted_uze5my.jpg", // Murukku
  "https://res.cloudinary.com/dnktlb1cp/image/upload/v1764314614/Moong_dal_hausqk.jpg", // Moong Dal
];

const Home = () => {
  // Hardcode userId to allow anonymous cart access.
  const hardcodedUserId = "anonymous-user";
  const { addItem } = useCartHook(hardcodedUserId);
  const { toast } = useToast();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  if (featuredProducts.length < 8) {
    featuredProducts.push(...products.filter(p => !p.featured).slice(0, 8 - featuredProducts.length));
  }

  const handleAddToCart = (product: any, quantity: number, selectedWeight: string) => {
    const currentPrice = product.weights ? (product.weights[selectedWeight] || product.price) : product.price;
    const productToAdd = {
      ...product,
      price: currentPrice,
      weight: selectedWeight,
    };
    addItem(productToAdd, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedWeight}) added to your cart.`,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center ">
            {/* Text Content */}
            <div className="flex flex-col text-center md:text-left animate-fade-in">
              <div className="order-2 md:order-1">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4 text-green-600 animate-slide-up leading-tight">
                  Your Favorite South Indian Snacks, Now Online!
                </h1>
                <h2 className="text-lg md:text-xl text-black font-semibold tracking-wider mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Our Signature Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted with passion, served with pride
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4">The SS Snacks Promise</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <Link to="/about">
                <BounceCard title="Premium Quality" imgSrc={heroImages[0]} />
              </Link>
              <Link to="/about">
                <BounceCard title="Traditional Methods" imgSrc={heroImages[4]} />
              </Link>
              <Link to="/about">
                <BounceCard title="Always Fresh" imgSrc={heroImages[5]} />
              </Link>
            </div>
            {/* Promise Image */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
