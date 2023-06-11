import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../../styles/Login.css';
import {saveUser} from '../../stores/auth.js';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../stores/authService';
import { useEffect } from 'react';

function Login(){
    const [loginUser]=useLoginMutation()
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
        /*const response = fetch("http://localhost:8080/api/Auth/login/",{method:"POST",headers:{
            "Content-Type": "application/json",
        },body:JSON.stringify(data)})*/
        //const response = fetch("http://localhost:8080/api/auth/login"/*"https://localhost:44370/api/auth/login"*/,{method:"POST",headers:{
        /*    "Content-Type": "application/json",
        },body:JSON.stringify(data)})
        .then(r=>{
            if(r.ok)
                return r.json()
            else{
                throw new Error('Parameter is not a number!');
            }
            
        })
        .then(a=>{
            loginDispatch(login(a.token))
            navigate('/dashboard',{replace:true})
        })
        .catch(e=>console.log(e))*/
        loginUser({email:data.email,password:data.password}).then(d=>{
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
                <span className="fas fa-key"></span>
                <input {...register("password")} type="password" name="password" id="pwd" placeholder="Password"/>
            </div>
            <button type='submit' className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
            <Link to="/register">Sign up</Link>
        </div>
    </div>
    </>
    )
}

export default Login;