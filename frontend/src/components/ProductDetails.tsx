import { memo } from 'react';
import { X } from 'lucide-react';
import type { Database } from '../lib/database.types';

type InventoryItem = Database['public']['Tables']['inventory']['Row'];

interface ProductDetailsProps {
  item: InventoryItem;
  onClose: () => void;
  onAddToCart: (item: InventoryItem) => void;
}

const ProductDetails = memo(({ item, onClose, onAddToCart }: ProductDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-xl transform transition-all">
        <div className="relative aspect-video">
          <img
            src={item.display_image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white">{item.name}</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-3xl font-bold text-green-600">₹{(item.price / 100).toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Availability</p>
              <div className="flex items-center justify-end space-x-2 mt-1">
                <span className={`w-2 h-2 rounded-full ${item.available_units > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-lg font-medium">
                  {item.available_units > 0 ? `${item.available_units} units` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onAddToCart(item)}
            disabled={item.available_units === 0}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:shadow-none"
          >
            {item.available_units === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;