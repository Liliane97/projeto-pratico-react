import { useEffect, useState } from "react"
import "./style.css"
import { Link } from "react-router-dom"
import api from "../../services/api"

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
           <Link className="logo" to="/">Prime Fix</Link>
            <div className="menu">
                <button className="categoria">
                    Categorias
                    <ul className="lista-categoria" id="item">
                        {categorias.map((c)=>{
                            return(
                                <li key={c.id}>
                                    <Link to={`/filme/categoria/${c.id}-${c.name}`}>{c.name}</Link>
                                </li>
                            )
                        })}   
                    </ul>
                </button>
                <Link className="favoritos" to="/favoritos">Meus filmes</Link>
            </div>
        </header>
    )
}