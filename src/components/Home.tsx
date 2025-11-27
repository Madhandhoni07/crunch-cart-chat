import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { useCartHook } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@/assets/sslogo1.jpg";

const Home = () => {
  // Hardcode userId to allow anonymous cart access.
  const hardcodedUserId = "anonymous-user";
  const { addItem } = useCartHook(hardcodedUserId);
  const { toast } = useToast();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <img src={logoImage} alt="SS Snacks Logo" className="mx-auto h-24 w-24 mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
            Authentic Homemade Snacks
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up">
            Experience the traditional taste of freshly prepared, high-quality snacks delivered right to your doorstep.
          </p>
          <div className="animate-fade-in-up animation-delay-300">
            <Link to="/shop">
              <Button size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Our Collection</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Handpicked snacks that our customers love the most.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

export default Home;