import React from 'react';
import '../../pages/Login/style.css'
import { Link } from 'react-router-dom';

function Login(){
    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="form-box login">
                    <h2>LOGIN</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="email" required placeholder=" " />
                            <label>E-MAIL</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input type="password" required placeholder=" " />
                            <label>SENHA</label>
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />Relembre-me
                            </label>
                            <a href="#">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" className="btn">LOGIN</button>
                        <div className="login-register">
                            <p>Não está cadastrado?<Link to="/cadastro" className="nav-link nav-link-custom">Cadastrar-se</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
