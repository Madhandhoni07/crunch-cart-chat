import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              About SS Snacks
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Bringing the Authentic Taste of South India to Every Bite
            </p>
          </div>

          <div className="prose prose-lg max-w-none mx-auto text-foreground">
            <p>
              At SS Snacks, we believe that every snack tells a story — a story
              of tradition, care, and flavor passed down through generations.
              What started as a small homemade snack venture has now become a
              trusted name for authentic South Indian delights, crafted with
              love and premium ingredients.
            </p>
            <p>
              From the crisp crunch of banana chips to the spicy twist of
              murukku and mixtures, every product is freshly prepared to deliver
              the perfect blend of taste and quality. We take pride in using
              traditional recipes, pure cooking oils, and natural ingredients —
              no artificial flavors or preservatives.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-3">
                  Our Mission
                </h3>
                <p>
                  To share the true flavors of South India with every
                  household, combining age-old recipes with modern hygiene and
                  freshness standards.
                </p>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-3">
                  Our Vision
                </h3>
                <p>
                  To make SS Snacks a household name known for authentic taste,
                  purity, and trust — one bite at a time.
                </p>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-center mb-6">
              Why Choose Us?
            </h3>
            <ul className="space-y-3 !p-0">
              {[
                "100% Authentic South Indian Taste",
                "Made Fresh Daily",
                "Premium Ingredients & Hygienic Preparation",
                "Traditional Recipes Passed Through Generations",
                "Quick Delivery & Easy WhatsApp Ordering",
              ].map((item) => (
                <li key={item} className="flex items-start !p-0">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="text-center mt-12 border-t pt-8">
              <p className="text-xl italic text-muted-foreground">
                From our kitchen to your home — SS Snacks brings you the joy of
                homemade snacks, packed with flavor, freshness, and love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;