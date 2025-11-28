import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import products from "@/data/products.json";
import { useCartHook } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
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
  baseWeight?: string;
  weight?: string;
  weights?: {
    [key: string]: number;
  };
  description: string;
  category: string;
  featured?: boolean;
  image?: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) as Product | undefined;
  // Hardcode userId to allow anonymous cart access.
  const hardcodedUserId = "anonymous-user";
  const { addItem } = useCartHook(hardcodedUserId);

  // Determine default weight
  const getDefaultWeight = (prod: Product | undefined): string => {
    if (!prod) return "500g";
    if (prod.weights) {
      return Object.keys(prod.weights)[0];
    }
    return prod.baseWeight || prod.weight || "500g";
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<string>(() => getDefaultWeight(product));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Update selectedWeight when product changes
  useEffect(() => {
    if (product) {
      const defaultWeight = getDefaultWeight(product);
      setSelectedWeight(defaultWeight);
    }
  }, [product?.id]);

  const availableWeights = product.weights ? Object.keys(product.weights) : [product.baseWeight || product.weight || "500g"];
  const currentPrice = product.weights ? (product.weights[selectedWeight] || product.price) : product.price;

  const handleAddToCart = () => {
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

  const imageSrc = product.image; // Directly use the image URL from product data

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/shop">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <Card className="p-8 animate-fade-in">
            <div className="aspect-square rounded-lg overflow-hidden">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-9xl font-bold text-primary/40">{product.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-primary font-sans">₹{currentPrice}</span>
              <span className="text-lg text-muted-foreground">per {selectedWeight}</span>
            </div>

            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Weight</label>
                <Select value={selectedWeight} onValueChange={setSelectedWeight} disabled={availableWeights.length <= 1}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableWeights.map((weight) => (
                      <SelectItem key={weight} value={weight}>
                        <span>
                          {weight}
                          {product.weights && ` - ₹${product.weights[weight]}`}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Available weights: {availableWeights.join(", ")}</li>
                <li>• Category: {product.category}</li>
                <li>• Made with premium ingredients</li>
                <li>• Freshly prepared</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
