import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { changeLink } from "../../stores/sidebar"
import { useParams } from "react-router-dom"
import { useAddUserOperationClaimMutation, useDeleteUserOperationClaimMutation, useGetAllOperationClaimQuery, useGetUserByIdQuery } from "../../stores/userAndOperationClaimService"
import { useForm } from "react-hook-form";

function User() {
    const { id } = useParams()
    const { data: userData } = useGetUserByIdQuery(id)
    const [AddUserOperationClaim] = useAddUserOperationClaimMutation()
    const [DeleteUserOperationClaim] = useDeleteUserOperationClaimMutation()
    const { data: operationClaimData } = useGetAllOperationClaimQuery()
    const [claims, setClaims] = useState([])
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();


    useEffect(() => {
        dispatch(changeLink('Users'))

    }, [])

    useEffect(() => {
        const results = operationClaimData?.data.filter(({ id: id1 }) => !userData?.data.roles?.some(({ id: id2 }) => id2 === id1));
        setClaims(claims => results)
    }, [userData])


    const onSubmit = (data) => {
        AddUserOperationClaim({
            userID: userData?.data.id,
            operationClaimID: data.operationClaimID
        })
        reset()
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">AD</th>
                            <th scope="col">SOYAD</th>
                            <th scope="col">KULLANICI ADI</th>
                            <th scope="col">E-POSTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col">{userData?.data.id}</th>
                            <th scope="col">{userData?.data.firstName}</th>
                            <th scope="col">{userData?.data.lastName}</th>
                            <th scope="col">{userData?.data.userName}</th>
                            <th scope="col">{userData?.data.email}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="col-md-4">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ROL</th>
                            <th scope="col">İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td ><select {...register('operationClaimID', { required: true })}>
                                <option value=''>Seçiniz</option>
                                {claims?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select></td>
                            <td><span className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Ekle</span></td>
                        </tr>
                        {userData?.data.roles?.map(r => <tr key={r.id}>
                            <td >{r.name}</td>
                            <td><span className="btn btn-danger" onClick={e => { DeleteUserOperationClaim({ userID: userData?.data.id, operationClaimID: r.id }) }}>Sil</span></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default User