import { useEffect, useState } from "react"
import useFetch from "./useFetch"
import { useParams } from "react-router-dom"
import Comment from "./Comment"

function UserPost(props){
    const {name} = useParams()
    const [data, setData] = useState()
    const [replyData, setReplyData] = useState()
    
    useEffect(() =>{
        setData(props.data.filter(comment => comment.user.username === name))
        setReplyData(props.data.flatMap(comment => comment.replies.filter(replies => replies.user.username === name)))
    },[props.data, name])
    
    

    return (
        <>
        <h2 className="userPostHeader">All Comment's from {name}</h2>
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