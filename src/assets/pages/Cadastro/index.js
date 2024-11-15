import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword } from '../../services/firebaseconnection';

import '../../pages/Cadastro/style.css';

function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valida se as senhas coincidem
        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }

        try {
            // Cadastra o usuário no Firebase
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('Usuário cadastrado com sucesso!');
            setTimeout(() => {
                setMessage('');
                navigate('/login'); // Redireciona para a tela de login após o cadastro
            }, 2000);
        } catch (error) {
            setMessage('Erro ao cadastrar usuário: ' + error.message);
        }
    };

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="form-box login">
                    <h2>CADASTRE-SE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                required
                                placeholder=" "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label>NOME</label>
                        </div>
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
                        <div className="input-box">
                            <input
                                type="password"
                                required
                                placeholder=" "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <label>REPETIR SENHA</label>
                        </div>
                        <button type="submit" className="btn">Cadastrar</button>
                    </form>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
