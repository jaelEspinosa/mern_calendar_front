

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm, useAuthStore } from '../../hooks';

import './loginPage.css';

const loginFormFields = {
    loginEmail:    "",
    loginPassword: ""
}


export const LoginPage = () => {

    const [isSubmiting, setIsSubmiting] = useState(false)

    const { loginEmail, loginPassword, isFormValid, 
            onInputChange: onLoginInputChange, 
            formState: loginFormState } = useForm( loginFormFields )
   
    const{ startLogin, errorMessage } = useAuthStore()
    
    const onLoginSubmit = e => {
        e.preventDefault();
        setIsSubmiting( true )
        if (!loginEmail || !loginPassword) {
            return
        }
        startLogin({ email: loginEmail , password: loginPassword })
    }
  
    useEffect(() => {
      
       if (errorMessage !== undefined) {
        Swal.fire('', errorMessage, '')
       }
      
    }, [errorMessage])
    

    return (
        <div className="container login-container login">
            
                <div className="login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ onLoginSubmit } noValidate>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className={`form-control ${ isSubmiting && loginEmail.length < 3 ? 'is-invalid' : ''}`}
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className={`form-control ${ isSubmiting && loginPassword.length < 3 ? 'is-invalid' : ''}`}
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2 mt-4 d-flex justify-content-between align-items-center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                            <Link to='/auth/register'><p className='m-0 text-primary text-center'>¿No tienes Cuenta?</p></Link> 
                        </div>
                    </form>
                </div>

                
            </div>
        
    )
}