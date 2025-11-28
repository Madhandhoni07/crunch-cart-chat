import { Link } from "react-router-dom";
import logoImage from "@/assets/sslogo1.jpg";
import { Mail, Phone, Truck } from "lucide-react";
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.9-1.76 1.75C2 8.05 2 12 2 12s0 3.95.42 4.81c.23.86.9 1.52 1.76 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.9 1.76-1.75C22 15.95 22 12 22 12s0-3.95-.42-4.81z"></path>
    <polygon points="9.5 15.5 15.5 12 9.5 8.5"></polygon>
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logoImage} alt="SS Snacks" className="h-12 w-12 object-contain" />
              <span className="text-2xl font-semibold text-primary">SS Snacks</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Authentic homemade snacks, delivered fresh to you.
            </p>
            <div className="mt-4 flex items-center gap-3 text-primary font-semibold">
              <Truck className="h-5 w-5" />
              <p className="text-base">Delivering all over India!</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary">Shop</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.instagram.com/ss_snacks___?igsh=Z3AwZjBmMmR5b2Ri" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><InstagramIcon className="h-6 w-6" /></a>
              <a href="https://youtube.com/@sssnacks-k9u?si=XU8P4frHDXWXAFnb" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><YouTubeIcon className="h-6 w-6" /></a>
            </div>
            <div className="mt-6 text-sm text-muted-foreground space-y-2 flex flex-col items-center md:items-start">
              <a href="mailto:sssnacks704@gmail.com" className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>sssnacks704@gmail.com</span>
              </a>
              <a href="tel:+918072073523" className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>+91 8072073523</span>
              </a>
            </div>
            <div className="mt-6 text-sm text-muted-foreground text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} SS Snacks. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
