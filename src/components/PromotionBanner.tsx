import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const PromotionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 px-4 animate-slide-up">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-sm md:text-base font-medium">
            🎉 <span className="font-bold">Free Delivery</span> on orders above ₹500! Order now and enjoy fresh snacks at your doorstep.
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PromotionBanner;
