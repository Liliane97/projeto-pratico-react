import { useEffect, useState } from "react"
import "./style.css"

import api from "../../services/api"
import Pesquisa from "../Busca"

export default function Header(){
    const [categorias, setCategoria] = useState([])
    
    useEffect(()=>{
        async function loadFilmesCategoria(){
            const category = await api.get("/genre/movie/list",{
                params:{
                    api_key:"1cc11671d90cc03b547e4e874d8b5586",
                    language:"pt-BR",
                    page:1,
                }
             })
             setCategoria(category.data.genres)
        }
        loadFilmesCategoria()
    },[])
    return (
        <header>
           <a className="logo" href="/">Prime Fix</a>
           <Pesquisa/>
            <div className="menu">
                <button className="categoria">
                    Categorias
                    <ul className="lista-categoria" id="item">
                        {categorias.map((c)=>{
                            return(
                                <li key={c.id}>
                                    <a href={`/filme/categoria/${c.id}-${c.name}`}>{c.name}</a>
                                </li>
                            )
                        })}   
                    </ul>
                </button>
                <a className="favoritos" href="/favoritos">Meus filmes</a>
            </div>
       
        </header>
    )
}