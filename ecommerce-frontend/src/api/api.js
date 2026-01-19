import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const api = axios.create({
  baseURL: API_BASE_URL, // domain only
});

// PRODUCTS
export const getProducts = async () => {
  const res = await api.get("/api/products");
  return res.data;
};

// CART
export const getCartItems = async () => {
  const res = await api.get("/api/cart-items?expand=product");
  return res.data;
};

export const addToCart = (productId, quantity) =>
  api.post("/api/cart-items", { productId, quantity });
