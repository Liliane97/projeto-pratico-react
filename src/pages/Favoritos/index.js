
import { useEffect, useState } from "react"
import "./favorito.css"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"

export default function Favoritos(){
    const [filmes,setFilmes] = useState([])
    const [open, setOpen] = useState(false);
    const [loading,setLoading] = useState(true)

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
        setOpen(false)
    }

  const handleClickOpen = () => {
    setOpen(true);
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
                                <button  onClick={handleClickOpen}>Excluir</button>
                            </div>
                            <Dialog 
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogTitle>
                                    {"Tem certeza que deseja excluir o filme da sua lista?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button  onClick={handleClose}>Não</Button>
                                    <Button onClick={()=>excluirFilme(filme.id)}>Sim</Button>
                                </DialogActions>
                            </Dialog>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}