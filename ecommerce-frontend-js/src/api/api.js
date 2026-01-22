import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// PRODUCTS
export const getProducts = async (search) => {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await api.get(`/api/products${query}`);
  return res.data;
};

// CART
export const getCartItems = async () => {
  const res = await api.get("/api/cart-items?expand=product");
  return res.data;
};

// ADD TO CART
export const addToCart = async (productId, quantity = 1) => {
  const res = await api.post("/api/cart-items", {
    productId,
    quantity,
  });
  return res.data;
};

// UPDATE CART ITEM QUANTITY
export const updateCartItemQuantity = async (productId, quantity) => {
  const res = await api.put(`/api/cart-items/${productId}`, { quantity });
  return res.data;
};

// DELETE CART ITEM
export const deleteCartItem = async (productId) => {
  const res = await api.delete(`/api/cart-items/${productId}`);
  return res.data;
};

// DELIVERY OPTIONS
export const getDeliveryOptions = async () => {
  const res = await api.get(
    "/api/delivery-options?expand=estimatedDeliveryTime"
  );
  return res.data;
};

// UPDATE DELIVERY OPTION
export const updateCartItemDeliveryOption = async (
  productId,
  deliveryOptionId
) => {
  const res = await api.put(`/api/cart-items/${productId}`, {
    deliveryOptionId,
  });
  return res.data;
};

// PAYMENT SUMMARY
export const getPaymentSummary = async () => {
  const res = await api.get("/api/payment-summary");
  return res.data;
};

// CREATE ORDER
export const createOrder = async () => {
  const res = await api.post("/api/orders");
  return res.data;
};

// ORDERS
export const getOrders = async () => {
  const res = await api.get("/api/orders?expand=products");
  return res.data;
};

// ORDER BY ID
export const getOrderById = async (orderId) => {
  const res = await api.get(`/api/orders/${orderId}?expand=products`);
  return res.data;
};
