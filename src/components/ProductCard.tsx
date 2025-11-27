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
import bakarwadiSmall from "@/assets/Bhakarwadi small.jpg";
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
  "bakarwadi-small.jpg": bakarwadiSmall,
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
  const imageSrc = product.image ? imageMap[product.image] : null;

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
