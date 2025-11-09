import './App.css'
import {HomePage} from "./pages/HomePage.jsx";
import {Route, Routes} from "react-router";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.jsx";
import {OrdersPage} from "./pages/OrdersPage.jsx";
import {TrackingPage} from "./pages/TrackingPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="tracking" element={<TrackingPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </>
  )
}

export default App
