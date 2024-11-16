import React, { useState } from 'react';
import axios from 'axios';

const CadastroProduto = () => {
    const [produto, setProduto] = useState({ nome: '', preco: '', descricao: '', imagem: null });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e) => {
        setProduto((prevState) => ({ ...prevState, imagem: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('nome', produto.nome);
        formData.append('preco', produto.preco);
        formData.append('descricao', produto.descricao);
        formData.append('imagem', produto.imagem);

        console.log('Dados enviados para o backend:', {
            nome: produto.nome,
            preco: produto.preco,
            descricao: produto.descricao,
            imagem: produto.imagem,
        });

        try {
            const response = await axios.post('http://localhost:5000/api/produtos/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.mensagem);
            setProduto({ nome: '', preco: '', descricao: '', imagem: null });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Preço:</label>
                    <input
                        type="number"
                        name="preco"
                        value={produto.preco}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <textarea
                        name="descricao"
                        value={produto.descricao}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Imagem:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
                </button>
            </form>
        </div>
    );
};

export default CadastroProduto;
