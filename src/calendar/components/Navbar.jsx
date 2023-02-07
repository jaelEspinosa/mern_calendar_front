import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useAuthStore } from "../../hooks"


export const Navbar = () => {

  const { user, startLogout } = useAuthStore()

  const [userToShow, setUserToShow] = useState('')

  useEffect(() => {
   if (user.name.length > 12){
    setUserToShow(user.name.slice(0, 13)+'...')
   }else{
    setUserToShow(user.name)
   }
  
   
  }, [user])

  const handleLogout = ()=>{
   startLogout()
   Swal.fire('Se ha cerrrado la sesion','', 'success')
  }
  
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            { userToShow }
        </span>

        <button 
        onClick={ handleLogout }
        className="btn btn-outline-danger"
        
        >
            <i className="fa fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
