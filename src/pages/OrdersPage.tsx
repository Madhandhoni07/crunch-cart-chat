import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  weight: string;
}

interface Order {
  id: string;
  created_at: string;
  total_price: number;
  total_amount?: number; // Add optional total_amount for backward compatibility
  status: string;
  order_items?: OrderItem[]; // For new orders
  order_details?: OrderItem[]; // For old orders
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (user && !userError) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching orders:", error);
        } else {
          setOrders(data);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (orders.length === 0) {
    return <p>You haven't placed any orders yet.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
              <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
              <CardDescription>Date: {new Date(order.created_at).toLocaleDateString()}</CardDescription>
            </div>
            <Badge>{order.status}</Badge>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">Total: ₹{(order.total_price || order.total_amount || 0).toFixed(2)}</p>
            <p className="text-sm font-medium mb-1">Items:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {(order.order_items || order.order_details || []).map((item, index) => <li key={index}>{item.name} ({item.weight}) x {item.quantity}</li>)}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersPage;