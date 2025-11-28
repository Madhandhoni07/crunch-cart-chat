import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, Phone, MapPin, Truck } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email and we'll get back to you shortly
              </p>
              <a href="mailto:sssnacks704@gmail.com">
                <Button>
                  sssnacks704@gmail.com
                </Button>
              </a>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">
                Chat with us directly on WhatsApp for instant support
              </p>
              <a href="https://wa.me/918072073523" target="_blank" rel="noopener noreferrer">
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  +91 8072073523
                </Button>
              </a>
            </div>
          </Card>
        </div>

        <Card className="mt-8 p-8 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nationwide Delivery</h3>
            <p className="text-muted-foreground">
              We deliver our delicious homemade snacks all over India.
            </p>
          </div>
        </Card>


        <Card className="mt-8 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Business Hours</h2>
            <p className="text-muted-foreground mb-4">
              We're here to help you Monday through Saturday
            </p>
            <div className="space-y-2 text-sm">
              <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Find Us</h2>
              <div className="flex items-start gap-4 text-muted-foreground">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">SS TRADING AND CO</p>
                  <p>2633/3, Harpale wasti, Fursunghi,</p>
                  <p>Fursunghi Bhekrai Road, Near Royal Hotel,</p>
                  <p>Pune, Maharashtra - 412308</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3276.6293374213865!2d73.96475577519061!3d18.47743718260776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDI4JzM4LjgiTiA3M8KwNTgnMDIuNCJF!5e1!3m2!1sen!2sin!4v1762944179920!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
