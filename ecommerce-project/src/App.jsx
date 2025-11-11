import './App.css'
import {HomePage} from "./pages/home/HomePage.jsx";
import {Route, Routes} from "react-router";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.jsx";
import {OrdersPage} from "./pages/orders/OrdersPage.jsx";
import {TrackingPage} from "./pages/TrackingPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [cart, setCart] = useState([])

    useEffect(() => {
        const fetchApp = async () => {
            const response = await axios.get('/api/cart-items?expand=product');
            setCart(response.data)
        }

        fetchApp()
    }, [])

  return (
    <>
        <Routes>
            <Route index element={<HomePage cart={cart}/>} />
            <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
            <Route path="orders" element={<OrdersPage cart={cart} />} />
            <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  )
}

export default App
