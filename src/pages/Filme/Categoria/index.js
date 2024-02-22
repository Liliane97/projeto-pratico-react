import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"
import api from "../../../services/api"
import "./categoria.css"
export default function Categoria(){
    const {id,name} = useParams()
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])

    useEffect(()=>{
        async function loadFilmePorCategoria(){
            await api.get(`discover/movie?with_genres=${id}`,{
                params:{
                    api_key:"1cc11671d90cc03b547e4e874d8b5586",
                    language:"pt-BR",
                }
              })
              .then((response)=>{
                setLista(response.data.results)
                setLoading(false)
              })
              .catch(()=>{
               
                console.log("Filme não encontrado");
                return
              })
        }
        loadFilmePorCategoria()
    },[id])
    
    let nomeCategoria = id.split("-")
    if(loading){
      return(
          <div className="loading">
              <h2>Carregando filme da categoria {nomeCategoria[1]}...</h2>
          </div>
      )
  }
    
    return(
      <div className="container">
         <h1>Categoria: {nomeCategoria[1]}</h1>
        {lista.map((lista)=>{
          return(
            <div key={lista.id}> 
             <div className="card-filmes">
                <img src= {`https://image.tmdb.org/t/p/original/${lista.poster_path}`} alt={lista.title}  />
              <div className="info-filme">
                <span>{lista.title}</span>
                <span className="data-lancamento">Data de lançamento:
                  <span>{moment(lista.release_date).format("DD-MM-YYYY")}</span>
                </span>
                <a className="detalhes" href={`/filme/${lista.id}`}>Ver detalhes</a>
                </div>
              </div>
             </div>
          )
        })}
      </div>
    )
}
