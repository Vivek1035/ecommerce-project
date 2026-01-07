import axios from "axios";
import { formatCurrency } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    const updateCartItem = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: cartItem.quantity + 1
        });
        await loadCart();
    };

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
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateCartItem}>
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