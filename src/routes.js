import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../src/assets/pages/Home';
import Login from './assets/pages/Login';
import Loja from '../src/assets/pages/Loja';
import Erro from '../src/assets/pages/Erro';
import Carrinho from '../src/assets/pages/Carrinho';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Loja" element={<Loja/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/carrinho" element={<Carrinho/>}/>
                <Route path="/*" element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;


