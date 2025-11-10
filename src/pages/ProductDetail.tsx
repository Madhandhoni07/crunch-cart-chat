import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import products from "@/data/products.json";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const imageSrc = product.image ? imageMap[product.image] : null;

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
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
              <span className="text-lg text-muted-foreground">per {product.weight}</span>
            </div>

            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

            <div className="space-y-6">
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
                <li>• Weight: {product.weight}</li>
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
