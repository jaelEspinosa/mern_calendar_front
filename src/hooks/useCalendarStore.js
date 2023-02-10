
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onDeleteEvent, onGetEvents, onSetActiveEvent, onUpdateEvent } from "../store"


export const useCalendarStore = () => {

  const dispatch = useDispatch()
  const { events, activeEvent  } = useSelector(state => state.calendar)
  const { user  } = useSelector(state => state.auth)

 const startGetEvents = async () =>{      
    try {
      const { data } = await calendarApi.get('/events') 
      
      
      const events = convertEventsToDateEvents( data )
     
      dispatch( onGetEvents( events ))
    
    } catch (error) {
      console.log(error)
    }  
  }
  
  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent ( calendarEvent ))
  }
  
  const startSavingEvent = async ( calendarEvent )=> {    
    const token = localStorage.getItem('token');
         
    try {
      
             if(calendarEvent.id) {    
                   
            //Actualizando         
               const url = `/events/${ calendarEvent.id }`          
               const { data } = await calendarApi.put(url, calendarEvent, {            
                   headers:{
                     'X-TOKEN': token
                   }
               })          
               dispatch ( onUpdateEvent ( {...calendarEvent} ))
               Swal.fire('Evento actualizado')      
               return;
           } 

             //Creando        
               const  {data} = await calendarApi.post('/events', calendarEvent, {
                 headers:{
                   'X-TOKEN': token
            }
          }); 
         Swal.fire('Evento guardado')                   
         dispatch( onAddNewEvent ( {...calendarEvent, id: data.id, user} ) ) 

    } catch (error) {
         console.log( error )
         Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
    
  }

  const startDeletingEvent = async () => {

    const token = localStorage.getItem('token');

    try {
      const url = `/events/${ activeEvent.id }`        
      await calendarApi.delete(url,{
        headers:{
          'X-TOKEN': token
        }
      })
     dispatch ( onDeleteEvent() )      
     Swal.fire('Eliminado','Evento eliminado','success')
           
    } catch (error) {
         console.log(error)
         Swal.fire('Error al eliminar', error.response.data.msg, 'error')
         dispatch ( setActiveEvent() )

    }
  }  
    return {


        //*properties 
        events,
        activeEvent,


        //*methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startGetEvents
  }

  
}
