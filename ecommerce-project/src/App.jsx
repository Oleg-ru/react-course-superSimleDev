import './App.css'
import {HomePage} from "./pages/HomePage.jsx";
import {Route, Routes} from "react-router";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.jsx";
import {OrdersPage} from "./pages/OrdersPage.jsx";
import {TrackingPage} from "./pages/TrackingPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [cart, setCart] = useState([])

    useEffect(() => {
        axios.get('/api/cart-items')
            .then(response => {
                setCart(response.data);
            })
    }, [])

  return (
    <>
        <Routes>
            <Route index element={<HomePage cart={cart}/>} />
            <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="tracking" element={<TrackingPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  )
}

export default App
