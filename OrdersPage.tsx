import { useState, useEffect } from "react";
import { ShoppingBag, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { CartItem } from "@/hooks/useCart";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  order_details: CartItem[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching orders:", error);
        } else {
          setOrders(data as Order[]);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {loading ? <p>Loading orders...</p> : orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">You haven't placed any orders with us yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Order #{order.id.substring(0, 8)}</h3>
                  <p className="text-sm text-muted-foreground">
                    Placed on: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.total_amount}</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full inline-flex items-center gap-1">
                    <Package className="h-3 w-3" /> Processing
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                {order.order_details.map((item) => (
                  <div key={`${item.id}-${item.weight}`} className="flex justify-between items-center text-sm py-1">
                    <span>{item.quantity} x {item.name} ({item.weight})</span>
                    <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;