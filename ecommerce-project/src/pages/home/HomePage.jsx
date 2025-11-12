import "./HomePage.css"
import {Header} from "../../components/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {ProductGrid} from "./ProductGrid.jsx";
import {useSearchParams} from "react-router";

export function HomePage({ cart, loadCart }) {

    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');


    useEffect(() => {
        const getHomeData = async () => {
            //const response = await  axios.get('/api/products');
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        }

        getHomeData();
    }, [search])

    return (
        <>
            <link rel="icon" href="/home-favicon.png" />
            <title>Ecommerce project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}