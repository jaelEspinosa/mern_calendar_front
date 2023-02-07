import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { checking, clearErrorMessage, onClearState, onLogin, onLogout } from "../store";



export const useAuthStore = () => {


const { status, user, errorMessage } = useSelector( state => state.auth );


const dispatch = useDispatch();


const startLogin = async ({ email, password }) =>{
    dispatch( checking ())

    try {

        const { data } = await calendarApi.post('/auth', {email, password});
        
        localStorage.setItem('token', data.token)
        localStorage.setItem('token-init-date', new Date().getTime())
        const { name, uid } = data
        dispatch( onLogin ({name, uid}) )
        
    } catch (error) {

        console.log (error.response.data)
        dispatch( onLogout ('Usuario o contraseña incorrectos'))

        setTimeout(() => {
          dispatch( clearErrorMessage())  
        }, 20);
    }
}

const startRegister = async ({name, email, password}) =>{
    dispatch( checking() )

    try {
       const { data } = await calendarApi.post('/auth/new', {name, email, password})
       console.log( data ) 
       localStorage.setItem('token', data.token)
       localStorage.setItem('token-init-date', new Date().getTime())
       dispatch( onLogin({name:data.name, uid: data.uid}))

    } catch (error) {
       console.log(error.response.data)  
       
       dispatch( onLogout(error.response.data.msg))

       setTimeout(() => {
        dispatch( clearErrorMessage())  
      }, 20);
    }
       
}

const startLogout = () =>{
    dispatch( onLogout() )
    dispatch( onClearState() )
    localStorage.removeItem('token');
    localStorage.removeItem('token-init-date');
}

const startRenew = async (token)=>{
    dispatch( checking() )
    try {
       const { data } = await calendarApi.get('/auth/renew',{
        headers:{
            'X-TOKEN':token
        }        
       })
       localStorage.setItem('token', data.token)
       localStorage.setItem('token-init-date', new Date().getTime())
       dispatch( onLogin ({name:data.name, uid:data.uid}) )
      
    } catch (error) {
       console.log(error) 
       localStorage.removeItem('token')
       localStorage.removeItem('token-init-date')
       dispatch( onLogout('La sesion ha expirado.'))
    }
}


return{
    //properties
    status, 
    user, 
    errorMessage,


    //methods
    startLogin,
    startRegister,
    startLogout,
    startRenew
}

}