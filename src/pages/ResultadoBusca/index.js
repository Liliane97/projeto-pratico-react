import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../../services/api"
import "./resultado.css"
export default function  ResultadoBusca(){
    const [term,setTerm] = useState([])
    const [searchTerm,] = useSearchParams()
    const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function resultSearch(){
        await api.get(`search/movie?query=${searchTerm.get("filme")}`,{
          params:{
            api_key:"1cc11671d90cc03b547e4e874d8b5586",
            language:"pt-BR",
          }
        })
        .then((response)=>{
            setTerm(response.data.results)
            setLoading(false)
        })
        .catch(()=>{
               
          console.log("Filme não encontrado");
          return
        })
    }
    resultSearch()
  },[searchTerm])

  if(loading){
    return(
        <div className="loading">
            <h2>Carregando resultado da busca..</h2>
        </div>
    )
}
return(     
    <>
       {
        term.length !==0?
          <div className="container-results">
                {term.map((t)=>{
                  return(
                    <a  className="results" key={t.id}  href={`/filme/${t.id}`}>
                      {
                        t.poster_path?
                        <img src={`https://image.tmdb.org/t/p/original/${t.poster_path}`} alt={t.title}/>
                        :
                        <div className="square">
                          <span>Prime Fix</span>
                        </div>
                        }
                      <p>{t.title}</p>
                    </a>
                  )
                })}
          </div>
          :
          <div className="info-result">
            <div>
              <p>
                Ops! O filme  <span>{searchTerm.get("filme")}</span> não foi encontrado:(
              </p>
            </div>
              <div className="link-home">
              <a href="/">Voltar para a home</a>
              </div>
          </div>
       }
    </>
)
}