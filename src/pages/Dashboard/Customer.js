import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { changeLink } from "../../stores/sidebar"
import { useDeleteCustomerMutation, useGetCustomerByIdQuery } from "../../stores/customerService"

function Customer(){
    const {id}=useParams()
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const {data:customerData}=useGetCustomerByIdQuery(id)
    const [DeleteCustomer,{ error }]=useDeleteCustomerMutation()
    useEffect(() => {
        dispatch(changeLink('Customers'))
    }, [])


    const customerDeletion=() =>{
        if(customerData){
            DeleteCustomer({
                id: customerData?.data.id,
                adress: customerData?.data.adress,
                meterId: customerData?.data.meterId,
                installReason: customerData?.data.installReason,
                date: customerData?.data.date,
                status:customerData?.data.status
            })
            navigate('/customers',{replace:true})
        }
        
    }

    return(
        <div className="row">
            <div className="col-md-12">
                <table className="table table-dark">
                    <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Meter</th>
                    <th scope="col">Adres</th>
                    <th scope="col">Kuruluş Nedeni</th>
                    <th scope="col">Tarih</th>
                </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row" ><span className="btn btn-info" onClick={e=>{navigate(`/meter/${customerData?.data.meterId}`)}}>Sayac Detay</span></th>
                        <td>{customerData?.data.meterId}</td>
                        <td>{customerData?.data.adress}</td>
                        <td>{customerData?.data.installReason}</td>
                        
                        <td><span className="btn btn-danger" onClick={e=>{customerDeletion()}}>Sil</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}
export default Customer