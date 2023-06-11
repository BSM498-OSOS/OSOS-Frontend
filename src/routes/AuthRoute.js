import {Routes,Route} from 'react-router-dom';
import AuthLayout from '../pages/Auth/AuthLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
function AuthRoute(){
    return(
        <Routes>
            <Route path='*' element={<AuthLayout/>}>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='*' element={<Login/>}/>
            </Route>
        </Routes>
    )
}
export default AuthRoute