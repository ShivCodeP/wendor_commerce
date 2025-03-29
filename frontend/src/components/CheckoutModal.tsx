import React, { memo } from "react";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../lib/api";
import { Package2, X, Minus, Plus, ChevronRight } from "lucide-react";
import type { Database } from "../lib/database.types";

type CartItem = Database["public"]["Tables"]["inventory"]["Row"] & {
  quantity: number;
};

interface CheckoutModalProps {
  items: CartItem[];
  onClose: () => void;
  onSuccess: () => void;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onViewDetails: (item: CartItem) => void;
}

const CheckoutModal = memo(
  ({
    items,
    onClose,
    onSuccess,
    onQuantityChange,
    onViewDetails,
  }: CheckoutModalProps) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(total * 0.1);
    const grandTotal = total + tax;

    const { mutate: handleCheckout, isPending } = useMutation({
      mutationFn: async () => {
        await createOrder(
          items.map((item) => ({
            inventory_id: item.id,
            quantity: item.quantity,
          }))
        );
      },
      onSuccess: () => {
        onSuccess();
      },
    });

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
        <div className="bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:w-full max-h-[90vh] overflow-hidden shadow-xl">
          <div className="sticky top-0 bg-white z-10 px-4 sm:px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold">Your Order</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-3 sm:space-x-4"
              >
                <div
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
                  onClick={() => onViewDetails(item)}
                >
                  <img
                    src={item.display_image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base sm:text-lg truncate">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-semibold text-sm sm:text-base">
                    ₹{item.price} each
                  </p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() =>
                      onQuantityChange(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-1.5 sm:p-2 hover:bg-white rounded-md transition-colors"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="w-6 sm:w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      onQuantityChange(
                        item.id,
                        Math.min(item.available_units, item.quantity + 1)
                      )
                    }
                    className="p-1.5 sm:p-2 hover:bg-white rounded-md transition-colors"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="w-16 sm:w-24 text-right font-semibold text-sm sm:text-base">
                  ₹{(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white border-t px-4 sm:px-6 py-4 sm:py-6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg sm:text-xl pt-2 border-t">
                <span>Total</span>
                <span className="text-green-600">
                  ₹{(grandTotal).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCheckout()}
              disabled={isPending}
              className="w-full bg-green-600 text-white py-3 sm:py-4 px-6 rounded-xl text-base sm:text-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:shadow-none flex items-center justify-center space-x-2"
            >
              {isPending ? (
                <>
                  <Package2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

CheckoutModal.displayName = "CheckoutModal";

export default CheckoutModal;
