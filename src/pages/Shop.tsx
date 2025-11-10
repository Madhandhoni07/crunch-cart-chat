import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Snacks" },
    { id: "chips", label: "Chips" },
    { id: "mixture", label: "Mixture" },
    { id: "snacks", label: "Snacks" },
    { id: "biscuits", label: "Biscuits" },
    { id: "papad", label: "Papad" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete collection of delicious homemade snacks
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
