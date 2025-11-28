import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  price: number;
  weight?: string;
  baseWeight?: string;
  weights?: {
    [key: string]: number;
  };
  description: string;
  image?: string;
}
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, selectedWeight: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getDefaultWeight = (prod: Product): string => {
    if (prod.weights) return Object.keys(prod.weights)[0];
    return prod.baseWeight || prod.weight || "500g";
  };

  const [selectedWeight, setSelectedWeight] = useState<string>(() => getDefaultWeight(product));
  const availableWeights = product.weights ? Object.keys(product.weights) : [getDefaultWeight(product)];
  const currentPrice = product.weights ? (product.weights[selectedWeight] || product.price) : product.price;
  const imageSrc = product.image; // Directly use the image URL from product data

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product, 1, selectedWeight);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block group">
        <div className="aspect-square overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-5xl font-bold text-primary/30">{product.name.charAt(0)}</span>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg truncate hover:text-primary">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-3">
        <div className="flex items-center justify-between w-full">
          <span className="text-xl font-bold text-primary font-sans">₹{currentPrice}</span>
          {availableWeights.length > 1 ? (
            <Select value={selectedWeight} onValueChange={setSelectedWeight}>
              <SelectTrigger className="w-auto h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableWeights.map((weight) => (
                  <SelectItem key={weight} value={weight} className="text-xs">
                    {weight}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="text-sm text-muted-foreground">{selectedWeight}</span>
          )}
        </div>
        <Button className="w-full" onClick={handleAddToCartClick}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
