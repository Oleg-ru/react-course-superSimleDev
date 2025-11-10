import "./HomePage.css"
import {Header} from "../../components/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {ProductGrid} from "./ProductGrid.jsx";

export function HomePage({ cart }) {

    const [products, setProducts] = useState([])


    useEffect(() => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
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