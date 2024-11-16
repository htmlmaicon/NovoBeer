import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function User() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redireciona para o login se não tiver token
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/user/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                } else {
                    alert(data.msg);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [id, navigate]);

    return (
        <div>
            {user ? (
                <div>
                    <h2>Bem-vindo, {user.name}!</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default User;
