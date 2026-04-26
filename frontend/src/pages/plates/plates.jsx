import { useEffect } from "react"
import plateServices from "../../services/plate"
import Loading from "../loading/loading"

export default function Plates() {
    
    const { getAvailablePlates, platesLoading, refetchPlates, platesList } = plateServices()
    useEffect(() => {
        if(refetchPlates) {
                getAvailablePlates()
            }
        }, [refetchPlates])
    
    
        if(platesLoading) {
            return( <Loading />)
        }

        console.log(platesList)

    return (
        <h1>Plates</h1>
    )
}