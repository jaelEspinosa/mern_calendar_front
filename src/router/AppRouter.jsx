
import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import CheckingPage from "../auth/pages/CheckingPage"
import { RegisterPage } from "../auth/pages/RegisterPage"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"


export const AppRouter = () => {

   // const authStatus =  'checking'    //'checking' 'authenticated' 'not-authenticated'
    const { status, startRenew } = useAuthStore()


    useEffect(() => {
     const token = localStorage.getItem('token') 
    
     if(token){
       startRenew( token )  
     }    
     
    }, []);
    
    
    return (
    <Routes>

    
    {
       status !== 'authenticated' && status !== 'checking' && status === 'not-authenticated'
       ? (
        <>
         <Route path="/auth/login" element= {<LoginPage />}/>
         <Route path="/auth/register" element= {<RegisterPage />}/>
         <Route path="/*" element= {<Navigate to='/auth/login'/>}/>
        </>
         
         )
       : status === 'checking' && status !== 'authenticated' && status !== 'not-authenticated' ? <Route path="/*" element ={<CheckingPage />}/>

       : (
        <>
        <Route path="/" element = {<CalendarPage />} />
        <Route path="/*" element = {<Navigate to='/' />} />

        </>
        )
    }
    
    
    </Routes>
  )
}
