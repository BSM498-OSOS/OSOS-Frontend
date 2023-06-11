import { useNavigate, useParams } from "react-router-dom";
import SimpleGraph from "../../components/SimpleGraph"
import { useGetReadingsBySerialNoQuery, useGetTotalConsumptionsDailyBySerialNoQuery, useGetTotalConsumptionsMonthlyBySerialNoQuery, useGetTotalConsumptionsYearlyBySerialNoQuery } from "../../stores/readingService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeLink } from "../../stores/sidebar";
import { useGetCustomerByIdQuery, useGetCustomerByMeterSerialNoQuery } from "../../stores/customerService";

function Meter(){
    const {serialNo}=useParams()
    const navigate=useNavigate()
    const {data:graphData}=useGetTotalConsumptionsDailyBySerialNoQuery(serialNo)
    const {data:graphDataAylik}=useGetTotalConsumptionsMonthlyBySerialNoQuery(serialNo)
    const {data:graphDataYillik}=useGetTotalConsumptionsYearlyBySerialNoQuery(serialNo)
    const {data:readingData}=useGetReadingsBySerialNoQuery(serialNo)
    const {data:customerData}=useGetCustomerByMeterSerialNoQuery(serialNo)
    const dispatch=useDispatch()


    useEffect(()=>{
        dispatch(changeLink('Meters'))
    },[])

    const createReadingTable = (readingData) => {
        return <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Serial No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Okuma (W)</th>
                </tr>
            </thead>
            <tbody>{readingData?.data.slice((readingData?.data.length-100)>=0?(readingData?.data.length-100):0, readingData?.data.length).map((r, i) =>
                <tr className="cursor-pointer" key={i}>
                    <th scope="row" >{i + 1}</th>
                    <td>{r.obis000}</td>
                    <td>{r.obis092}</td>
                    <td>{r.obis180.toFixed(2)}W</td>
                </tr>)}
            </tbody>
        </table>
    }

    return (
        <>
        {
            customerData&&
            <div className="row">
            <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">ABONE</th>
                    <th scope="col">ADRES</th>
                    <th scope="col">TARİH</th>
                    <th scope="col">KURULMA NEDENİ</th>
                </tr>
            </thead>
            <tbody>
                <tr className="cursor-pointer" >
                    <th scope="row" ><span className="btn btn-info" onClick={e=>{navigate(`/customer/${customerData?.data.id}`)}}>Detay</span></th>
                    <th scope="col">{customerData?.data.adress}</th>
                    <th scope="col">{customerData&& new Date(Date.parse(customerData?.data.date)).toISOString().split('T')[0]}</th>
                    <th scope="col">{customerData?.data.installReason}</th>
                </tr>
            </tbody>
        </table>
            </div> }
            <div className="row">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                        <h3>Günlük Toplam Tüketim</h3>
                    </div>
                    <div className="card-img-top">
                        <SimpleGraph syncId='Gunluk' tip='Area' Data={graphData?.data.map(r => { return { date: new Date(Date.parse(r.date)).toISOString().split('T')[0], Consumption: r.totalConsumption } })} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                        <h3>Günlük Toplam Tüketim</h3>
                    </div>
                    <div className="card-img-top">
                        <SimpleGraph syncId='Gunluk' tip='Composed' Data={graphData?.data.map(r => { return { date: new Date(Date.parse(r.date)).toISOString().split('T')[0], Consumption: r.totalConsumption } })} />
                    </div>
                </div>
            </div>
            </div>
            <div className="row mt-3">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                        <h3>Aylık Toplam Tüketim</h3>
                    </div>
                    <div className="card-img-top">
                        <SimpleGraph syncId='Aylik' tip='Area' Data={graphDataAylik?.data.map(r => { return { date: new Date(Date.parse(r.date)).toISOString().split('T')[0], Consumption: r.totalConsumption } })} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                        <h3>Aylık Toplam Tüketim</h3>
                    </div>
                    <div className="card-img-top">
                        <SimpleGraph syncId='Aylik' tip='Composed' Data={graphDataAylik?.data.map(r => { return { date: new Date(Date.parse(r.date)).toISOString().split('T')[0], Consumption: r.totalConsumption } })} />
                    </div>
                </div>
            </div>
            </div>
            <div className="row mt-3 mb-3">
            <div className="col-md-6">
                <div className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                        <h3>Yıllık Toplam Tüketim</h3>
                    </div>
                    <div className="card-img-top">
                        <SimpleGraph syncId='Yillik' tip='Area' Data={graphDataYillik?.data.map(r => { return { date: new Date(Date.parse(r.date)).toISOString().split('T')[0], Consumption: r.totalConsumption } })} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                <div className="card-body" style={{textAlign:'center'}}>
                        <h3>Yıllık Toplam Tüketim</h3>
                    </div>
                    <div className="card-img-top">
                        <SimpleGraph syncId='Yillik' tip='Composed' Data={graphDataYillik?.data.map(r => { return { date: new Date(Date.parse(r.date)).toISOString().split('T')[0], Consumption: r.totalConsumption } })} />
                    </div>
                </div>
            </div>
            </div>
            <div className="col-md-12" style={{height:"600px",maxHeight:"600px",overflowY: "scroll"}}>
            {createReadingTable(readingData)}
            </div>
        </>
    )
}
export default Meter