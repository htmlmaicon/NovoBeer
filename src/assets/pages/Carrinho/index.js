import React, { useState } from 'react';
import { getItem, setItem } from '../../services/local';
import { BsCartDash } from "react-icons/bs";
import "./stylle.css";
import Voltar from '../../componsts/voltar/index.js';

const Carrinho = () => {
    const [data, setData] = useState(getItem('carrinhoYT') || []);

    const removeItem = (obj) => {
        const arrFilter = data.filter((item) => item.id !== obj.id);
        setData(arrFilter);
        setItem('carrinhoYT', arrFilter);
    };

    return (
        <div>
            <Voltar></Voltar>
            <h1>Carrinho</h1>
            <div className='produto-container'>
                {data.map((e) => (
                    <div className='produto' key={e.id}>
                        <img src={e.thumbnail} alt={e.title} />
                        <div>
                            <h4>{e.title}</h4>
                            <h4>{e.price}</h4>
                        </div>
                        <button onClick={() => removeItem(e)}>
                            <BsCartDash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carrinho;
