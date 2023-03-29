import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

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

    const [signUpMessage, setSignUpMessage] = useState('');
    const [signUpDone, setSignUpDone] = useState(false);

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
                    username: 'Username should have at least 4 characters'
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

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    email: "There is no valid email"
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
         // Password

        if (formData.password.trim().length < 6) {
            validationErrors.password = true;
            setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    password: 'Password should have at least 6 characters'
                };
            });
        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
                    validationErrors.password = true;
                    setErrors(prevErrors =>{
                    return {
                        ...prevErrors, 
                        password: "Password shouldn'n have empty characters"
                    };
                });  
        } else 
                if(!/[!@#$%^&*()_+\-=[\]{};':",.<>/?]+/.test(formData.password.trim())) {
                validationErrors.password = true;
                setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    password: "Password must contain one of charts: ! # @ $ %"
                }; 
            });
        } else {
                validationErrors.password = false;
                setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    password: ""
                };
            }); 
        }

        // Confirm password
        if (formData.password.trim() !== formData.confirmPassword.trim()) {
                validationErrors.confirmPassword = true;
                setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    confirmPassword: "Password should be the same"
                };
            });
        } else {
            validationErrors.password = false;
                setErrors(prevErrors =>{
                return {
                    ...prevErrors, 
                    confirmPassword: ""
                };
            });
        }

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
    
        axios
        .post("https://akademia108.pl/api/social-app/user/signup", {
        username: formData.username,
        email: formData.password,
        password: formData.password
        })
        .then((res) => {
            console.log(res.data);
            let resData = res.data;
            if (resData.signedup) {
                setSignUpMessage("Account created")
                setSignUpDone(true)
            } else {
                if (resData.message.username) {
                    setSignUpMessage(resData.message.username[0])
                } else if (resData.message.email) {
                    setSignUpMessage(resData.message.email[0])
                }
            }
         })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
            <div className="signUp">
                {props.user && <Navigate to="/" />}
                <form onSubmit={handleSubmit} >  

                    {signUpMessage && <h2>{signUpMessage}</h2> }

                    <input type="text" name="username" placeholder="User name"  onChange={handleInputChange}/>
                    {errors.username && <p>{errors.username}</p>}

                    <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                    {errors.email && <p>{errors.email}</p>}

                    <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    {errors.password && <p>{errors.password}</p>}

                    <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleInputChange} />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

                    <button className="btn" disabled={signUpDone}>Sign Up</button>

                    {signUpDone && <div className="btn">

                        <Link to='/login'>Go to login</Link>
                    </div>}
                </form>
            </div>
            )
}

export default SignUp;