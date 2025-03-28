import { create } from 'zustand';
import { Database } from '../lib/database.types';

type InventoryItem = Database['public']['Tables']['inventory']['Row'];

interface CartItem extends InventoryItem {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: InventoryItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);
    
    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: Math.min(i.quantity + 1, item.available_units) }
            : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (itemId) => {
    set({ items: get().items.filter((i) => i.id !== itemId) });
  },
  updateQuantity: (itemId, quantity) => {
    set({
      items: get().items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));