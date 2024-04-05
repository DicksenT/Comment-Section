import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import Comment from './Comment'
import ReplyComment from './replyComment'

function Comments(props){
    const {data, user, addComment, deleteComment} = props

    return(
        <section className="comments">
            {data.map((cdt)=>(
                <Comment data={cdt} key={cdt.id} user={user} username={user.username} delete={deleteComment}/>
            ))}
            {<ReplyComment data={user} addReply={addComment} name={''}/>}
        </section>
    )
}
export default Comments