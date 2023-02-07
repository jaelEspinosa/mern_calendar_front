
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabDeleteEvent = () => {

    const { activeEvent, startDeletingEvent } = useCalendarStore()

    const { isDateModalOpen } = useUiStore();

    const handleDeleteEvent = () => {
        startDeletingEvent()
    }


  return (
    <>
    
    <button
    onClick={ handleDeleteEvent }
    className={`btn btn-danger fab-danger ${isDateModalOpen ? 'invisible' : ''}`}
    >
   <i className='fas fa-trash-alt'></i>     
   
   </button>
    </>
   
  )
}
