import { useEffect, useState } from "react"; 
import api from '../../services/api';
import { Link } from "react-router-dom";
import './toprated.css';

function TopRated() {
    const [melhoresFilmes, setMelhoresFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/top_rated", {
                params: {
                    api_key: "0b07d2e49999809ae40c68821c28e342",
                    language: "pt-BR",
                    page: 1,
                }
            });

            const filmesPagina1 = response.data.results;

            const response2 = await api.get("movie/top_rated", {
                params: {
                    api_key: "0b07d2e49999809ae40c68821c28e342",
                    language: "pt-BR",
                    page: 2,
                }
            });

            const filmesPagina2 = response2.data.results;

            const filmesCompletos = [...filmesPagina1, ...filmesPagina2];

            setMelhoresFilmes(filmesCompletos);
            setLoading(false);
        }
        loadFilmes();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        );
    }

    return (
        <div className="toprated-body">
            <h1>Melhores Filmes Avaliados</h1>
            <div className="toprated-list">
                {melhoresFilmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <div className="toprated-poster">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                    alt={filme.title}
                                />
                                <Link to={`/filme/${filme.id}`} className="toprated-title">
                                    <div>
                                        <h3>{filme.title}</h3>
                                        <h4>{parseFloat(filme.vote_average).toFixed(1)}</h4>
                                    </div>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default TopRated;