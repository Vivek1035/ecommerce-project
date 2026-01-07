import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/home/HomePage';
import { CheckoutPage } from './Pages/checkout/CheckoutPage';
import { OrdersPage } from './Pages/orders/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import { PageNotFound } from './Pages/PageNotFound';

function App() {
  const [cart, setCart] = useState([]);
  
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<PageNotFound cart={cart} />} />
    </Routes>
  )
}

export default App
