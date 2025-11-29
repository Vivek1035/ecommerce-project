import './App.css'
import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/HomePage';
import { CheckoutPage } from './Pages/checkout/CheckoutPage';
import { OrdersPage } from './Pages/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import { PageNotFound } from './Pages/PageNotFound';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="checkout" element={<CheckoutPage/>} />
      <Route path="orders" element={<OrdersPage/>} />
      <Route path="tracking" element={<TrackingPage/>} />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  )
}

export default App
