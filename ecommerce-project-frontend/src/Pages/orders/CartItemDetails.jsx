import { updateCartItemQuantity, deleteCartItem } from "../../api/api";
import { formatCurrency } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const handleDeleteCartItem = async () => {
        try {
            await deleteCartItem(cartItem.productId);
            await loadCart();
        } catch (err) {
            console.error("Failed to delete cart item", err);
        }
    };

    const handleUpdateQuantity = async () => {
        if (isUpdatingQuantity) {
            try {
                await updateCartItemQuantity(
                    cartItem.productId,
                    Number(quantity)
                );
                await loadCart();
                setIsUpdatingQuantity(false);
            } catch (err) {
                console.error("Failed to update quantity", err);
            }
        } else {
            setIsUpdatingQuantity(true);
        }
    };


    const updateQuantityInput = (event) => {
        setQuantity(event.target.value);
    }

    const keyQuantityPressed = (event) => {
        const keyPressed = event.key;
        if (keyPressed === 'Enter') handleUpdateQuantity();
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
                        onClick={handleUpdateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={handleDeleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}