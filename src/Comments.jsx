import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import Comment from './Comment'
import ReplyComment from './ReplyComment'

function Comments(props){
    const {data, user, addComment} = props


    return(
        <section className="comments">
            {data.map((cdt)=>(
                <Comment data={cdt} key={cdt.id} user={user} username={user.username} delete={props.deleteComment}/>
            ))}
            {<ReplyComment data={user} addReply={props.addComment} name={''}/>}
        </section>
    )
}
export default Comments