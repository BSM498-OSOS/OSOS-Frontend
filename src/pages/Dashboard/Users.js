import { useSelector,useDispatch } from "react-redux"
import { useGetAllOperationClaimQuery, useGetAllUserQuery } from "../../stores/userAndOperationClaimService"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { changeLink } from "../../stores/sidebar"

function Users(){
    const user=useSelector(state=>state.auth.user)
    const {data:userData}=useGetAllUserQuery()
    const dispatch=useDispatch()
    /*<Link to={`/user/${u.id}`} className="btn btn-primary">Edit</Link>
    <span>  </span>
    <button to={`/user/${u.id}`} className="btn btn-danger">Delete</button>*/


    useEffect(()=>{
        dispatch(changeLink('Users'))
    },[])

    const userCard=(u)=>{
        return <div className="col-md-3" key={u.id}>
            <div className="card">
        <div className="card-body">
          <h5 className="card-title">{u.userName}</h5>
            <h6>Name: {u.firstName+' '+u.lastName}</h6>
            <h6>Email: {u.email}</h6>
            <h6>Roles: [{u.roles.map(r=>r.name+",")} ]</h6>
            <Link to={`/user/${u.id}`} className="btn btn-primary">Detay</Link>
          </div>
      </div>
        </div>
    }

    return(
        <div className="row">
                {userData?.data.map(u=>{
                    if(u.id!==user.id)
                    return userCard(u)
                })}
        </div>
    )
}
export default Users