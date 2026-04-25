import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import authServices from "../../services/auth"

export default function Profile() {
    const { logout } = authServices()
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))


    useEffect(() => {
        if(!authData) {
            navigate('/auth')
            return
        }
    }, [authData])

    const handleLogout = () => {
        logout()
        navigate('/')
        return
    }

    return (
        <>
            <h1>{authData?.user?.email}</h1>    
            <h1>{authData?.user?.fullname}</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
     )
}