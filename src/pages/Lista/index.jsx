import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrashAlt } from "react-icons/fa"; 
import './lista.css'

function Lista() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@filmes");
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        });

        setFilmes(filtroFilmes);
        localStorage.setItem("@filmes", JSON.stringify(filtroFilmes));
        toast.success("Filme removido da sua lista");
    }

    return (
        <div className="toprated-body">
            <h1>Filmes Salvos</h1>

            {filmes.length === 0 && <span className="lista-vazia">Lista vazia</span>}

            <div className="toprated-list">
                {filmes.map((item) => {
                    return (
                        <article key={item.id}>
                            <div className="toprated-poster">
                                <img
                                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                    alt={item.title}
                                />
                                <Link to={`/filme/${item.id}`} className="toprated-title">
                                    <div className="toprated-info">
                                        <h3>{item.title}</h3>
                                        <h4>{parseFloat(item.vote_average).toFixed(1)}</h4>
                                    </div>
                                </Link>
                                <button className="botao-remover" onClick={() => excluirFilme(item.id)}>
                                    <FaTrashAlt size={15} /> Remover
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

export default Lista;