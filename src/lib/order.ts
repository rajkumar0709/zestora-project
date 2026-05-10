import type { Meal } from "@/data/meals";

const ADDRESS_KEY = "zestora.address";
const PENDING_KEY = "zestora.pendingOrder";
const HISTORY_KEY = "zestora.orderHistory";

export interface Address {
  fullName: string;
  mobile: string;
  address: string;
  landmark: string;
  pincode: string;
}

export interface PendingOrder {
  mealId: string;
  mealName: string;
  price: number;
  quantity: number;
  address: Address;
}

export type PaymentMethod = "card" | "upi" | "wallet" | "cod";

export interface OrderRecord extends PendingOrder {
  id: string;
  placedAt: number;
  paymentMethod: PaymentMethod;
  status: "Out for delivery" | "Delivered";
  etaMinutes: number;
}

export function saveAddress(addr: Address) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADDRESS_KEY, JSON.stringify(addr));
}

export function getAddress(): Address | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ADDRESS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Address;
  } catch {
    return null;
  }
}

export function savePendingOrder(o: PendingOrder) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PENDING_KEY, JSON.stringify(o));
}

export function getPendingOrder(): PendingOrder | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PENDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingOrder;
  } catch {
    return null;
  }
}

export function clearPendingOrder() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_KEY);
}

export function buildOrderFromMeal(meal: Meal, address: Address, quantity = 1): PendingOrder {
  return {
    mealId: meal.id,
    mealName: meal.name,
    price: meal.price,
    quantity,
    address,
  };
}

export function getOrderHistory(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as OrderRecord[];
  } catch {
    return [];
  }
}

export function addOrderToHistory(order: PendingOrder, paymentMethod: PaymentMethod): OrderRecord {
  const record: OrderRecord = {
    ...order,
    id: `ZS-${Math.floor(1000 + Math.random() * 9000)}`,
    placedAt: Date.now(),
    paymentMethod,
    status: "Out for delivery",
    etaMinutes: 25,
  };
  if (typeof window !== "undefined") {
    const history = getOrderHistory();
    localStorage.setItem(HISTORY_KEY, JSON.stringify([record, ...history]));
  }
  return record;
}