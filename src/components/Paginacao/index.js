import { Icon } from '@iconify/react';
import './paginacao.css'

export default function  Paginacao({prevPage,nextPage,current,total}){
   
    return (
        <div className="pagination">
            <Icon 
            onClick={prevPage}
            icon="material-symbols:arrow-back-ios-rounded"  height={28}  className="arrow-left"/>
            <span>
                {current} de {total.totalPerPages}
            </span>
            <Icon 
            onClick={nextPage}
            icon="material-symbols:arrow-forward-ios-rounded"  height={28}
            className="arrow-right"/>
       </div>
    )
}