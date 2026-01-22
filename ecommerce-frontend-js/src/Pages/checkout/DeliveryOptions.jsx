import dayjs from "dayjs";
import { formatCurrency } from "../../utils/money";
import { updateCartItemDeliveryOption } from "../../api/api";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let priceString = 'FREE Shipping';

                if (cartItem.product.priceCents > 0) {
                    priceString = `${formatCurrency(deliveryOption.priceCents)} - Shipping`;
                }

                const updateDeliveryOption = async () => {
                    try {
                        await updateCartItemDeliveryOption(
                            cartItem.productId,
                            deliveryOption.id
                        );
                        await loadCart();
                    } catch (err) {
                        console.error("Failed to update delivery option", err);
                    }
                };

                return (
                    <div key={deliveryOption.id}
                        className="delivery-option"
                        onClick={updateDeliveryOption}>
                        <input type="radio"
                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                            onChange={() => { }}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {priceString}
                            </div>
                        </div>
                    </div>
                );
            })}

        </div>
    );
}