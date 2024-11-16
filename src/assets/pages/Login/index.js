import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../../services/firebaseconnection';
import '../../pages/Login/style.css';
import Voltar from '../../components/voltar';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Usuário logado com sucesso!');
            setTimeout(() => {
                setMessage('');
                navigate('/Home');
            }, 2000);
        } catch (error) {
            setMessage('Erro ao logar: ' + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, provider);
            setMessage('Login com Google realizado com sucesso!');
            setTimeout(() => {
                setMessage('');
                navigate('/Home');
            }, 2000);
        } catch (error) {
            setMessage('Erro ao logar com Google: ' + error.message);
        }
    };

    return (
        <div className="page-container">.
            <div className="wrapper">
                <div className="form-box login">
                <Voltar/>
                    <h2>LOGIN</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-box">
                            <input
                                type="email"
                                required
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>EMAIL</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                required
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>SENHA</label>
                        </div>
                        <button type="submit" className="btn">LOGIN</button>
                    </form>

                    <div className="google-login">
                        <button onClick={handleGoogleLogin} className="btn-google">Login com Google</button>
                    </div>

                    {message && <p className="message">{message}</p>}

                    <div className="login-register">
                        <p>Não está cadastrado? <Link to="/cadastro" className="nav-link nav-link-custom">Cadastrar-se</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
