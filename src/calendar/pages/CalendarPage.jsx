import { useEffect, useState } from "react";

import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'





import { Navbar, CalendarEvent, CalendarModal, FabAddNew} from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore} from "../../hooks";
import { FabDeleteEvent } from "../components/FabDeleteEvent";




export const CalendarPage = () => {
 

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const { openDateModal } = useUiStore()
  const { user } = useAuthStore()
  
  const { events, setActiveEvent, activeEvent, startGetEvents } = useCalendarStore()
 
  const onDoubleClick = event => {
   
    openDateModal()
  }
  const onSelect = event => {
       setActiveEvent ( event )
     //  openDateModal()   //*para mobile
  }
  const onViewChanged = event => {
    localStorage.setItem('lastView', event)
  }
  useEffect(() => {
    startGetEvents()  //!  esto me genera una peticion para actualizar los eventos
  }, [])

  const enventStyleGetter = ( event, start, end, isSelected )=>{
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

        const style = {
        backgroundColor: isMyEvent ? '#347CF7' : '#465660',
        borderRadius: '8px',
        opacity: '0.8',
        color: 'white'
    }
       
    return {
     style
    }
}
  
  
  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={ localizer }
        events={events}
        defaultView= { lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesES() }
        eventPropGetter = { enventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent = { onDoubleClick }
        onSelectEvent = { onSelect }
        onView = { onViewChanged }
        
      />
      <CalendarModal />
      <FabAddNew />
     {activeEvent && <FabDeleteEvent /> } 
    </>
  );
};
