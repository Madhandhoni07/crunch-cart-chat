import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartHook } from "@/hooks/useCart";
import { Address } from "c:/Users/madha/OneDrive/Desktop/Sample/crunch-cart-chat/AddressesPage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number too long"),
  address: z.string().trim().min(5, "Address must be at least 5 characters").max(200, "Address too long"),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(100, "City name too long"),
  note: z.string().max(500, "Note too long").optional(),
});

const Checkout = () => {
  const { items, total, clearCart } = useCartHook();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, [items.length, navigate]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const { data, error } = await supabase.from("addresses").select("*").order("is_default", { ascending: false });
      if (error) {
        console.error("Error fetching addresses:", error);
      } else if (data) {
        setSavedAddresses(data);
        // Pre-fill with default address if available
        const defaultAddress = data.find(addr => addr.is_default);
        if (defaultAddress) {
          handleSelectAddress(defaultAddress);
        }
      }
    };
    fetchAddresses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    setErrors({});

    // --- Save order to Supabase ---
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to place an order.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const order_details = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      weight: item.weight,
    }));

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: user.id,
      order_details: order_details,
      customer_info: formData,
      total_amount: total,
    });

    if (orderError) {
      toast({ title: "Order Error", description: "Could not save your order. Please try again.", variant: "destructive" });
      return;
    }
    // --- End of Supabase logic ---

    // Create WhatsApp message
    const orderItems = items
      .map((item) => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`)
      .join("\n");

    const message = `Hello SS Snacks, I would like to place an order.

Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}

Order:
${orderItems}

Total: ₹${total}
${formData.note ? `\nNote: ${formData.note}` : ""}

Please confirm availability and delivery time.`;

    const whatsappUrl = `https://wa.me/918072073523?text=${encodeURIComponent(message)}`;
    
    // Use location.href for better mobile compatibility and to avoid popup blockers
    setTimeout(() => {
      // Clear cart and show toast just before redirecting
      clearCart();
      toast({
        title: "Order Submitted!",
        description: "Redirecting to WhatsApp...",
      });
      window.location.href = whatsappUrl;
    }, 500);
  };

  const handleSelectAddress = (addr: Address) => {
    setFormData({
      name: formData.name, // Keep name and note
      phone: formData.phone,
      address: `${addr.street}${addr.locality ? `, ${addr.locality}` : ''}`,
      city: addr.city,
      note: formData.note,
      // You might want to add state and postal_code to your form state
      // For now, we combine them into the address string.
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <Card className="p-6">
            {savedAddresses.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Select a saved address</h3>
                <div className="space-y-2">
                  {savedAddresses.map(addr => (
                    <button key={addr.id} onClick={() => handleSelectAddress(addr)} className="w-full text-left p-3 border rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">{addr.street}, {addr.city}</p>
                      <p className="text-sm text-muted-foreground">{addr.state} - {addr.postal_code}</p>
                      {addr.is_default && <span className="text-xs font-bold text-primary">DEFAULT</span>}
                    </button>
                  ))}
                </div>
                <div className="relative my-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or Enter a New Address</span></div></div>
              </div>
            )}
            <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete address"
                  className={errors.address ? "border-destructive" : ""}
                  rows={3}
                />
                {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter your city"
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
              </div>

              <div>
                <Label htmlFor="note">Additional Note (Optional)</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Any special instructions?"
                  className={errors.note ? "border-destructive" : ""}
                  rows={2}
                />
                {errors.note && <p className="text-sm text-destructive mt-1">{errors.note}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Order via WhatsApp
              </Button>
            </form>
          </Card>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 mt-4 bg-muted">
              <p className="text-sm text-muted-foreground">
                📱 After clicking "Send Order", you'll be redirected to WhatsApp to confirm your order with us. 
                We'll respond with payment details and delivery information.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
