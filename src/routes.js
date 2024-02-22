import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Header from "./components/Header";
import Error from "./pages/Error";
import Favoritos from "./pages/Favoritos";
import Categoria from "./pages/Filme/Categoria";
import ResultadoBusca from "./pages/ResultadoBusca";

export default function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
               <Route  path="/" element={<Home/>}/>
               <Route path="/filme/:id" element={<Filme/>}/>
               <Route path="/favoritos" element={<Favoritos/>}/>
               <Route path="/filme/categoria/:id" element={<Categoria/>}/>
               <Route path="/pesquisa" element={<ResultadoBusca/>}/>
               <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}