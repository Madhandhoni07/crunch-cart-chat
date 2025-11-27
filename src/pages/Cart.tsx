import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartHook } from "@/hooks/useCart";

const Cart = () => {
  // Hardcode userId to allow anonymous cart access.
  // In a real-world scenario, you might use localStorage or a session ID.
  const hardcodedUserId = "anonymous-user";
  const { items, updateQuantity, removeItem, total } =
    useCartHook(hardcodedUserId);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some delicious snacks to get started!</p>
          <Link to="/shop">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.weight}`} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary/40">{item.name.charAt(0)}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.weight)}
                      >
                        -
                      </Button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.weight)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-primary mb-2">
                      <span className="font-sans">₹{item.price * item.quantity}</span>
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id, item.weight)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-sans">₹{total}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Items</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="font-sans text-primary">₹{total}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
