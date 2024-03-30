import { useEffect, useState } from "react"

function ReplyComment(props){
    const [content, setContent] = useState('')
    const data = props.data
    const [replyTo, setReplyTo] = useState('')
    const [empty, setEmpty] = useState(false)
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
                        
                        },
                        replies:[]
                    }

    const addReplies = (e) =>{
        e.preventDefault()
        if(content === ''){
            setEmpty(true)
            return
        }
        console.log('upload')
        props.addReply(newReplies)
        setContent('')
    }
    useEffect(()=>{
        setReplyTo(`${props.name} `)
    },[props.name])
    useEffect(()=>{
        {props.type === 'replies' ? setContent((`@${replyTo}`)) : ''}
    },[replyTo])
    
    

    return(
        <>
        {props.type === 'replies' ? (<span className="replyTo">Replying to @{replyTo}</span>) : ''}        
        <form action="" className={`myComment comment ${props.type} ${props.type === 'replies' ? 'replyComment' : ''}`} 
                        onSubmit={addReplies}>
            <textarea type=""  className="contentInput" placeholder="Add a comment..." 
                                value={`${content}`} 
                                onChange={(e)=> (setContent(e.currentTarget.value))}
                                onClick={() => setEmpty(false)}
                                style={{borderColor: empty ?  'hsl(358, 79%, 66%)' : 'hsl(228, 33%, 97%)'}}>
            </textarea>
            {empty && <p className="emptyWarning">Message cannot be empty</p>}
            <div className="myComment-details">
                <img src={data.image.webp} alt="" className="profile" />
                <div className="btnStyle">
                 {props.type && (<button className="cancelBtn" onClick={props.handleCancel}>Cancel</button>)}   
                <button className="inputBtn " type="submit">Send</button>
                </div>
            </div>
        </form>
        </>

    )
}
export default ReplyComment