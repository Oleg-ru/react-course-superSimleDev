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

    const currentProduct = order.products.find((product) => product.productId === productId)

    return (
        <>
            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(currentProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                    </div>

                    <div className="product-info">
                        {currentProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {currentProduct.quantity}
                    </div>

                    <img className="product-image" src={currentProduct.product.image}/>

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}