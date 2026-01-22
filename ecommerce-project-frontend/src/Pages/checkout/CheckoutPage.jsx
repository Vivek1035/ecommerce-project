import { getDeliveryOptions, getPaymentSummary } from '../../api/api';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';
import './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const data = await getDeliveryOptions();
                setDeliveryOptions(data);
            } catch (err) {
                console.error("Failed to load delivery options", err);
            }
        };

        fetchCheckoutData();
    }, []);

    useEffect(() => {
        const fetchPaymentSummaryData = async () => {
            try {
                const data = await getPaymentSummary();
                setPaymentSummary(data);
            } catch (err) {
                console.error("Failed to load payment summary", err);
            }
        };

        fetchPaymentSummaryData();
    }, [cart]);


    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cart={cart} />
            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div >
        </>
    );
}