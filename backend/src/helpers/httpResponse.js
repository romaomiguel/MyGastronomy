export const ok = (body) => {
    return {
            sucess: true,
            statuscode: 200,
            body: body
    }
}

export const notFound = () =>{
    return {
            sucess: false,
            statuscode: 400,
            body: 'NOT FOUND'
    }
}
    

export const serverError = (error) => {
        return {
            sucess: false,
            statuscode: 500,
            body: error
    }
}