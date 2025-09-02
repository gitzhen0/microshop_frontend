const BASE = import.meta.env.VITE_API_BASE || '/api';


async function http(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
  }
  // 204 no content
  if (res.status === 204) return null;
  return res.json();
}

// Users
export const listUsers = () => http('/users');
export const createUser = (name: string) => http('/users', { method: 'POST', body: JSON.stringify({ name }) });

// Orders
export const listOrders = () => http('/orders');
export const createOrder = (sku: string, qty: number) => http('/orders', { method: 'POST', body: JSON.stringify({ sku, qty }) });

// 新增：列出所有库存项
export const listInventory = () => http('/inventory')

// Inventory
export const getInventory = (sku: string) => http(`/inventory/${encodeURIComponent(sku)}`);
export const updateInventory = (sku: string, delta: number) =>
  http(`/inventory/${encodeURIComponent(sku)}`, { method: 'POST', body: JSON.stringify({ delta }) });