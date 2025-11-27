import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";

interface Address {
  id: string;
  address: string;
  phone: string;
}

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAddresses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        toast.error("Failed to fetch addresses.");
      } else {
        setAddresses(data || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("addresses")
        .insert({ 
          user_id: user.id, 
          street: newAddress, // Use 'street' to match checkout schema
          phone: newPhone,
          // Add placeholder values for other required fields
          city: "Default City", state: "Default State", postal_code: "000000", is_default: false });

      if (error) {
        toast.error("Failed to add address.");
      } else {
        toast.success("Address added successfully!");
        setNewAddress("");
        setNewPhone("");
        fetchAddresses(); // Refresh the list
      }
    }
    setIsSubmitting(false);
  };

  const handleDeleteAddress = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete address.");
    } else {
      toast.success("Address deleted.");
      fetchAddresses(); // Refresh the list
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
      <div className="space-y-6">
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : addresses.length > 0 ? (
          addresses.map((addr) => (
            <Card key={addr.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{addr.address || addr.street}</p>
                  <p className="text-sm text-muted-foreground">{addr.phone}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(addr.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>You have not saved any addresses yet.</p>
        )}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Add a New Address</CardTitle>
        </CardHeader>
        <CardContent as="form" onSubmit={handleAddAddress} className="space-y-4">
          <div>
            <Label htmlFor="new-address">Full Address</Label>
            <Input id="new-address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="new-phone">Phone Number</Label>
            <Input id="new-phone" type="tel" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Address
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressesPage;