import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setMessage('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Cadastro realizado com sucesso!');
                setTimeout(() => {
                    setMessage('');
                    navigate('/login'); // Redireciona para a página de login
                }, 2000);
            } else {
                setMessage('Erro: ' + (data.error || 'Erro desconhecido.'));
            }
        } catch (error) {
            setMessage('Erro ao cadastrar: ' + error.message);
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
                                placeholder=" "
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label>NOME</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>EMAIL</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder=" "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label>SENHA</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder=" "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
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
