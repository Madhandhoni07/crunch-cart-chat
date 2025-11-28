import { useParams } from "react-router-dom";
import products from "@/data/products.json";
import { Button } from "@/components/ui/button";
import { useCartHook } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { toast } = useToast();

  // Hardcode userId to allow anonymous cart access.
  const hardcodedUserId = "anonymous-user";
  const { addItem } = useCartHook(hardcodedUserId);

  const getDefaultWeight = (prod: typeof product): string => {
    if (prod?.weights) return Object.keys(prod.weights)[0];
    return prod?.baseWeight || "250g";
  };

  const [selectedWeight, setSelectedWeight] = useState<string>(() => getDefaultWeight(product));

  if (!product) {
    return <div>Product not found</div>;
  }

  const availableWeights = product.weights ? Object.keys(product.weights) : [getDefaultWeight(product)];
  const currentPrice = product.weights ? (product.weights[selectedWeight] || product.price) : product.price;

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      price: currentPrice,
      weight: selectedWeight,
    };
    addItem(productToAdd, 1);
    toast({
      title: "Added to cart",
      description: `1 x ${product.name} (${selectedWeight}) added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-5xl font-bold text-primary/30">{product.name.charAt(0)}</div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-primary">₹{currentPrice}</span>
            {availableWeights.length > 1 && (
              <Select value={selectedWeight} onValueChange={setSelectedWeight}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableWeights.map((weight) => (
                    <SelectItem key={weight} value={weight}>
                      {weight}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <Button size="lg" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;