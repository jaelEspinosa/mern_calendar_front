import { useAuthStore } from "../../hooks"



 export const useEnventStyleGetter = ( event, start, end, isSelected )=>{
    
   

    const style = {
     backgroundColor: '#347CF7',
     borderRadius: '8px',
     opacity: '0.8',
     color: 'white'
    }
    
    /* if ( user._id === event.user._id )  {
        style.backgroundColor = '#282055'
        style.color = 'pink'
    } */

    return {
     style
    }
}