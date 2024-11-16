import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';  

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/produtos');
                setProducts(response.data);
            } catch (error) {
                console.error(error);
                alert('Erro ao carregar os produtos!');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="store-items">
            <h2>Produtos Cadastrados</h2>
            {products.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                products.map((product) => (
                    <div key={product._id} className="store-item">
                        <h4>{product.name}</h4>
                        <p>{product.description}</p>
                        <p>Preço: R${product.price}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductList;
