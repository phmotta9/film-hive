import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api';
import { toast } from "react-toastify";
import StarRating from "../../components/StarRating/star_rating";
import { FaHeart } from "react-icons/fa"; 
import { FaPlus } from 'react-icons/fa'; 
import { FaFilm } from 'react-icons/fa'; 


function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const [favorito, setFavorito] = useState(false); 

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "0b07d2e49999809ae40c68821c28e342",
                        language: "pt-BR",
                    }
                });

                setFilme(response.data);
                setLoading(false);

                const favoritosSalvos = JSON.parse(localStorage.getItem("@favoritos")) || [];
                const isFavorito = favoritosSalvos.some(fav => fav.id === response.data.id);
                setFavorito(isFavorito);

            } catch {
                navigate("/", { replace: true });
            }
        }

        loadFilmes();
    }, [id, navigate]);

    function toggleFavorito() {
        let favoritos = JSON.parse(localStorage.getItem("@favoritos")) || [];

        if (favorito) {
            favoritos = favoritos.filter(fav => fav.id !== filme.id);
            toast.warn("Removido dos favoritos!");
        } else {
            favoritos.push(filme);
            toast.success("Adicionado aos favoritos!");
        }

        localStorage.setItem("@favoritos", JSON.stringify(favoritos));

        setFavorito(!favorito);
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@filmes");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some(filmesSalvos => filmesSalvos.id === filme.id);

        if(hasFilme){
            toast.warn("O filme já está salvo");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
        toast.success("Filme adicionado à sua lista");
    }

    if(loading){
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <img className="background-poster" src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <img className="capa" src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            
            <h1>{filme.title} ({filme.release_date.slice(0,4)})</h1>

            <div className="area-info">
                <span>{filme.overview}</span>
                <strong>{parseFloat(filme.vote_average).toFixed(1)}</strong>
            </div>

            <div className="area-avaliacao">
                <h3>Avalie este filme:</h3>
                <StarRating movieId={filme.id} />
            </div>

            <div className="area-buttons">
                <button onClick={salvarFilme}> <FaPlus size={24}/> Salvar </button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>  <FaFilm size={24} /> Trailer
                    </a>
                </button>
                <button onClick={toggleFavorito} className="favorito-btn">
                    <FaHeart color={favorito ? "red" : "gray"} size={24} /> Curtir
                </button>
            </div>
        </div>
    );
}

export default Filme;