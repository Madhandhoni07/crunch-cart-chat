import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Plus, Edit, Trash2, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface Address {
  id: string;
  street: string;
  locality?: string;
  city: string;
  state: string;
  postal_code: string;
  landmark?: string;
  is_default: boolean;
}

const AddressForm = ({ address, onSave }: { address?: Address; onSave: () => void }) => {
  const [formData, setFormData] = useState({
    street: address?.street || "",
    locality: address?.locality || "",
    city: address?.city || "",
    state: address?.state || "",
    postal_code: address?.postal_code || "",
    landmark: address?.landmark || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("addresses")
      .upsert({ id: address?.id, user_id: user.id, ...formData });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Address ${address ? "updated" : "saved"} successfully!`);
      onSave();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="street">Street *</Label>
          <Input id="street" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="locality">Locality</Label>
          <Input id="locality" value={formData.locality} onChange={(e) => setFormData({ ...formData, locality: e.target.value })} />
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input id="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="postal_code">Postal Code *</Label>
          <Input id="postal_code" value={formData.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="landmark">Landmark</Label>
          <Input id="landmark" value={formData.landmark} onChange={(e) => setFormData({ ...formData, landmark: e.target.value })} />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Address"}</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchAddresses = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("addresses").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setAddresses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Address deleted.");
      fetchAddresses();
    }
  };

  const handleSetDefault = async (id: string) => {
    const { error } = await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Default address updated.");
      fetchAddresses();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Addresses</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add New Address</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader><DialogTitle>Add a new address</DialogTitle></DialogHeader>
            <AddressForm onSave={() => { fetchAddresses(); setIsFormOpen(false); }} />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? <p>Loading addresses...</p> : addresses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">You have no saved addresses.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((addr) => (
            <Card key={addr.id} className="p-4 flex justify-between items-start">
              <div>
                {addr.is_default && <span className="text-xs font-bold text-primary inline-flex items-center mb-2"><Star className="mr-1 h-3 w-3 fill-primary" /> DEFAULT</span>}
                <p>{addr.street}, {addr.locality}</p>
                <p>{addr.city}, {addr.state} - {addr.postal_code}</p>
                {addr.landmark && <p className="text-sm text-muted-foreground">Landmark: {addr.landmark}</p>}
              </div>
              <div className="flex items-center gap-2">
                {!addr.is_default && <Button variant="outline" size="sm" onClick={() => handleSetDefault(addr.id)}>Set as Default</Button>}
                <Button variant="ghost" size="icon" onClick={() => handleDelete(addr.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesPage;