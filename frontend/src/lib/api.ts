const API_BASE_URL = "https://ruling-jillie-wendor-1c229edf.koyeb.app/v1";

export async function fetchInventory(page: number = 1, limit: number = 12) {
  const offset = (page - 1) * limit;
  const response = await fetch(
    `${API_BASE_URL}/inventories?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inventory");
  }

  const data = await response.json();
  return {
    items: data,
    hasMore: data.length === limit,
    total: data.length,
  };
}

interface OrderItem {
  inventory_id: string;
  quantity: number;
}

interface OrderPayload {
  customer_name: string;
  status: "pending";
  order_items: OrderItem[];
}

export async function createOrder(items: OrderItem[]) {
  const payload: OrderPayload = {
    customer_name: "Guest User",
    status: "pending",
    order_items: items,
  };

  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}
