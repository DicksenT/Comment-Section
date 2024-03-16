import plus from '/icon-plus.svg'
import minus from '/icon-minus.svg'
import reply from '/icon-reply.svg'
import { useEffect, useState } from 'react'
import ReplyComment from './ReplyComment'


function Comment(props){
    const [data,setData] = useState(props.data)
    const [count, setCount] = useState(data.score);
    const [replyData, setReplyData] = useState(data.replies)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [numColor, setNumColor] = useState('')
    const [replying, setReplying] = useState(false)
    const [replyName, setReplyName] = useState('')
    useEffect(() =>{
        
    },[data])
    const likeHandle =(e)=>{
        setCount(data.score)
        if(e.currentTarget.className === 'plus'){
            if(!liked){
                setDisliked(false)
                setCount(prevCount => prevCount + 1)
                setLiked(true)
                setNumColor('plus')          
            }
            else{
                setLiked(false)
                setNumColor('')
            }
        }
        else{
            if(!disliked){
                setLiked(false)
                setCount(prevCount => prevCount - 1)
                setDisliked(true)
                setNumColor('minus')
            }
            else{
                setDisliked(false)
                setNumColor('')
            }
        }
    }
    const handleReply = (name) =>{
        setReplying(true)
        setReplyName(name)
    }
    const addReplies = (newReplies) =>{
        setReplyData(data => [...data, newReplies])
        console.log(replyData)
    }
    
    const username = props.type === 'replies' ? `@${data.user.username} ` : ""
    const text = username + data.content
    const pattern =/(@[\w-]+)/g;
    const parts = text.split(pattern)
    return(
    <>
    <article className={`comment ${props.type}`}>
        <div className="details">
            <img src={data.user.image.webp} alt="" className="profile" />
            <h3 className="name">{data.user.username}</h3>
            <p className="time">{data.createdAt}</p>
        </div>
        <p className="content">
            {parts.map((part, index)=>{
                if(part.match(pattern)){
                  return (<span key={index} className="highlight">@{part}</span>)
                }
                else{
                   return (<span key={index} className='contentPara'>{part}</span>)
                }
            })}
        </p>
        <div className="response">
            <div className="like">
                <img src={plus} alt="" className="plus"  onClick={likeHandle} />
                <p className={`num ${numColor}`}>{count}</p>
                <img src={minus} alt="" className="minus" onClick={likeHandle} />
            </div>
            <div className="reply" onClick={props.type === 'replies' ? (() => props.reply(data.user.username)) : (() => handleReply(data.user.username))}>
                <img src={reply} alt="" className="replyImg" />
                <p className="reply-para">Reply</p>
            </div>
        </div>
    </article>
    <div className=" comments  replies-container">
    {replyData && replyData.map((rpl) =>(
        <Comment data={rpl} key={rpl.id} type={'replies'} reply={handleReply}/>
    ))}
    {replying && <ReplyComment name={replyName} data={data} addReply={addReplies}/>}
    </div>

    </>
    )
}
export default Comment