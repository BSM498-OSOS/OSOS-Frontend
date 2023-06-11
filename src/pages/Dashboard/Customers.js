import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeLink } from "../../stores/sidebar"
import { useAddCustomerMutation, useDeleteCustomerMutation, useGetAllCustomerQuery } from "../../stores/customerService"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useGetAllMeterQuery } from "../../stores/meterService"

function Customers(){
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const [meters,setMeters]=useState([])
    const {data:customerData}=useGetAllCustomerQuery()
    const [AddCustomer]=useAddCustomerMutation()
    const [DeleteCustomer]=useDeleteCustomerMutation()
    const {data:meterData}=useGetAllMeterQuery()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();


    useEffect(() => {
        dispatch(changeLink('Customers'))
    }, [])

    useEffect(()=>{
        const results=meterData?.data.filter(({serialNo:mS})=> !customerData?.data.some(({meterId:cS})=>mS===cS))
        setMeters(meters=>results)
    },[meterData,customerData])


    const onSubmit=(data)=>{
        const date=new Date(Date.parse(data.date)).toISOString()
        AddCustomer({
            adress: data.adress,
            meterId: data.meterId,
            installReason: data.installReason,
            date: date,
        })
        reset({
            adress:'',
            meterId:'',
            installReason:'',
            date:''
        })
    }

    const customerDeletion=(customer)=>{
        DeleteCustomer({
            id: customer.id,
            adress: customer.adress,
            meterId: customer.meterId,
            installReason: customer.installReason,
            date: customer.date,
            status:customer.status
        })
    }

    const createCustomersTable = () => {
        return <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Meter</th>
                    <th scope="col">Adres</th>
                    <th scope="col">Kuruluş Nedeni</th>
                    <th scope="col">Tarih</th>
                    <th scope="col">İşlem</th>
                </tr>
            </thead>
            <tbody>
                <tr className="cursor-pointer">
                <th scope="row"></th>
                    <td>
                    <select {...register("meterId",{required:true})} name="meterId" id="meterId">
                            <option value="" >Seçiniz</option>
                            {meters?.map(b=><option value={b.serialNo} key={b.serialNo}>{b.serialNo}</option>)}
                        </select>
                    </td>
                    <td><input {...register("adress",{required:true})} type="text"/></td>
                    <td><input {...register('installReason',{required:true})} type="text"/></td>
                    
                    <td><input {...register('date',{required:true})} type="date"/></td>
                    <td><span className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Ekle</span></td>
                </tr>       
                {customerData?.data.map((m, i) =>
                <tr className="cursor-pointer" key={i} >
                    <th scope="row" ><span className="btn btn-info" onClick={e=>{navigate(`/customer/${m.id}`)}}>Detay</span></th>
                    <td>{m.meterId}</td>
                    <td>{m.adress}</td>
                    <td>{m.installReason}</td>
                    <td>{new Date(Date.parse(m.date)).toISOString().split('T')[0]}</td>
                    <td><span className="btn btn-danger" onClick={e=>{customerDeletion(m)}}>Sil</span></td>
                </tr>)}
            </tbody>
        </table>
    }


    return(
        <>
        {createCustomersTable()}
        </>
    )
}
export default Customers