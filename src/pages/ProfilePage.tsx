import { Outlet, useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User, ShoppingBag, MapPin, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { href: "/profile/orders", label: "My Orders", icon: ShoppingBag },
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
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Hello</p>
            <h3 className="font-bold text-xl truncate">{userName}</h3>
          </div>
        </div>
      </div>

      <div>
        <div className="border-b mb-6">
          <nav className="flex -mb-px space-x-6 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap px-1 py-3 border-b-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-gray-700"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <Card className="p-6 min-h-[400px]"><Outlet /></Card>
      </div>
    </div>
  );
};

export default ProfilePage;