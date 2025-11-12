import {DeliveryOptions} from "./DeliveryOptions.jsx";
import {CartItem} from "./CartItem.jsx";
import {DeliveryDate} from "./DeliveryDate.jsx";

export function OrderSummary({deliveryOptions, cart, loadCart}) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map(cartItem => {

                const selectedDeliveryOptions = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId
                })

                return (
                    <div key={cartItem.productId} className="cart-item-container">

                        <DeliveryDate
                            selectedDeliveryOptions={selectedDeliveryOptions}
                        />

                        <div className="cart-item-details-grid">
                            <CartItem
                                cartItem={cartItem}
                                loadCart={loadCart}
                            />

                            <DeliveryOptions
                                deliveryOptions={deliveryOptions}
                                cartItem={cartItem}
                                loadCart={loadCart}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}