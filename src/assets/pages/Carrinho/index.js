import React, { useState } from 'react';
import { getItem, setItem } from '../../services/local';
import { BsCartDash } from "react-icons/bs";
import "./style.css";
import Voltar from '../../components/voltar/index.js';

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
                        <a
                                href={`https://www.mercadolivre.com.br/cerveja-heineken-premium-garrafa-6-long-neck-330ml/p/MLB19537829?pdp_filters=item_id:MLB3642215280#wid=MLB3642215280&sid=search&is_advertising=true&searchVariation=MLB19537829&position=2&search_layout=stack&type=pad&tracking_id=4fab41d8-0ccf-4b40-bb35-f7b996577702&is_advertising=true&ad_domain=VQCATCORE_LST&ad_position=2&ad_click_id=NDRlMTc0ZmQtZmRiZC00MGUwLWFkODctZjg4MTEwMzE4OTMx`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="buy-button"
                            >
                                Comprar
                            </a>
                    </div>
                ))}
            </div>
        </div>
        
    );
};

export default Carrinho;
