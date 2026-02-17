import { useEffect, useState } from "react"; 
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [melhoresFilmes, setMelhoresFilmes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes(){
            const responseNowPlaying = await api.get("movie/now_playing", {
                params: {
                    api_key: "0b07d2e49999809ae40c68821c28e342",
                    language: "pt-BR",
                    page: 1,
                }
            });

            setFilmes(responseNowPlaying.data.results.slice(0, 8));

           
            const responseTopRated = await api.get("movie/top_rated", {
                params: {
                    api_key: "0b07d2e49999809ae40c68821c28e342",
                    language: "pt-BR",
                    page: 1,
                }
            });

            setMelhoresFilmes(responseTopRated.data.results.slice(0, 8)); 

            setLoading(false);
        }

        loadFilmes();
    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        );
    }

    return(
        <div className="body">
            <div className="banner">
                {filmes.length > 0 && (
                    <img
                        key={filmes[Math.floor(Math.random() * filmes.length)].id}
                        src={`https://image.tmdb.org/t/p/original/${filmes[Math.floor(Math.random() * filmes.length)].backdrop_path}`}
                        alt={filmes[Math.floor(Math.random() * filmes.length)].title}
                    />
                )}
                <h1>Descubra e avalie filmes</h1>
            </div>

            <div className="container">
                <h1>Novidades no Cinema</h1>
                <div className="lista-filmes">
                    {filmes.map((filme) => {
                        return (
                            <article key={filme.id}>
                                <div className="filme-poster">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                        alt={filme.title}
                                    />
                                    <Link to={`/filme/${filme.id}`} className="filme-title">
                                        <div className="filme-info">
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

            <div className="container">
                <h1><Link to={`/top_rated`}>Melhores Avaliados...</Link></h1>
                <div className="lista-filmes">
                    {melhoresFilmes.map((filme) => {
                        return (
                            <article key={filme.id}>
                                <div className="filme-poster">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                        alt={filme.title}
                                    />
                                    <Link to={`/filme/${filme.id}`} className="filme-title">
                                        <div className="filme-info">
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
        </div>
    );
}

export default Home;