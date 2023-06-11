import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Routes,Route, useNavigate} from 'react-router-dom';
import { removeUser } from '../stores/auth';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardLayout from '../pages/Dashboard/DashboardLayout';
import Users from '../pages/Dashboard/Users';
import Meters from '../pages/Dashboard/Meters';
import Meter from '../pages/Dashboard/Meter';
import User from '../pages/Dashboard/User';
import Customers from '../pages/Dashboard/Customers';
import Customer from '../pages/Dashboard/Customer';

function ProtectedRoute(){
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(!(user.role&& user.role.includes('Admin'))){
            localStorage.removeItem('token')
            dispatch(removeUser())
            navigate('/notenoughclearance',{replace:true})
        }
        else{

        }
    },[])

    return(
        <Routes>
            <Route path='*' element={<DashboardLayout/>}>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='users' element={<Users/>}/>
                <Route path='user/:id' element={<User/>}/>
                <Route path='meters' element={<Meters/>}/>
                <Route path='meter/:serialNo' element={<Meter/>}/>
                <Route path='customers' element={<Customers/>}/>
                <Route path='customer/:id' element={<Customer/>}/>
                <Route path='*' element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}
export default ProtectedRoute