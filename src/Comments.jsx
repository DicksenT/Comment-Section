import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import Comment from './Comment'
import ReplyComment from './ReplyComment'

function Comments(){
    const {fetchedComment, fetchedUser} = useFetch('data.json')
    const [data, setData] = useState()
    const [user, setUser] = useState()
    useEffect(() =>{
        setData(fetchedComment)
    },[fetchedComment])
    useEffect(() =>{
        if(fetchedUser){
        setUser(fetchedUser.username)
        }
    },[fetchedUser])
    const addComment= (commentData)=>{
        setData(prevData => [...prevData, commentData])
    }

    const deleteComment = (id) =>{
        setData(prevData => prevData.filter((comment) => comment.id !== id))
        console.log(id)
    }
    return(
        <section className="comments">
            {data && data.map((cdt)=>(
                <Comment data={cdt} key={cdt.id} user={fetchedUser} username={user} delete={deleteComment}/>
            ))}
            {fetchedUser && <ReplyComment data={fetchedUser} addReply={addComment} name={''}/>}
        </section>
    )
}
export default Comments