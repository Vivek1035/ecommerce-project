import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

if (!API_BASE_URL) {
  console.error("VITE_API_BASE_URL is not defined");
}

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getCartItems() {
  const res = await fetch(
    `${API_BASE_URL}/api/cart-items?expand=product`
  );
  if (!res.ok) throw new Error("Failed to fetch cart items");
  return res.json();
}

export const addToCart = (productId, quantity) =>
  api.post("/api/cart-items", {
    productId,
    quantity,
  });