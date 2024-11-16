import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Cadastro/style.css';
import Voltar from '../../components/voltar';
function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, confirmpassword: confirmPassword })
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.msg);
                navigate('/login');
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="form-box login">
                    <Voltar/>
                    <h2>CADASTRE-SE</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input type="text" required placeholder=" " value={name} onChange={(e) => setName(e.target.value)} />
                            <label>NOME</label>
                        </div>
                        <div className="input-box">
                            <input type="email" required placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>EMAIL</label>
                        </div>
                        <div className="input-box">
                            <input type="password" required placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label>SENHA</label>
                        </div>
                        <div className="input-box">
                            <input type="password" required placeholder=" " value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <label>REPETIR SENHA</label>
                        </div>
                        <button type="submit" className="btn">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
