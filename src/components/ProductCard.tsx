import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

// Import all product images
import bananaChips from "@/assets/banana-chips.jpg";
import jackfruitChips from "@/assets/jackfruit-chips.jpg";
import tapiocaChips from "@/assets/tapioca-chips.jpg";
import karelaChips from "@/assets/karela-chips.jpg";
import potatoChipsPudhina from "@/assets/potato-chips-pudhina.jpg";
import potatoChipsGinger from "@/assets/potato-chips-ginger.jpg";
import kajuMixture from "@/assets/kaju-mixture.jpg";
import garlicMixture from "@/assets/garlic-mixture.jpg";
import dalmoundMixture from "@/assets/dalmound-mixture.jpg";
import cocoBiscuit from "@/assets/coco-biscuit.jpg";
import chocoBiscuit from "@/assets/choco-biscuit.jpg";
import murukkuMasala from "@/assets/murukku-masala.jpg";
import murukkuSalt from "@/assets/murukku-salt.jpg";
import moongDal from "@/assets/moong-dal.jpg";
import saltPeanut from "@/assets/salt-peanut.jpg";
import masalaPeanut from "@/assets/masala-peanut.jpg";
import bakarwadi from "@/assets/bakarwadi.jpg";
import sabudanaPapad from "@/assets/sabudana-papad.jpg";

const imageMap: Record<string, string> = {
  "banana-chips.jpg": bananaChips,
  "jackfruit-chips.jpg": jackfruitChips,
  "tapioca-chips.jpg": tapiocaChips,
  "karela-chips.jpg": karelaChips,
  "potato-chips-pudhina.jpg": potatoChipsPudhina,
  "potato-chips-ginger.jpg": potatoChipsGinger,
  "kaju-mixture.jpg": kajuMixture,
  "garlic-mixture.jpg": garlicMixture,
  "dalmound-mixture.jpg": dalmoundMixture,
  "coco-biscuit.jpg": cocoBiscuit,
  "choco-biscuit.jpg": chocoBiscuit,
  "murukku-masala.jpg": murukkuMasala,
  "murukku-salt.jpg": murukkuSalt,
  "moong-dal.jpg": moongDal,
  "salt-peanut.jpg": saltPeanut,
  "masala-peanut.jpg": masalaPeanut,
  "bakarwadi.jpg": bakarwadi,
  "sabudana-papad.jpg": sabudanaPapad,
};

interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  description: string;
  image?: string;
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

  const imageSrc = product.image ? imageMap[product.image] : null;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 group animate-fade-in">
        <CardContent className="p-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-4xl font-bold text-primary/40">{product.name.charAt(0)}</span>
              </div>
            )}
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
            className="w-full hover:scale-105 transition-transform duration-200"
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
