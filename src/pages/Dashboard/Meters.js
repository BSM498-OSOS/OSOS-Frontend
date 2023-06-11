import { useNavigate } from "react-router-dom"
import { useAddMeterMutation, useDeleteMeterMutation, useGetAllMeterBrandQuery, useGetAllMeterFullInfoQuery, useGetAllMeterModelQuery, useGetAllMeterReadingTimeQuery } from "../../stores/meterService"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeLink } from "../../stores/sidebar";

function Meters(){
    const {data:meterData}=useGetAllMeterFullInfoQuery()
    const [addMeter]=useAddMeterMutation()
    const [deleteMeter]=useDeleteMeterMutation()
    const {data:meterBrandData}=useGetAllMeterBrandQuery()
    const {data:meterModelData}=useGetAllMeterModelQuery()
    const {data:meterReadingTimeData}=useGetAllMeterReadingTimeQuery()
    const [brand,SetBrand]=useState()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();


    useEffect(()=>{
        dispatch(changeLink('Meters'))
    },[])

    useEffect(()=>{
        meterBrandData&&SetBrand(meterBrandData.data[0].id)
    },[meterBrandData])

    const onSubmit=(data)=>{
        addMeter({ 
        modelId: data.modelId,
        readingTimeId: data.readingTimeId,
        serialNo: data.serialNo})
        SetBrand('')
        reset({
            modelId:'',
            serialNo:1,
            readingTimeId:''
        })
    }

    const createMeterTable = () => {
        return <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Serial No</th>
                    <th scope="col">ID</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Reading Time</th>
                    <th scope="col">İşlem</th>
                </tr>
            </thead>
            <tbody>
                <tr className="cursor-pointer">
                <th scope="row"></th>
                    <td><input {...register("serialNo",{required:true})} name="serialNo" id="serialNo" type="number" min="1"/></td>
                    <td><input type="text" disabled min="1"/></td>
                    <td>
                        <select onChange={e => SetBrand(e.target.value)} value={brand}>
                            <option value="" >Seçiniz</option>
                            {meterBrandData?.data.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}
                        </select>
                    </td>
                    <td>
                    <select {...register("modelId",{required:true})} name="modelId" id="modelId">
                            <option value="" >Seçiniz</option>
                            {meterModelData?.data.filter(b=>b.brandId===brand).map(b=><option value={b.id} key={b.id}>{b.name}</option>)}
                        </select>
                    </td>
                    <td>
                    <select {...register("readingTimeId",{required:true})} name="readingTimeId" id="readingTimeId">
                            <option value="" >Seçiniz</option>
                            {meterReadingTimeData?.data.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}
                        </select>
                    </td>
                    <td><span className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Ekle</span></td>
                </tr>       
                {meterData?.data.map((m, i) =>
                <tr className="cursor-pointer" key={i} >
                    <th scope="row" ><span className="btn btn-info" onClick={e=>{navigate(`/meter/${m.serialNo}`)}}>Detay</span></th>
                    <td>{m.serialNo}</td>
                    <td>{m.id}</td>
                    <td>{m.brandName}</td>
                    <td>{m.modelName}</td>
                    <td>{m.readingTimeName}</td>
                    <td><span className="btn btn-danger" onClick={e=>{deleteMeter({id:m.id,modelId:m.modelId,readingTimeId:m.readingTimeId,serialNo:m.serialNo})}}>Sil</span></td>
                </tr>)}
            </tbody>
        </table>
    }

    return(
        <>
        {createMeterTable()}
        </>
    )
}
export default Meters