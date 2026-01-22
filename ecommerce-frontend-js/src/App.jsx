import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import { HomePage } from './Pages/home/HomePage';
import { CheckoutPage } from './Pages/checkout/CheckoutPage';
import { OrdersPage } from './Pages/orders/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import { PageNotFound } from './Pages/PageNotFound';

import { getCartItems } from './api/api';

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const data = await getCartItems();
      setCart(data);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<PageNotFound cart={cart} />} />
    </Routes>
  );
}

export default App;
