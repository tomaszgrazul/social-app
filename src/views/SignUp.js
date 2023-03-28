import { useState } from "react";
import { Navigate } from "react-router-dom";

import './SignUp.css'

const SignUp = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validate = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        };

        // Username
        if (formData.username.trim().length < 4) {
            validationErrors.username = true;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    username: 'Username should have at least 4'
                };
                // rejestracja użytkownika 16.05
            });
        } else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    username: "Username shouldn'n have empty characters"
                };
            });
        } else {
            validationErrors.username = false;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    username: ""
                };
            });
        }   
          // Email

        if ( !/^[A-Z0-9._%+-] + @[A-Z0-9.-] + \.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    email: "Thera is no valid email"
                };
            });
        } else {
            validationErrors.email = false;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    email: ""
                };
            });
        }
         // 27.20
        return (
                !validationErrors.username && 
                !validationErrors.email && 
                !validationErrors.password && 
                !validationErrors.confirmPassword
            );
    };

    const handleInputChange = (e) => {
        // console.log(e.target.value)
        const target = e.target;
        const name = target.name;

        setFormData ({
            ...formData,
            [name]: target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!validate()) {
             return;
        }
    
        console.log('wysyłam');
    };

    return (
            <div className="signUp">
                {props.user && <Navigate to="/" />}
                <form onSubmit={handleSubmit} >  
                    <input type="text" name="username" placeholder="User name"  onChange={handleInputChange}/>
                    {errors.username && <p>{errors.username}</p>}

                    <input type="email" name="username" placeholder="Email" onChange={handleInputChange} />
                    {errors.email && <p>{errors.email}</p>}

                    <input type="password" name="username" placeholder="Password" onChange={handleInputChange} />

                    <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleInputChange} />
                    <button className="btn" >Sign Up</button>
                </form>
            </div>
            )
}

export default SignUp;