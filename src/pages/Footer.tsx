import { Link } from "react-router-dom";
import logoImage from "@/assets/sslogo1.jpg";

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
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10A24.12 24.12 0 0 1 2.5 17Z" />
    <path d="M11.5 21H12c7.31 0 7.31-18 0-18h-.5" />
    <path d="M11.5 21h-1c-7.31 0-7.31-18 0-18h1" />
    <path d="m9 12 4-2.5-4-2.5v5Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-8">
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
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SS Snacks. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;