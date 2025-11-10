import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Welcome to <span className="text-primary">SS Snacks</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Authentic homemade snacks crafted with love, tradition, and the finest ingredients. 
              Taste the difference of quality in every bite.
            </p>
            <Link to="/shop">
              <Button size="lg" className="text-lg px-8">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Snacks</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of the most popular and beloved snacks
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

      {/* About Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose SS Snacks?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl mb-3">🥜</div>
                <h3 className="font-semibold text-lg mb-2">Quality Ingredients</h3>
                <p className="text-sm text-muted-foreground">
                  Only the finest, freshest ingredients go into our snacks
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">👨‍🍳</div>
                <h3 className="font-semibold text-lg mb-2">Handcrafted</h3>
                <p className="text-sm text-muted-foreground">
                  Made with traditional methods and recipes passed down through generations
                </p>
              </div>
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-lg mb-2">Fresh & Tasty</h3>
                <p className="text-sm text-muted-foreground">
                  Prepared fresh to order, ensuring maximum flavor and crunch
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
