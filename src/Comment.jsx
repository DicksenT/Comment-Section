import plus from '/icon-plus.svg'
import minus from '/icon-minus.svg'
import reply from '/icon-reply.svg'
import { useState } from 'react'

function Comment(props){
    const data = props.data
    console.log(data.replies)
    const [count, setCount] = useState(data.score);
    return(
    <>
    <article className="comment">
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
                <img src={plus} alt="" className="plus" />
                <p className="num">{count}</p>
                <img src={minus} alt="" className="minus" />
            </div>
            <div className="reply">
                <img src={reply} alt="" className="replyImg" />
                <p className="reply-para">Reply</p>
            </div>
        </div>
    </article>
    {data.replies && data.replies.map((rpl) =>(
        <Comment data={rpl} key={rpl.id}/>
    ))}
    </>
    )
}
export default Comment