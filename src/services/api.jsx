//Base da URL:https://api.themoviedb.org/3/
//URL da API:https://api.themoviedb.org/3/movie/now_playing?api_key=0b07d2e49999809ae40c68821c28e342

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;