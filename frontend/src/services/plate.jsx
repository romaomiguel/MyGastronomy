import { useState } from "react"

export default function plateServices() {
    const [platesLoading, setPlateLoading] = useState(false);
    const [refetchPlates, setRefetchOrdes] = useState(true);
    const [platesList, setPlatesList] = useState([])

    const url = 'http://localhost:3000/plates';

    const getAvailablePlates = (userid) => {
        setPlateLoading(true);

        fetch(`${url}/available`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.sucess) {
                setPlatesList(result.body)
            }else {
                console.log(result)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setPlateLoading(false)
            setRefetchOrdes(false)
        })
    }

    return { getAvailablePlates , platesLoading, refetchPlates, platesList}

}