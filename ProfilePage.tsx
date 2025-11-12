import { Outlet, useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User, ShoppingBag, Heart, MapPin, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { href: "/profile/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/profile/addresses", label: "My Addresses", icon: MapPin },
  { href: "/profile/settings", label: "Account Settings", icon: Settings },
];

const ProfilePage = () => {
  const location = useLocation();
  const [userName, setUserName] = useState("User Name");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserName(session.user.user_metadata?.full_name || session.user.email || "User Name");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="flex items-center gap-4 mb-6 p-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hello,</p>
                <h3 className="font-bold text-lg">{userName}</h3>
              </div>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card className="p-6 min-h-[400px]">
            <Outlet />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;