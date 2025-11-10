import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Package } from "lucide-react";

const OrderTracking = () => {
  const [phone, setPhone] = useState("");

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || phone.length < 10) {
      return;
    }

    // Redirect to WhatsApp to check order status
    const message = `Hello SS Snacks! I would like to check my order status. My phone number is: ${phone}`;
    const whatsappUrl = `https://wa.me/918072073523?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12 animate-fade-in">
          <Package className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-lg text-muted-foreground">
            Enter your phone number to check your order status via WhatsApp
          </p>
        </div>

        <Card className="p-8 animate-slide-up">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-2"
                required
                minLength={10}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Enter the phone number you used to place your order
              </p>
            </div>

            <Button type="submit" size="lg" className="w-full">
              <MessageCircle className="mr-2 h-5 w-5" />
              Check Order Status on WhatsApp
            </Button>
          </form>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Enter your phone number</li>
              <li>You'll be redirected to WhatsApp</li>
              <li>We'll provide your order status and delivery details</li>
            </ol>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Need help with your order?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/918072073523" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact on WhatsApp
              </Button>
            </a>
            <a href="mailto:sssnacks704@gmail.com">
              <Button variant="outline">Send Email</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
