import { Database } from './database.types';

type InventoryItem = Database['public']['Tables']['inventory']['Row'];

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Lays Classic',
    price: 199, // ₹1.99
    available_units: 15,
    display_image_url: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Doritos Nacho Cheese',
    price: 249, // ₹2.49
    available_units: 12,
    display_image_url: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Snickers Bar',
    price: 159, // ₹1.59
    available_units: 20,
    display_image_url: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'M&Ms Peanut',
    price: 179, // ₹1.79
    available_units: 18,
    display_image_url: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Pringles Original',
    price: 299, // ₹2.99
    available_units: 10,
    display_image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'KitKat',
    price: 149, // ₹1.49
    available_units: 25,
    display_image_url: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Oreo Original',
    price: 189, // ₹1.89
    available_units: 22,
    display_image_url: 'https://images.unsplash.com/photo-1584791097929-aa825fe8e1e1?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Twix',
    price: 159, // ₹1.59
    available_units: 16,
    display_image_url: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Cheetos Crunchy',
    price: 199, // ₹1.99
    available_units: 14,
    display_image_url: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    name: 'Hershey\'s Milk Chocolate',
    price: 169, // ₹1.69
    available_units: 20,
    display_image_url: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchInventory(page: number = 1, limit: number = 6) {
  await delay(800);
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = mockInventory.slice(start, end);
  
  return {
    items,
    hasMore: end < mockInventory.length,
    total: mockInventory.length
  };
}

export async function processPayment(amount: number) {
  await delay(1500);
  if (Math.random() > 0.1) {
    return { success: true, transactionId: Math.random().toString(36).substring(7) };
  }
  throw new Error('Payment failed');
}

export async function updateInventory(items: { id: string; quantity: number }[]) {
  await delay(500);
  return { success: true };
}