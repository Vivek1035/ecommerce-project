import { getOrders } from '../../api/api';
import { Header } from '../../components/Header';
import { useState, useEffect } from 'react';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                console.error("Failed to load orders", err);
            }
        };

        fetchOrderData();
    }, []);


    return (
        <>
            <title>Orders</title>
            <Header cart={cart} />
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}