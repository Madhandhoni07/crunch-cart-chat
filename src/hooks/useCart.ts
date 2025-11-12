import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (id: string, weight?: string) => void;
  updateQuantity: (id: string, quantity: number, weight?: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product, quantity = 1) => {
        console.log("Adding to cart:", product, "Quantity:", quantity);
        const currentItems = get().items;
        const itemKey = `${product.id}-${product.weight}`;
        const existing = currentItems.find((item) => `${item.id}-${item.weight}` === itemKey);
        let updatedItems;
        if (existing) {
          updatedItems = currentItems.map((item) =>
            `${item.id}-${item.weight}` === itemKey
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [...currentItems, { ...product, quantity }];
        }
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });
      },
      removeItem: (id: string, weight?: string) => {
        let updatedItems;
        if (weight) {
          updatedItems = get().items.filter((item) => !(item.id === id && item.weight === weight));
        } else {
          updatedItems = get().items.filter((item) => item.id !== id);
        }
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });
      },
      updateQuantity: (id: string, quantity: number, weight?: string) => {
        if (quantity <= 0) {
          get().removeItem(id, weight);
          return;
        }
        let updatedItems;
        if (weight) {
          updatedItems = get().items.map((item) =>
            item.id === id && item.weight === weight ? { ...item, quantity } : item
          );
        } else {
          const itemIndex = get().items.findIndex((item) => item.id === id);
          if (itemIndex !== -1) {
            updatedItems = [...get().items];
            updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity };
          } else {
            updatedItems = get().items;
          }
        }
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });
      },
      clearCart: () => {
        set({ items: [], total: 0 });
      },
    }),
    {
      name: "ss-snacks-cart", // Key for localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }
      },
    }
  )
);

const useCartTotal = () => useCart((state) => state.total);

export const useCartHook = () => {
  const items = useCart((state) => state.items);
  const addItem = useCart((state) => state.addItem);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const clearCart = useCart((state) => state.clearCart);
  const total = useCartTotal();

  return { items, addItem, removeItem, updateQuantity, clearCart, total };
};

/*
  The original implementation using useState. This is commented out as we are moving to Zustand.

  import { useState, useEffect } from "react";
  const CART_STORAGE_KEY = "ss-snacks-cart";

  export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>(() => {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (
      product: { id: string; name: string; price: number; weight: string },
      quantity = 1
    ) => {
      console.log("Adding to cart:", product, "Quantity:", quantity);
      setItems((current) => {
      // Use id + weight as unique identifier to allow same product with different weights
      const itemKey = `${product.id}-${product.weight}`;
      const existing = current.find((item) => `${item.id}-${item.weight}` === itemKey);
      if (existing) {
        return current.map((item) =>
          `${item.id}-${item.weight}` === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };*/
