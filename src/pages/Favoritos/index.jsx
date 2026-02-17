import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 

function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const filmesFavoritos = JSON.parse(localStorage.getItem("@favoritos")) || [];
        setFavoritos(filmesFavoritos);
    }, []);

    const removerFavorito = (id) => {
        const novosFavoritos = favoritos.filter(filme => filme.id !== id);
        setFavoritos(novosFavoritos);

        localStorage.setItem("@favoritos", JSON.stringify(novosFavoritos));
    };

    return (
        <div className="toprated-body">
            <h1>Meus Filmes Favoritos</h1>

            {favoritos.length === 0 ? (
                <span className="lista-vazia">Você ainda não adicionou filmes aos favoritos</span>
            ) : (
                <div className="toprated-list">
                    {favoritos.map((filme) => (
                        <article key={filme.id}>
                            <div className="toprated-poster">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                                    alt={filme.title}
                                />
                                <Link to={`/filme/${filme.id}`} className="toprated-title">
                                    <div className="toprated-info">
                                        <h3>{filme.title}</h3>
                                        <h4>{parseFloat(filme.vote_average).toFixed(1)}</h4>
                                    </div>
                                </Link>
                                <button onClick={() => removerFavorito(filme.id)} className="botao-remover">
                                    <FaTrashAlt size={15} /> Remover
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favoritos;