import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useCartStore } from './store/cart';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import CheckoutModal from './components/CheckoutModal';
import type { Database } from './lib/database.types';

type InventoryItem = Database['public']['Tables']['inventory']['Row'];

const queryClient = new QueryClient();

function VendingMachine() {
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCartStore();

  const handleAddToCart = (item: InventoryItem) => {
    addItem(item);
    toast.success(`Added ${item.name} to cart`, {
      style: {
        background: '#22c55e',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#22c55e',
      },
    });
  };

  const handlePurchaseSuccess = () => {
    toast.success('Order placed successfully!', {
      style: {
        background: '#22c55e',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#22c55e',
      },
    });
    clearCart();
    setShowCheckout(false);
    queryClient.invalidateQueries({ queryKey: ['inventory'] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-left" />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Wendor Mart
            </h1>
            <button
              onClick={() => setShowCheckout(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid
          onAddToCart={handleAddToCart}
          onViewDetails={setSelectedProduct}
        />
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          item={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(item) => {
            handleAddToCart(item);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          items={items}
          onClose={() => setShowCheckout(false)}
          onSuccess={handlePurchaseSuccess}
          onQuantityChange={updateQuantity}
          onViewDetails={(item) => {
            setShowCheckout(false);
            setSelectedProduct(item);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VendingMachine />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;