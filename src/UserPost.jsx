import { useEffect, useState } from "react"
import useFetch from "./useFetch"
import { useParams } from "react-router-dom"
import Comment from "./Comment"

function UserPost(props){
    const {name} = useParams()
    const [orData, setOrData] = useState(props.data)
    const [data, setData] = useState()
    const [replyData, setReplyData] = useState()
    
    useEffect(() =>{
        setData(orData.filter(comment => comment.user.username === name))
        setReplyData(orData.flatMap(comment => comment.replies.filter(replies => replies.user.username === name)))
    },[props.data, name])
    
    

    return (
        <>
        {data && data.map((dt) =>(
            <Comment data={dt} key={dt.id}/>
        ))}
        {replyData && replyData.map((rdt)=>(
            <Comment data={rdt} key={rdt.id}/>
        ))}
        </>
    )
}

export default UserPost