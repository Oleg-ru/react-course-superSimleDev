import "./TrackingPage.css"
import {Header} from "../components/Header.jsx";
import {data, Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({cart}) {

    const {orderId, productId} = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const request = async () => {
            const response = await axios.get(`api/orders/${orderId}?expand=products`)
            setOrder(response.data);
            console.log(response.data)
        }

        request();
    }, [orderId]);

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((product) => product.productId === productId);

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    //Вычисляем текущий статус для подсветки на фронте
    const currentStatus = {
        isPreparing: deliveryPercent < 33,
        isShipped: deliveryPercent >= 33 && deliveryPercent < 100,
        isDelivered: deliveryPercent === 100,
    }

    return (
        <>
            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image}/>

                    <div className="progress-labels-container">
                        <div className={`progress-label ${currentStatus.isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${currentStatus.isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${currentStatus.isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}