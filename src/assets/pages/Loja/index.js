import React, { useState, useEffect } from 'react';
import { BsCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../../services/local';
import { Link } from 'react-router-dom';
import './style.css';

const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYT') || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = '/api/sites/MLB/search?q=cerveja';
                const response = await fetch(url);
                if (!response.ok) throw new Error('API request failed');
                const objJson = await response.json();
                setData(objJson.results);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    const handleClick = (obj) => {
        const element = cart.find((e) => e.id === obj.id);
        if (element) {
            const arrFilter = cart.filter((e) => e.id !== obj.id);
            setCart(arrFilter);
            setItem('carrinhoYT', arrFilter);
        } else {
            const updatedCart = [...cart, obj];
            setCart(updatedCart);
            setItem('carrinhoYT', updatedCart);
        }
    };

    return (
        <div>
            <div className="store-header">
                <h1>Loja</h1>
                <Link to='/Carrinho' className="button-cart">
                    Carrinho ({cart.length})
                </Link>
            </div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="store-items">
                    {data.map((e) => (
                        <div key={e.id} className="store-item">
                            <h4>{e.title}</h4>
                            <img src={e.thumbnail} alt={e.title} />
                            <h4>R$ {e.price}</h4>
                            <button onClick={() => handleClick(e)}>
                                {cart.some((itemCart) => itemCart.id === e.id) ? (
                                    <BsCartCheckFill />
                                ) : (
                                    <BsCartPlusFill />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Store;
