import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = '/api/sites/MLB/search?q=cerveja';
                const response = await fetch(url);
                if (!response.ok) throw new Error('API request failed');
                const objJson = await response.json();
                setData(objJson.results);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    const groupData = (data, size) => {
        let groupedData = [];
        for (let i = 0; i < data.length; i += size) {
            groupedData.push(data.slice(i, i + size));
        }
        return groupedData;
    };

    const CardCarousel = ({ data, loading }) => {
        return (
            <div className="mt-5">
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <Carousel>
                        {groupData(data, 6).map((group, index) => (
                            <Carousel.Item key={index}>
                                <div className="row">
                                    {group.map((item) => (
                                        <div key={item.id} className="col-md-2">
                                            <div className="card">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="card-img-top"
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text">R$ {item.price}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
            </div>
        );
    };

    return (
        <div>
            <Header />
            <main className="home-section">
                <h2 className="section-title text-center">Conheça as Rotas Cervejeiras</h2>
                <div className="row align-items-center" style={{ margin: '0' }}>
                    <div className="col-md-6">
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1844560.7784706496!2d-51.6676791750246!3d-25.449702690386122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scervejarias%20em%20guarapuava!5e0!3m2!1spt-BR!2sbr!4v1711928357904!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="info-container">
                            <h3 className="info-title">Descubra as Cervejarias Locais</h3>
                            <div className="info-block">
                                <h4>Cervejarias Artesanais</h4>
                                <p>Explore as melhores cervejarias artesanais da região. Cada uma oferece sabores únicos e experiências imperdíveis para os amantes de cerveja.</p>
                            </div>
                            <div className="info-block">
                                <h4>Rotas Personalizadas</h4>
                                <p>Monte sua própria rota de visitação, passando por cervejarias com diferentes estilos e atmosferas. Aproveite a jornada com amigos ou em tours guiados.</p>
                            </div>
                            <div className="info-block">
                                <h4>Novos Lançamentos</h4>
                                <p>Esteja por dentro dos últimos lançamentos de cervejas exclusivas e sazonais. Descubra quais rótulos estão fazendo sucesso nas cervejarias locais.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carrossel de Cards */}
                <CardCarousel data={data} loading={loading} />

                {/* Seção informativa sobre o Beer Maper ocupando a tela toda */}
                <div className="info-container-full">
                    <div className="info-card">
                        <h3 className="info-title">O que é o Beer Maper?</h3>

                        <div className="info-block">
                            <h4>Mapa de Cervejarias Locais</h4>
                            <p>O Beer Maper é uma plataforma dedicada a conectar entusiastas de cerveja às melhores cervejarias artesanais da região. Com ele, você descobre onde estão os estabelecimentos mais renomados e o que eles têm a oferecer, ajudando você a aproveitar ao máximo a diversidade de sabores e experiências.</p>
                        </div>

                        <div className="info-block">
                            <h4>Roteiros Personalizáveis</h4>
                            <p>Crie e personalize seus próprios roteiros de visitação. O Beer Maper permite que você explore diversas opções de cervejarias, cada uma com suas próprias características e estilos de cerveja, para aproveitar uma experiência única adaptada ao seu gosto.</p>
                        </div>

                        <div className="info-block">
                            <h4>Facilidade de Navegação</h4>
                            <p>A plataforma é intuitiva e fácil de usar, com ferramentas para montar sua rota, localizar cervejarias próximas e conferir informações detalhadas sobre cada uma. Você pode consultar horários, ofertas especiais e avaliações de outros usuários.</p>
                        </div>

                        <div className="info-block">
                            <h4>Eventos e Lançamentos</h4>
                            <p>Fique atualizado sobre os eventos e lançamentos de cervejas exclusivas, sazonais e colaborativas. Descubra as novidades das melhores cervejarias e aproveite o melhor do universo cervejeiro em sua cidade, desde festivais até lançamentos de cervejas limitadas e eventos especiais.</p>
                        </div>

                        <div className="info-block">
                            <h4>Comunidade e Avaliações</h4>
                            <p>Participe de uma comunidade de apaixonados por cerveja. No Beer Maper, você pode avaliar e recomendar suas cervejarias favoritas, compartilhar experiências com outros usuários e descobrir locais recomendados por entusiastas.</p>
                        </div>

                        <div className="info-block">
                            <h4>Conteúdo Exclusivo</h4>
                            <p>Acesse conteúdo exclusivo sobre o mundo das cervejas. Artigos, vídeos e dicas sobre estilos de cerveja, processos de fabricação, harmonizações e muito mais. O Beer Maper oferece uma verdadeira imersão no universo cervejeiro para quem deseja aprender e se aprofundar no tema.</p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default Home;
