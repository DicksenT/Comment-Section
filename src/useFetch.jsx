import { useEffect, useState } from "react"
import axios from 'axios'

function useFetch(url){
    const [fetchedData, setFetchedData] = useState();
    useEffect(() =>{
        const getData = async () =>{
            try{
                const response = await axios.get(url)
                setFetchedData(response.data)
            }
            catch(error){
                console.error(error)
            }
        }
        getData()
    },[url])
    return fetchedData
}
export default useFetch