import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../styles/Login.css';
import {saveUser} from '../../stores/auth.js';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../stores/authService';
import { useEffect } from 'react';

function Register(){
    const [registerUser]=useRegisterMutation()
    const navigate = useNavigate()
    const loginDispatch = useDispatch()

    const {user}=useSelector(state=>state.auth)
    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    /*useEffect(()=>{
        if(user.role?.includes('Admin'))
            navigate('/dashboard',{replace:true})
            navigate('/')
    },[])*/
    
    const onSubmit = (data) => {
        registerUser(
            {
                email:data.email,
                userName:data.userName,
                password:data.password,
                passwordValidation:data.passwordValidation,
                firstName:data.firstName,
                lastName:data.lastName

            }).then(d=>{
            if(!d.error){
                loginDispatch(saveUser(d.data.data.token))
                localStorage.setItem("token",d.data.data.token)
                navigate('/',{replace:true})
            }
        })
        reset()
      };

    return(
        <>
           <div className="wrapper">
            <div className="logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Faa-logo-osospolares.png" alt=""/>
            </div>
            <div className="text-center mt-4 name">
                OSOS
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-3 mt-3">
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input {...register("email")} type="text" name="email" id="email" placeholder="Email"/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input {...register("userName")} type="text" name="userName" id="email" placeholder="Username"/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input {...register("password")} type="password" name="password" id="pwd" placeholder="Password"/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input {...register("passwordValidation")} type="password" name="passwordValidation" id="passwordValidation" placeholder="password Validation"/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input {...register("firstName")} type="text" name="firstName" id="firstName" placeholder="First Name"/>
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input {...register("lastName")} type="text" name="lastName" id="lastName" placeholder="Last Name"/>
                </div>
                <button type='submit' className="btn mt-3">Register</button>
            </form>
            <div className="text-center fs-6">
                <Link to="/login">Have an account?</Link>
            </div>
        </div>
        </>
        )
}

export default Register