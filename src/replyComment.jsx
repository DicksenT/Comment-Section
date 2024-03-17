import { useEffect, useState } from "react"

function ReplyComment(props){
    const [content, setContent] = useState('')
    const data =props.data.currentUser
    const [replyTo, setReplyTo] = useState('')
    
    const id = Math.floor(Math.random() * 100000)
    const newReplies = {id: id,
                        content: content,
                        createdAt: 'A moment ago',
                        score: 0,
                        replyingTo: replyTo,
                        user:{
                            image:{
                                webp: data.image.webp
                            },
                            username: data.username
                        }}

    const addReplies = (e) =>{
        e.preventDefault()
        props.addReply(newReplies)
    }
    useEffect(()=>{
        setReplyTo(`${props.name} `)
    },[props.name])
    useEffect(()=>{
        setContent((`@${replyTo}`))
    },[replyTo])
    

    return(
        <form action="" className="myComment comment" onSubmit={addReplies}>
            <textarea type=""  className="contentInput" placeholder="Add a comment..." value={`${content}`} onChange={(e)=> (setContent(e.currentTarget.value))}>
            </textarea>
            <div className="myComment-details">
                <img src="" alt="" className="profile" />
                <button className="inputBtn " type="submit">Send</button>
            </div>
        </form>
    )
}
export default ReplyComment