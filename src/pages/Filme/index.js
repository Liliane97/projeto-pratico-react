import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../services/api"
import './filme.css'
import { toast } from "react-toastify"
export default function Home(){
    const {id} = useParams()
    const navigation = useNavigate()
    const [loading,setLoading] = useState(true)
    const [filme, setFilme] =useState({})
   

    useEffect(()=>{
        async function loadFilme(){
          await api.get(`/movie/${id}`,{
            params:{
                api_key:"1cc11671d90cc03b547e4e874d8b5586",
                language:"pt-BR",
            }
          })
          .then((response)=>{
            console.log("xx",response.data);
            setFilme(response.data)
            setLoading(false)
          
          })
          .catch(()=>{
            navigation("/",{replace:true})
            console.log("Filme não encontrado");
            return
          })
        }
        loadFilme()
        return () =>{
            console.log("O componente desmontado");
        }
    },[navigation,id])

    function salvarFime(){
        const minhaLista = localStorage.getItem("@primeFlix")
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo)=>filmeSalvo.id === filme.id)
        console.log(hasFilme);
        if(hasFilme){
            toast.warn("Esse filme já se encontra na sua lista!!!")
            return
        }
        filmesSalvos.push(filme)
        localStorage.setItem("@primeFlix",JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!!!")

    }
    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando detalhes do filme...</h2>
            </div>
        )
    }
    return (
       <div className="filme-info">
        
        <h1>{filme.title} </h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average} / 10</strong>
      
        <div className="area-buttons">
            <button onClick={salvarFime}>Salvar</button>
            <button>
                <a href={`http://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external noreferrer" >Trailer</a>
            </button>
        </div>
       

       </div>
    )
}