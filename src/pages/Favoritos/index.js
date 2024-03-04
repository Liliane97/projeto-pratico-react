
import { useEffect, useState } from "react"
import "./favorito.css"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Dialog, DialogActions, DialogTitle ,DialogContent,DialogContentText} from "@mui/material"

export default function Favoritos(){
    const [filmes,setFilmes] = useState([])
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(true)
    const [deletar,setDeletar] = useState()
    const [nomeFilmeDeletado,setNomeFilmeDeletado] = useState("")

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeFlix")
        setFilmes(JSON.parse(minhaLista) || [])
        setLoading(false)

    },[])
    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@primeFlix",JSON.stringify(filtroFilmes))
        toast.success("Filme removido com  sucesso!!!")
        setOpen(false);
    }

  const handleClickOpen = (id,title) => {
    setOpen(true);
    setDeletar(id)
    setNomeFilmeDeletado(title)
  };
  const handleClose = () => {
    setOpen(false);
  };
  if(loading){
    return(
        <div className="loading">
            <h2>Carregando lista de filmes...</h2>
        </div>
    )
}
    return(
        <div className="meus-filmes">
            <h1>Meus filmes</h1>
            {filmes.length === 0 && <span>Você ainda não possui nenhum filme salvo :(</span>}
            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button  onClick={()=>handleClickOpen(filme.id,filme.title)}>Excluir
                                </button>
                            </div>
                        </li>
                    )
                })}
               <Dialog 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle className="titulo-modal" id="alert-dialog-title">
                       <span> {"Tem certeza que deseja excluir o filme da sua lista?"}</span>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText className="titulo-filme-modal">
                            <span>{nomeFilmeDeletado}</span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="area-button-acao">
                        <Button  onClick={()=>setOpen(false)}>Não</Button>
                        <Button   onClick={()=>excluirFilme(deletar)}>Sim</Button>
                    </DialogActions>
                </Dialog>
            </ul>
        </div>
    )
}