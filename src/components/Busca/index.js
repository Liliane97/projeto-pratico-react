import { Icon } from '@iconify/react';
import "./pesquisa.css"
import { useEffect, useState } from 'react';
import { useLocation,  useNavigate, useSearchParams  } from 'react-router-dom';

export default function Pesquisa(){
    const navigate = useNavigate()
    const [searchTerm,setSearchTerm] = useSearchParams("")
    const [item,setItem] = useState(searchTerm.get("filme") || "")
    const path = useLocation()

    useEffect(()=>{
        async function searchFilmes(){
                if( item.length >=3 && item.trim()){
                    setSearchTerm({filme:item},false)
                    navigate(`/pesquisa?filme=${item}`)
                }
                
                if( path.pathname === '/pesquisa' && item.length === 0){
                    navigate("/")
                }
        }

       searchFilmes()
        
    },[item,navigate,searchTerm,setSearchTerm,path.pathname])
    
    const handleSearchChange = (e) => {
        e.preventDefault()
        setItem(e.target.value)
      };
     
    return(
        <div className="container-search">
           <span className="pesquisa">
                <Icon icon="material-symbols:search"  height={28}/>
           </span>
                <input placeholder="Pesquisar filme..." value={item}   onChange={handleSearchChange} />
        </div>
    )
}