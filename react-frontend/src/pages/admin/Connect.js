import ConnectPatientWithLogo from "../../components/admin/ConnectPatientWithLogo";


import {useLocation} from 'react-router-dom'
export default function Connect (){
    const {state} = useLocation();

    console.log(state)

    return (
        <ConnectPatientWithLogo logopedies ={state?.logopedies} />

    )
}