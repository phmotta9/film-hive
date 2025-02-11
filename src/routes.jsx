import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from "./components/Header";
import Erro from "./pages/Erro";
import Lista from "./pages/Lista";
import TopRated from "./pages/TopRated";
import Favoritos from "./pages/Favoritos";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filme/:id" element={<Filme/>}/>
                <Route path="/lista" element={<Lista/>}/>
                <Route path="/top_rated" element={<TopRated/>}/>
                <Route path="/favoritos" element={<Favoritos/>}/>

                <Route path="*" element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;
