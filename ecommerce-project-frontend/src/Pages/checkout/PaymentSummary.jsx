import { createOrder } from "../../api/api";
import { formatCurrency } from "../../utils/money";
import { useNavigate } from "react-router";

export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        try {
            await createOrder();
            await loadCart();
            navigate("/orders");
        } catch (err) {
            console.error("Failed to create order", err);
        }
    };


    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            {paymentSummary && (
                <>
                    <div
                        className="payment-summary-row"
                        data-testid="payment-summary-product-cost"
                    >
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">
                            {formatCurrency(paymentSummary.productCostCents)}
                        </div>
                    </div>

                    <div
                        className="payment-summary-row"
                        data-testid="payment-summary-shipping-cost"
                    >
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">
                            {formatCurrency(paymentSummary.shippingCostCents)}
                        </div>
                    </div>

                    <div
                        className="payment-summary-row subtotal-row"
                        data-testid="payment-summary-total-before-tax"
                    >
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">
                            {formatCurrency(paymentSummary.totalCostBeforeTaxCents)}
                        </div>
                    </div>

                    <div
                        className="payment-summary-row"
                        data-testid="payment-summary-tax"
                    >
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">
                            {formatCurrency(paymentSummary.taxCents)}
                        </div>
                    </div>

                    <div
                        className="payment-summary-row total-row"
                        data-testid="payment-summary-money"
                    >
                        <div>Order total:</div>
                        <div className="payment-summary-money">
                            {formatCurrency(paymentSummary.totalCostCents)}
                        </div>
                    </div>

                    <button className="place-order-button button-primary"
                        data-testid="place-order-button"
                        onClick={handleCreateOrder}>
                        Place your order
                    </button>
                </>
            )}

        </div>
    );
}