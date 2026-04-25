import { useState } from "react"

export default function orderServices() {
    const [orderLoading, setOrderLoading] = useState(false);
    const [refetchOrders, setRefetchOrdes] = useState(true);
    const [ordersList, setOrdersList] = useState([])

    const url = 'http://localhost:3000/orders/';

    const getUserOrders = (userid) => {
        setOrderLoading(true);

        fetch(`${url}userordes/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.sucess) {
                setOrdersList(result.body)
            }else {
                console.log(result)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setOrderLoading(false)
            setRefetchOrdes(false)
        })
    }

    return { getUserOrders , orderLoading, refetchOrders, ordersList}

}