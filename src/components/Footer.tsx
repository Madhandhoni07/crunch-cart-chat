import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">SS Snacks</h3>
            <p className="text-sm text-muted-foreground">
              Authentic homemade snacks crafted with love and quality ingredients.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/shop" className="hover:text-primary transition-colors">Shop</a>
              </li>
              <li>
                <a href="/track-order" className="hover:text-primary transition-colors">Track Order</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:sssnacks704@gmail.com" className="hover:text-primary transition-colors">
                  sssnacks704@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="https://wa.me/918072073523" className="hover:text-primary transition-colors">
                  +91 8072073523
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SS Snacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
