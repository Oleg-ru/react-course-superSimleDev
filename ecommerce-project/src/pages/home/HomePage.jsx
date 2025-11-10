import "./HomePage.css"
import {Header} from "../../components/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {ProductGrid} from "./ProductGrid.jsx";

export function HomePage({ cart }) {

    const [products, setProducts] = useState([])


    useEffect(() => {
        const getHomeData = async () => {
            const response = await  axios.get('/api/products');
            setProducts(response.data);
        }

        getHomeData();
    }, [])

    return (
        <>
            <link rel="icon" href="/home-favicon.png" />
            <title>Ecommerce project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductGrid products={products}/>
            </div>
        </>
    );
}