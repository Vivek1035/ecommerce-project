import axios from "axios";
import { formatCurrency } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    const updateQuantity = async () => {
        if (isUpdatingQuantity) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            });
            await loadCart();
            setIsUpdatingQuantity(false);
        } else {
            setIsUpdatingQuantity(true);
        }
    };

    const updateQuantityInput = (event) => {
        setQuantity(event.target.value);
    }

    const keyQuantityPressed = (event) => {
        const keyPressed = event.key;
        if (keyPressed === 'Enter') updateQuantity();
        if (keyPressed === 'Escape') {
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatCurrency(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {isUpdatingQuantity
                            ? <input className="quantity-input-text" type="text"
                                value={quantity} onChange={updateQuantityInput} onKeyDown={keyQuantityPressed} />
                            : <span className="quantity-label">{cartItem.quantity}</span>}
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}