import React, { useEffect, useState } from 'react'
import { useCalendarStore } from '../../hooks'


export const CalendarEvent = ( { event } ) => {

    const { title, user, id } = event

    const { activeEvent } = useCalendarStore()

    const [isSelected, setIsSelected] = useState(false)
    
   

    useEffect(() => {
    
      if ( activeEvent ){
       if ( id === activeEvent.id ){
        setIsSelected(true)
       }else{
        setIsSelected(false)
       }
      }else{
        setIsSelected(false)
      }
    
    }, [activeEvent])
    


  return (
    <div className={`${ isSelected ? 'active-event' : ''} `}>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </div>
  )
}
