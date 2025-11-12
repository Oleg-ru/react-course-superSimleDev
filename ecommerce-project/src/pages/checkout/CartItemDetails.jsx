import {formatMoney} from "../../utils/money.js";
import axios from "axios";
import {useState} from "react";

export function CartItemDetails({cartItem, loadCart}) {

    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    /*
    Удаление товара
     */
    const deleteCartItem = async () => {
        await axios.delete(`api/cart-items/${cartItem.productId}`);
        await loadCart()
    };

    /*
    Переключатель отображения поля ввода для изменения кл-ва товара
     */
    const handleSwitchUpdateInput = () => {
        setIsUpdatingQuantity(!isUpdatingQuantity);
    }

    /*
    Обновляет кл-во товаров на сервере
     */
    const updateQuantityRequest = async () => {
        await axios.put(`api/cart-items/${cartItem.productId}`, {
            quantity: Number(quantity)
        })
    }

    /*
    Обновляет кл-во товаров и отображает на странице
     */
    const updateQuantity = () => {
        if (isUpdatingQuantity) {
            updateQuantityRequest();
            setIsUpdatingQuantity(false);
            loadCart()
        }
    }

    /*
        Обновляет кл-во товаров
     */
    const updateQuantityInput = (event) => {
        setQuantity(event.target.value);
    }

    /*
    Обработчик нажатий принятия или отмены изменений при редактировании кл-ва товаров
     */
    const handleQuantityKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateQuantity()
        }
        if (event.key === 'Escape') {
            setQuantity(cartItem.quantity);
            setIsUpdatingQuantity(false);
        }
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
                                                Quantity:
                                            <input
                                                type="text"
                                                className="quantity-textbox"
                                                style={{opacity: isUpdatingQuantity ? 1 : 0}}
                                                value={quantity}
                                                onChange={updateQuantityInput}
                                                onKeyDown={handleQuantityKeyDown}
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