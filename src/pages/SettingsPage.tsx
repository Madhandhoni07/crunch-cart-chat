import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        toast.error("Could not get user information. Please log in again.");
      }
      setUserEmail(user?.email ?? "");
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out: " + error.message);
    } else {
      toast.success("You have been logged out.");
      navigate("/");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("User email not found. Please log out and log back in.");
      setLoading(false);
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    setLoading(true);

    // 1. Re-authenticate the user with their current password to prove identity
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

    if (signInError) {
      console.error("Supabase signInWithPassword error:", signInError); // Added console log for debugging
      toast.error("Incorrect current password. Please try again.");
      setLoading(false);
      return;
    }

    // 2. If re-authentication is successful, update to the new password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      console.error("Supabase updateUser error:", updateError); // Added console log for debugging
      toast.error("Failed to update password: " + updateError.message);
    } else {
      toast.success("Password updated successfully! Please log in again with your new password.");
      await supabase.auth.signOut(); // Log the user out for security
      navigate("/auth");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <div className="space-y-8">
        <Card>
          <CardHeader><CardTitle>Your Information</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Email: <span className="font-medium text-foreground">{userEmail}</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
          <CardContent as="form" onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input id="current-password" type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input id="new-password" type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="At least 6 characters" />
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Log Out</CardTitle></CardHeader>
          <CardContent><Button variant="destructive" onClick={handleLogout}>Log Out of All Devices</Button></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;