import {formatMoney} from "../../utils/money.js";
import axios from "axios";
import {useState} from "react";

export function CartItemDetails({cartItem, loadCart}) {

    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

    const deleteCartItem = async () => {
        await axios.delete(`api/cart-items/${cartItem.productId}`);
        await loadCart()
    };

    const handleSwitchUpdateInput = () => {
        setIsUpdatingQuantity(!isUpdatingQuantity);
    }

    return (
        <>
            <img className="product-image"
                 src={cartItem.product.image}/>

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                                            <span>
                                                Quantity: <input
                                                type="text"
                                                className="quantity-textbox"
                                                style={{opacity: isUpdatingQuantity ? 1 : 0}}
                                            />
                                                <span className="quantity-label">{cartItem.quantity}</span>
                                            </span>

                    <span
                        className="update-quantity-link link-primary"
                        onClick={handleSwitchUpdateInput}
                    >
                                                    Update
                                                </span>
                    <span
                        className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                    >
                                                    Delete
                                                </span>
                </div>
            </div>
        </>
    );
}