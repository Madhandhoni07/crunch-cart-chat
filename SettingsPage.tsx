import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const SettingsPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFullName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updates: { data: { full_name: string }, password?: string } = {
      data: { full_name: fullName },
    };

    if (password) {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        setLoading(false);
        return;
      }
      updates.password = password;
    }

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const { error } = await supabase.functions.invoke("delete-user", {
      body: {}, // Supabase passes user auth context automatically
    });

    if (error) {
      toast.error(`Failed to delete account: ${error.message}`);
      setDeleting(false);
    } else {
      toast.success("Your account has been deleted.");
      // The logout will be handled by the onAuthStateChange listener in Header.tsx
      // as the user JWT will be invalidated.
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} disabled className="bg-muted" />
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current password" />
        </div>
        {password && (
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        )}
        <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Profile"}</Button>
      </form>

      <div className="mt-12 pt-8 border-t border-destructive/20">
        <h3 className="text-lg font-bold text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Account"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SettingsPage;