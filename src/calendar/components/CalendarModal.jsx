
import { useEffect,  useMemo,  useState } from "react";
import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addHours, differenceInSeconds } from "date-fns";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";


registerLocale('es', es )

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  
  

  const [ formSubmited, setFormSubmited ] = useState(false)
  
  const { isDateModalOpen,  closeDateModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()
  const { user } = useAuthStore ()



  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });


 const isMyEvent = useMemo(() => {
  if(user.uid === activeEvent?.user._id || user.uid === activeEvent?.user.uid) {
    return true
   }

  if(!activeEvent?.id) return true 
  return false
  }, [activeEvent, user])
  

  useEffect(() => {
    if (activeEvent!==null){
      
      setFormValues ({...activeEvent})
    }
    
  }, [activeEvent])

  function onCloseModal() {
    closeDateModal()
    
  }

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onDateChange = (e, changing) => {
    setFormValues({
      ...formValues,
      [changing]: e,
    });
  };

  
  const handleSubmit = async e => {

    e.preventDefault()
    setFormSubmited( true )

    const difference = differenceInSeconds(formValues.end, formValues.start )
    
    if (isNaN ( difference ) || difference <= 0) {      
      Swal.fire('Error en Fecha / hora de fin', 'Revisar fecha y hora de Fin', 'error')
      return
    }
    if ( formValues.title.length < 3 || formValues.notes.length < 5) return;
    
    await startSavingEvent( formValues )
    closeDateModal()
    setFormSubmited( false )
  }
  

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose= { onCloseModal }
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      
    >
      <h1>{activeEvent?.id ? 'Editar evento' : 'Nuevo evento'} <span className={`${isMyEvent ? 'd-none': 'h5 text-secondary'}`}>(Sólo lectura)</span> </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            minDate={ new Date()}
            selected={ formValues.start }
            className="form-control"
            onChange={(e) => onDateChange(e, "start")}
            dateFormat="Pp"
            locale="es"
            showTimeSelect
            timeCaption = 'Hora'
            value={formValues.start}
            disabled={!isMyEvent}
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={ formValues.start }
            selected={ formValues.end }
            className="form-control"
            onChange={(e) => onDateChange(e, "end")}
            dateFormat="Pp"
            locale="es"
            showTimeSelect
            timeCaption = 'Hora'
            value={formValues.end}
            disabled={!isMyEvent}

          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            
            type="text"
            className={`form-control ${formSubmited && formValues.title.length < 3 ? 'is-invalid': formSubmited ?  'is-valid' : '' }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={handleChange}
            disabled={!isMyEvent}
          />
         

          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            
            type="text"
            className={`form-control ${formSubmited && formValues.notes.length < 5 ? 'is-invalid': formSubmited ?  'is-valid' : ''  }`}
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={handleChange}
            disabled={!isMyEvent}
          ></textarea>
          
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button disabled={ !isMyEvent } type="submit" className={`btn btn-outline-primary btn-block ${!isMyEvent ? 'btn-outline-secondary' : '' }`}> 
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
