import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import products from "@/data/products.json";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32 animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground animate-slide-up leading-tight">
              Your Favorite South Indian Snacks, Now Online!
            </h1>
            <h2 className="text-lg md:text-xl text-primary font-medium tracking-wider mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
             “Crispy, spicy, and made fresh just for you.”
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
             SS Snacks brings you homemade chips, mixtures, and traditional treats packed with authentic flavor. Taste the joy of South India in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
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
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Signature Collection</h2>
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">The SS Snacks Promise</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="text-3xl">🥜</div>
                </div>
                <h3 className="font-bold text-xl mb-3">Premium Quality</h3>
                <p className="text-muted-foreground">
                  We source only the finest ingredients to ensure every snack meets our high standards
                </p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="text-3xl">👨‍🍳</div>
                </div>
                <h3 className="font-bold text-xl mb-3">Traditional Methods</h3>
                <p className="text-muted-foreground">
                  Time-honored recipes crafted with care, preserving authentic flavors
                </p>
              </div>
              <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="text-3xl">🎯</div>
                </div>
                <h3 className="font-bold text-xl mb-3">Always Fresh</h3>
                <p className="text-muted-foreground">
                  Made fresh to order, delivering maximum crunch and flavor in every pack
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
