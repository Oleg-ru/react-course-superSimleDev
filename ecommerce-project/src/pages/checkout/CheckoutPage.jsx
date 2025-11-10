import "./CheckoutPage.css"
import {CheckoutHeader} from "./CheckoutHeader.jsx";
import {formatMoney} from "../../utils/money.js";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import {OrderSummary} from "./OrderSummary.jsx";
import {PaymentSummary} from "./PaymentSummary.jsx";

export function CheckoutPage({cart}) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {

        const fetchCheckoutData = async () => {
            let response = await axios.get("api/delivery-options?expand=estimatedDeliveryTime");
            setDeliveryOptions(response.data);

            response = await axios.get('api/payment-summary');
            setPaymentSummary(response.data);
        }

        fetchCheckoutData()
    }, []);

    return (
        <>
            <link rel="icon" href="/cart-favicon.png"/>
            <title>Checkout</title>

            <CheckoutHeader/>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart}/>

                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}