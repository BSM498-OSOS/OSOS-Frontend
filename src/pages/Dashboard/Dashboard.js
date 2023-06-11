import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetAllMeterQuery } from "../../stores/meterService"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useGetAllReadingsQuery, useGetAllTotalConsumptionsDailyQuery, useGetAllTotalConsumptionsMonthlyQuery, useGetAllTotalConsumptionsYearlyQuery, useLazyGetReadingsBySerialNoQuery } from "../../stores/readingService"
import { useGetAllUserQuery } from "../../stores/userAndOperationClaimService"
import SimpleGraph from "../../components/SimpleGraph"
import { changeLink } from "../../stores/sidebar"


function Dashboard() {

    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)
    const readingData = useGetAllReadingsQuery(undefined, { skip: !user.role?.includes('Admin') }).data
    const { data: graphData } = useGetAllTotalConsumptionsDailyQuery(undefined, { skip: !user.role?.includes('Admin') })
    const { data: graphDataAylik } = useGetAllTotalConsumptionsMonthlyQuery(undefined, { skip: !user.role?.includes('Admin') })
    const { data: graphDataYillik } = useGetAllTotalConsumptionsYearlyQuery(undefined, { skip: !user.role?.includes('Admin') })
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(changeLink('Dashboard'))
        if (!user.role?.includes('Admin')) {
            navigate('/notenoughclearance', { replace: true })
        }

    }, [])
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
            <tbody>{readingData?.data.slice((readingData?.data.length-50)>=0?(readingData?.data.length-50):0, readingData?.data.length).map((r, i) =>
                <tr className="cursor-pointer" key={i} onClick={e => { navigate(`/meter/${r.obis000}`)}}>
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

    {/*createTable()*/ }
    {/*createReadingTable(readingData)*/ }
    {/*createReadingTable(results.data)*/ }
    /*{createGraph(graphData?.data.map(r=>{return {date:new Date(Date.parse(r.date)).toISOString().split('T')[0],Consumption:r.totalConsumption}}))}
    {createSimpleComposite(graphData?.data.map(r=>{return {date:new Date(Date.parse(r.date)).toISOString().split('T')[0],Consumption:r.totalConsumption}}))}*/
}
export default Dashboard 