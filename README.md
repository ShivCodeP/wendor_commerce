# Wendor Commerce Vending Machine

A modern, responsive vending machine interface built with React, TypeScript, and Tailwind CSS.

## Features

- 🛒 Real-time inventory management
- 🔄 Infinite scroll product loading
- 📱 Fully responsive design
- 🛍️ Interactive shopping cart
- ✨ Smooth animations and transitions
- 🔍 Detailed product views
- 💳 Seamless checkout process

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: 
  - Zustand (Cart)
  - TanStack Query (Server State)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
frontend/src/
├── components/         # React components
├── lib/               # Utility functions and API
├── store/             # State management
└── types/             # TypeScript types
```

## API Integration

### Inventory Endpoint
```bash
GET https://ruling-jillie-wendor-1c229edf.koyeb.app/v1/inventories
```

**Parameters:**
- `limit`: Number of items per page
- `offset`: Pagination offset

### Order Endpoint
```bash
POST https://ruling-jillie-wendor-1c229edf.koyeb.app/v1/orders
```

**Required Headers:**
- `Content-Type`: application/json

**Request Body:**
```json
{
  "customer_name": "string",
  "status": "pending",
  "order_items": [
    {
      "inventory_id": "string",
      "quantity": number
    }
  ]
}
```

## Application Flow

1. **Product Browsing**
   - Grid view of available products
   - Infinite scroll pagination
   - Quick add to cart
   - Detailed product view

2. **Shopping Cart**
   - Real-time cart updates
   - Quantity adjustment
   - Price calculation
   - Tax computation

3. **Checkout Process**
   - Order review
   - Total calculation
   - Order placement
   - Success confirmation

4. **Inventory Management**
   - Real-time stock updates
   - Automatic query invalidation
   - Stock level indicators

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Key Features

### Product Display
- Beautiful grid layout
- Hover effects
- Stock level indicators
- Quick add functionality

### Cart Management
- Persistent cart state
- Quantity controls
- Real-time price updates
- Tax calculation

### Checkout Experience
- Clean, modal-based interface
- Order summary
- Success animations
- Automatic inventory refresh

### Mobile Responsiveness
- Optimized for all screen sizes
- Touch-friendly interface
- Adaptive layouts
- Smooth mobile interactions

## Performance Optimizations

- `React.memo` for component memoization
- Infinite scroll for data pagination
- Image optimization
- Debounced cart updates
- Optimistic UI updates

## State Management

### Cart State (Zustand)
- Add/remove items
- Update quantities
- Calculate totals
- Clear cart

### Server State (TanStack Query)
- Inventory data
- Order processing
- Cache invalidation
- Error handling

## UI/UX Features

- Loading states
- Error handling
- Success notifications
- Smooth transitions
- Intuitive navigation

## Admin API Endpoints

### Generate `x-api-key` for a location
```bash
curl --location 'https://ruling-jillie-wendor-1c229edf.koyeb.app/v1/api-key/generate' --header 'Content-Type: application/json' --data '{
    "location_id": "wendor_count_delhi_123"
}'
```

### Bulk Create Inventory
```bash
curl --location 'https://ruling-jillie-wendor-1c229edf.koyeb.app/v1/inventories/bulk-create' --header 'Content-Type: application/json' --header 'location-id: wendor_count_delhi_123' --header 'x-api-key: YOUR_GENERATED_API_KEY' --data '{
    "items": [
        {
            "name": "Lays Classic",
            "price": 20,
            "available_units": 10,
            "display_image_url": "https://images.unsplash.com/photo-1585109218738-1c94a4d74e5b"
        },
        {
            "name": "Doritos Nacho Cheese",
            "price": 30,
            "available_units": 7,
            "display_image_url": "https://images.unsplash.com/photo-1593417833726-1a34f4c97034"
        },
        {
            "name": "KitKat",
            "price": 15,
            "available_units": 20,
            "display_image_url": "https://images.unsplash.com/photo-1589301774667-0ce47d755cd5"
        }
    ]
}'
```

## API Documentation

For a detailed API reference, visit the **Swagger API Docs**:

🔗 **[Wendor Commerce API Docs](https://ruling-jillie-wendor-1c229edf.koyeb.app/api-docs)**
