import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import { Header } from '../../components/Header';

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
        const response = await axios.get('/api/products')
        setProducts(response.data);
        }
        
        getHomeData();
    }, []);

    return (
        <>
            <title>Ecommerce Project</title>
            <Header cart = {cart}/>
            <link rel="icon" href="/home-favicon.png" />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}