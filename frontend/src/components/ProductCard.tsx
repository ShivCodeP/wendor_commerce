import React, { memo } from "react";
import type { Database } from "../lib/database.types";
import { Plus } from "lucide-react";

type InventoryItem = Database["public"]["Tables"]["inventory"]["Row"];

interface ProductCardProps {
  item: InventoryItem;
  onAddToCart: (item: InventoryItem) => void;
  onViewDetails: (item: InventoryItem) => void;
}

const ProductCard = memo(
  ({ item, onAddToCart, onViewDetails }: ProductCardProps) => {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div
          className="relative cursor-pointer group"
          onClick={() => onViewDetails(item)}
        >
          <div className="aspect-square sm:aspect-[4/3] overflow-hidden">
            <img
              src={item.display_image_url}
              alt={item.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-start p-4">
            <span className="text-white font-medium text-sm">View Details</span>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                {item.name}
              </h3>
              <p className="text-lg sm:text-2xl font-bold text-green-600 mt-1">
                ₹{item.price}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
              disabled={item.available_units === 0}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="mt-2 sm:mt-3 flex items-center space-x-2">
            <span
              className={`w-2 h-2 rounded-full ${
                item.available_units > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-xs sm:text-sm text-gray-600">
              {item.available_units > 0
                ? `${item.available_units} left`
                : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
