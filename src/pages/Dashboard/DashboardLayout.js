import { useEffect, useState } from "react";
import { Link,Outlet, useNavigate} from "react-router-dom";
import navlinks from "../../items/navlinks";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../stores/auth";
import { changeLink } from "../../stores/sidebar";

function DashboardLayout(){
    //const [navLink,setNavLink]=useState(navlinks[0])
    const navLink=useSelector(state=>state.sidebar.navlink)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{

    },[navLink])

    return(
        < >
            <div className={"row"}>
                 <div className={"col-md-2 text-white"}>
                        <Link to='/' onClick={e=>{dispatch(changeLink(navlinks[0].name))}} className={"text-decoration-none"} style={{textAlign:"center"}}><h1>OSOS</h1></Link>
                        <ul className={"nav nav-pills flex-column mb-auto"}>
                            {navlinks.map((l,index)=>{
                                return <li key={index} className={`nav-link cursor-pointer ${navLink===l.name?"active":""}`} onClick={e=>{dispatch(changeLink(l.name));navigate(l.path)}}>{l.name}</li>
                            })}
                            <li  className={`nav-link cursor-pointer`} onClick={e=>{dispatch(removeUser());navigate('/')}}>Çıkış</li>
                        </ul>
                </div>
                <div className={"col-md-10 px-4"} style={{minHeight:"100vh"}}>
                    <>
                    <div className="row mt-4"></div>
                    {<Outlet/>}
                    </>
                   
                </div>
            </div>
            <div className={"navbar justify-content-center"}>{new Date().getFullYear()} OSOS</div>
        </>
    )
    

}

export default DashboardLayout