import plus from '/icon-plus.svg'
import minus from '/icon-minus.svg'
import reply from '/icon-reply.svg'
import { useState } from 'react'

function Comment(props){
    const data = props.data
    const [count, setCount] = useState(data.score);
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const [numColor, setNumColor] = useState('')
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

    return(
    <>
    <article className={`comment ${props.type === 'replies' ? 'replies' : ''}`}>
        <div className="details">
            <img src={data.user.image.webp} alt="" className="profile" />
            <h3 className="name">{data.user.username}</h3>
            <p className="time">{data.createdAt}</p>
        </div>
        <p className="content">
            {data.content}
        </p>
        <div className="response">
            <div className="like">
                <img src={plus} alt="" className="plus"  onClick={likeHandle} />
                <p className={`num ${numColor}`}>{count}</p>
                <img src={minus} alt="" className="minus" onClick={likeHandle} />
            </div>
            <div className="reply">
                <img src={reply} alt="" className="replyImg" />
                <p className="reply-para">Reply</p>
            </div>
        </div>
    </article>
    <div className=" comments  replies-container">
    {data.replies && data.replies.map((rpl) =>(
        <Comment data={rpl} key={rpl.id} type={'replies'}/>
    ))}
    </div>
    </>
    )
}
export default Comment