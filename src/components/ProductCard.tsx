import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
        <CardContent className="p-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-4xl font-bold text-primary/40">{product.name.charAt(0)}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">{product.weight}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
