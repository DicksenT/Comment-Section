import { useEffect, useState } from "react"
import axios from 'axios'

function useFetch(url){
    const [fetchedUser, setFetchedUser] = useState();
    const [fetchedComment, setFetchedComment] = useState()
    useEffect(() =>{
        const getData = async () =>{
            try{
                const response = await axios.get(url)
                setFetchedUser(response.data.currentUser)
                setFetchedComment(response.data.comments)
                
            }
            catch(error){
                console.error(error)
            }
        }
        getData()
    },[url])
    return {fetchedComment, fetchedUser}
}
export default useFetch