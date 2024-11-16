import React, { useState, useEffect } from 'react';
import { BsCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../../services/local';
import { Link } from 'react-router-dom';
import './style.css';
import Voltar from '../../components/voltar';
import { db } from '../../services/firebaseconnection';
import { collection, getDocs } from 'firebase/firestore';

const Store = () => {
    const [data, setData] = useState([]); // Produtos
    const [cart, setCart] = useState(getItem('carrinhoYT') || []); // Carrinho local
    const [loading, setLoading] = useState(true); // Status de carregamento

    // Buscar produtos no Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollection = collection(db, 'produtos'); // Coleção no Firestore
                const productSnapshot = await getDocs(productCollection); // Buscar documentos
                const productList = productSnapshot.docs.map((doc) => ({
                    id: doc.id, // ID do documento
                    ...doc.data(), // Dados do documento
                }));
                setData(productList); // Atualizar estado com produtos
            } catch (error) {
                console.error('Erro ao buscar produtos do Firestore:', error);
            } finally {
                setLoading(false); // Finalizar carregamento
            }
        };
        fetchProducts();
    }, []);

    // Adicionar ou remover do carrinho
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
                <Voltar />
                <h1>Loja</h1>
                <Link to="/Carrinho" className="button-cart">
                    Carrinho ({cart.length})
                </Link>
                <Link to="/Cadastroprodutos" className="button-cart">
                    Cadastrar Novo Produto
                </Link>
            </div>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="store-items">
                    {data.map((e) => (
                        <div key={e.id} className="store-item">
                            <h4>{e.nome}</h4>
                            <img src={e.imagemUrl} alt={e.nome} />
                            <h4>R$ {(e.preco / 100).toFixed(2)}</h4> {/* Ajuste para valores monetários */}
                            <p>{e.descricao}</p>
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
