import plus from '/icon-plus.svg'
import minus from '/icon-minus.svg'
import reply from '/icon-reply.svg'
import { useEffect, useState } from 'react'
import ReplyComment from './replyComment'
import deleteIcon from '/icon-delete.svg'
import editIcon from '/icon-edit.svg'
import { Link } from 'react-router-dom'


function Comment(props){
    const data = props.data
    const [username, setUsername] = useState(props.username)
    const [count, setCount] = useState(data.score);
    const [replyData, setReplyData] = useState(data.replies)
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [numColor, setNumColor] = useState('')
    const [replying, setReplying] = useState(false)
    const [replyName, setReplyName] = useState('')
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(data.content)
    const [parts, setParts] = useState(() => text.split(/((^|\s)@[\w-]+)/g))

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
        setReplying(false)
    }
    
    const handleCancel = () =>{
        setReplying(false)
    }
    //const username = props.type === 'replies' ? `@${data.replyingTo} ` : ""
    const deleteReplies= (id) =>{
        setReplyData(prevData => prevData.filter(comment => comment.id !== id))
    }
    
    const handleEdit = () =>{
        setEdit(true)
    }
    const pattern =/((^|\s)@[\w-]+)/g;
    const handleUpdate = () =>{
        //setText(editReply)
        setEdit(false)
        setParts(() => text.split(pattern))
    }

    return(
    <>
    <article className={`comment ${props.type}`}>
        <div className="details">
            <Link to={`${data.user.username}`}>
            <img src={data.user.image.webp} alt="" className="profile" />
            </Link>
            <Link to={`${data.user.username}`}>
            <h3 className="name">{data.user.username}</h3>
            </Link>
            
            {props.username === data.user.username ?(<div className='you'>you</div>) : ''}
            <p className="time">{data.createdAt}</p>
        </div>
        <p className="content">
            {edit ? 
            (<textarea className='contentInput' value={text} onChange={(e)  => setText(e.currentTarget.value)}></textarea>) 
            : 
            parts.map((part, index)=>{
                if(part.match(pattern)){
                  return (<span key={index} className="highlight">{part}</span>)
                }
                else{
                   return (<span key={index} className='contentPara'>{part}</span>)
                }
            })
            }
        </p>
        <div className="response">
            <div className="like">
                <img src={plus} alt="" className="plus"  onClick={likeHandle} />
                <p className={`num ${numColor}`}>{count}</p>
                <img src={minus} alt="" className="minus" onClick={likeHandle} />
            </div>
            {props.username === data.user.username ? 
                
                !edit ? 
                (<div className='action-container'>
                    <button className="deleteComment" onClick={() => props.delete(data.id)}>
                        <img src={deleteIcon} alt="" />
                        Delete
                    </button>
                    <button className='editComment' onClick={handleEdit}>
                        <img src={editIcon} alt="" />
                        Edit
                    </button>
                </div>) : 
                (<button className='inputBtn' onClick={handleUpdate}>Update</button>)
                : 
                (<div className="reply" onClick={props.type === 'replies' ? (() => props.reply(data.user.username)) : (() => handleReply(data.user.username))}>
                    <img src={reply} alt="" className="replyImg" />
                    <p className="reply-para">Reply</p>
                </div>)}
            
        </div>
    </article>
    <div className=" comments  replies-container">
    {replyData && replyData.map((rpl) =>(
        <Comment data={rpl} key={rpl.id} type={'replies'} reply={handleReply} username={username} delete={deleteReplies}/>
    ))}
    {replying && <ReplyComment name={replyName} data={props.user} addReply={addReplies} type={'replies'} handleCancel={handleCancel}/>}
    </div>

    </>
    )
}
export default Comment