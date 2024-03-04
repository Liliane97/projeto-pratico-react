import { useEffect, useState } from "react"
import api from "../../services/api"
import "./home.css"
import Paginacao from "../../components/Paginacao";
export default function Home(){

    const [filmes, setFilmes] = useState([])
    const [loading,setLoading] = useState(true)
    const [currentPage,setCurrentPage] = useState(1)
    const [total,setTotal] = useState({
        total_pages:0,
        total_results:0
    })

    useEffect(()=>{

        async function loadFilmes(){

        const response = await api.get(`/movie/now_playing?page=${currentPage}`,{
            params:{
                api_key:"1cc11671d90cc03b547e4e874d8b5586",
                language:"pt-BR",
            }
         })
         setTotal({ 
             total_pages:response.data.total_pages,
             total_results: response.data.total_results
         })

        setFilmes(response.data.results.slice(0,8))
        setLoading(false)
    }
    loadFilmes()
    },[currentPage])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }
   
    const handleNextPage = () => {
        if (currentPage > 0) {
            setCurrentPage((page) => page +1);
            setLoading(true)
           ;
        }
      }
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((page) => page -1);
            setLoading(false)
        }
      };

    return (
      <div className="container-list">
        <div className="lista-filmes">
            {filmes.map((filme,i)=>{
                return (
                     <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                        <a href={`/filme/${filme.id}`}>Acessar</a>
                    </article>
                )
            })}
        </div>
         <Paginacao nextPage={handleNextPage} prevPage= {handlePrevPage} current={currentPage} total={{totalPerPages:total.total_pages}}/>
      </div>
    )
}