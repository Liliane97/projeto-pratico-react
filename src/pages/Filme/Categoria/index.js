import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import moment from "moment"
import api from "../../../services/api"
import "./categoria.css"
import Paginacao from "../../../components/Paginacao"

export default function Categoria(){
    const {id} = useParams()
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [total,setTotal] = useState({
        total_pages:0,
        total_results:0
    })
    useEffect(()=>{
        async function loadFilmePorCategoria(){
            await api.get(`discover/movie?with_genres=${id}&page=${currentPage}`,{
                params:{
                    api_key:"1cc11671d90cc03b547e4e874d8b5586",
                    language:"pt-BR",
                }
              })
              .then((response)=>{
                setLista(response.data.results.slice(0,5))
                setTotal({ 
                  total_pages:response.data.total_pages,
                  total_results: response.data.total_results
              })
                setLoading(false)
              })
              .catch(()=>{
               
                console.log("Filme não encontrado");
                return
              })
        }
        loadFilmePorCategoria()
    },[id,currentPage])

    let nomeCategoria = id.split("-")
    
    if(loading){
      return(
          <div className="loading">
              <h2>Carregando filme da categoria {nomeCategoria[1]}...</h2>
          </div>
      )
  }
  const handleNextPage = () => {
    if (currentPage > 0) {
        setCurrentPage((page) => page +1);
        setLoading(true)
    }
   
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage((page) => page -1);
        setLoading(false)
    }
  };
    
    return(
      <div className="container-categoria">
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
        
           <Paginacao nextPage={handleNextPage} prevPage= {handlePrevPage} current={currentPage} total={{totalPerPages:total.total_pages}}/>
        
      </div>
    )
}
