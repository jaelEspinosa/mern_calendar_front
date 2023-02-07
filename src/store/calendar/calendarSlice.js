import { createSlice } from '@reduxjs/toolkit'





export const calendarSlice = createSlice({
  name: 'calendar',
  initialState : {
       isLoadingEvents: true, 
       events: [],
       activeEvent: null
  },

  reducers: {
      onGetEvents: ( state, { payload = [] } ) =>{
           state.isLoadingEvents= false 
            // state.events = payload; //! yo lo habia puesto asi.

           payload.forEach( event => {
              const exist = state.events.some( dbEvent => dbEvent.id === event.id )

              if (!exist) {
                state.events.push(event)
              }
            })
      },

      onSetActiveEvent : ( state, { payload } ) => {
          state.activeEvent = payload;
      },

      onAddNewEvent: (state, { payload }) => {
          state.events.push( payload )
          state.activeEvent = null;
      },

      onUpdateEvent: (state, { payload }) => {

          state.events = state.events.map( event => {
              if ( event.id === payload.id ) {
                return payload;
              }
              return event;
            });
          state.activeEvent = null;
      },

      onDeleteEvent: ( state ) =>{
          state.events = state.events.filter( event => event.id !== state.activeEvent.id );
          state.activeEvent = null;
      },

      onClearState :( state ) => {
          state.isLoadingEvents = true;
          state.events = [];
          state.activeEvent= null;

      }
      

  }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onGetEvents, onClearState } = calendarSlice.actions