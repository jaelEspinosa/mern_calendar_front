import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';

import './loginPage.css';

const registerFormFields = {
    registerName:      "",
    registerEmail:     "",
    registerPassword:  "",
    registerPassword2: ""
}

const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
const formValidations = {
    registerName: [(value) => value.length >= 4 , 'El nombre es obligatorio.'],
    registerEmail: [(value) => validEmail.test( value ), 'Formato de Correo no Válido.'],
    registerPassword: [(value) => value.length >=6, 'El password debe tener 6 caracteres mínimo.'], 
}

export const RegisterPage = () => {
   const [isSubmiting, setIsSubmiting] = useState(false)

   const { startRegister, errorMessage } = useAuthStore()

   const { registerName, registerEmail, registerPassword, 
            registerPassword2, isFormValid, registerNameValid,
            registerEmailValid, registerPasswordValid,
            onInputChange: onRegisterInputChange, 
            formState: registerFormState } = useForm( registerFormFields, formValidations )
   
   const passwordEqual = useMemo( () =>{
            if( registerPassword === registerPassword2 ) return true;            
            return false         
    }, [registerPassword, registerPassword2]);  
    
   const onRegisterSubmit = e => {
        setIsSubmiting( true )
        e.preventDefault();
        if( !isFormValid ) return;        
        if( !passwordEqual) return;
        startRegister ({ name:registerName, email: registerEmail, password: registerPassword });
    } 

    useEffect(() => {
      
        if (errorMessage !== undefined) {
         Swal.fire('Error', errorMessage, 'error')
        }
       
     }, [errorMessage]);

        return (
              <div className="container login-container register">
                    <div className="login-form-2">
                      <h3>Nuevo Usuario</h3>
                      <form onSubmit={ onRegisterSubmit } noValidate>
                          <div className="form-group mb-2">
                              <input
                                  type="text"
                                  className={`form-control ${isSubmiting && registerNameValid ? 'is-invalid' : ''}`}
                                  placeholder="Nombre"
                                  name='registerName'
                                  value={ registerName }
                                  onChange = { onRegisterInputChange }
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="email"
                                  className={`form-control ${isSubmiting && registerEmailValid ? 'is-invalid' : ''}`}
                                  placeholder="Correo"
                                  name='registerEmail'
                                  value={ registerEmail }
                                  onChange = { onRegisterInputChange }
                              />
                          </div>
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className={`form-control ${isSubmiting && registerPasswordValid ? 'is-invalid' : ''}`}
                                  placeholder="Contraseña" 
                                  name='registerPassword'
                                  value={ registerPassword }
                                  onChange = { onRegisterInputChange }
                              />
                          </div>
  
                          <div className="form-group mb-2">
                              <input
                                  type="password"
                                  className={`form-control ${isSubmiting && !passwordEqual ? 'is-invalid' : ''}`}
                                  placeholder="Repita la contraseña" 
                                  name='registerPassword2'
                                  value={ registerPassword2 }
                                  onChange = { onRegisterInputChange }
                              />
                            {isSubmiting && !passwordEqual ? <p className='mt-1 bg-white text-danger text-center rounded'>Los passwords no coinciden</p>:null}  
                          </div>
  
                          <div className="form-group mb-2 mt-4 d-flex justify-content-around align-items-center">
                              <input 
                                  type="submit" 
                                  className="btnSubmit" 
                                  value="Crear cuenta" />

                              <Link to='/auth/login'><p className='m-0 text-white text-center'>¿Ya tienes Cuenta?</p></Link> 
                          </div>
                      </form>
                  </div>
              </div>
         
  )
}
