import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartHook } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Import all product images with actual filenames
import bananaChips from "@/assets/Banana chips.jpg";
import jackfruitChips from "@/assets/Jack fruit chips.jpg";
import tapiocaChips from "@/assets/Tapioca chips.jpg";
import karelaChips from "@/assets/Bitterguard( karela ) chips.jpg";
import potatoChipsPudhina from "@/assets/Potato pudhina finger.jpg";
import potatoChipsGinger from "@/assets/Potato ginger finger.jpg";
import kajuMixture from "@/assets/Cashew mixer.jpg";
import garlicMixture from "@/assets/Garlic mixer.jpg";
import dalmoundMixture from "@/assets/Dall mount mixer.jpg";
import chocoBiscuit from "@/assets/Chocobiscuit.jpg";
import cocoBiscuit from "@/assets/coco biscuit.jpg";
import murukkuMasala from "@/assets/masalmuruku.jpg";
import murukkuSalt from "@/assets/Murukku salted.jpg";
import moongDal from "@/assets/Moong dal.jpg";
import saltPeanut from "@/assets/Salt peanut.jpg";
import masalaPeanut from "@/assets/Masala peanut.jpg";
import bakarwadi from "@/assets/Bhakarwadi (Big).jpg";
import sabudanaPapad from "@/assets/Sabudana papadi.jpg";
import soyaStick from "@/assets/Soya stick.jpg";

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
  "coco-biscuit.jpg": cocoBiscuit, // Using choco biscuit as fallback
  "choco-biscuit.jpg": chocoBiscuit,
  "murukku-masala.jpg": murukkuMasala,
  "murukku-salt.jpg": murukkuSalt,
  "moong-dal.jpg": moongDal,
  "salt-peanut.jpg": saltPeanut,
  "masala-peanut.jpg": masalaPeanut,
  "bakarwadi.jpg": bakarwadi,
  "sabudana-papad.jpg": sabudanaPapad,
  "Soya stick.jpg": soyaStick,
};

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
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartHook();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    // Use base weight or first available weight, or default to 500g
    const defaultWeight = product.baseWeight || product.weight || (product.weights ? Object.keys(product.weights)[0] : "500g");
    const defaultPrice = product.weights ? (product.weights[defaultWeight] || product.price) : product.price;
    
    const productToAdd = {
      ...product,
      price: defaultPrice,
      weight: defaultWeight,
    };
    
    addItem(productToAdd);
    toast({
      title: "Added to cart",
      description: `${product.name} (${defaultWeight}) has been added to your cart.`,
    });
  };

  const imageSrc = product.image ? imageMap[product.image] : null;

  return (
    <Link to={`/product/${product.id}`}>
              <Card className="h-full hover:shadow-lg active:shadow-lg transition-all duration-300 group animate-fade-in">        <CardContent className="p-4">
          <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 group-active:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 group-active:scale-105 transition-transform duration-300">
                <span className="text-4xl font-bold text-primary/40">{product.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary group-active:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            <span className="text-sm text-muted-foreground">
              {product.baseWeight || product.weight || (product.weights ? Object.keys(product.weights)[0] : "500g")}
            </span>
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
