import { useEffect, useState } from "react"

function ReplyComment(props){
    const [name, setName] = useState(props.name)
    const data = props.data
    useEffect(()=>{
        setName(`@${props.name} `)
        //console.log(name)
    },[props.name])
    return(
        <form action="" className="myComment comment">
            <textarea type="" className="contentInput" placeholder="Add a comment..." value={name}onChange={(e)=> (setName(e.currentTarget.value))}>
            </textarea>
            <div className="myComment-details">
                <img src="" alt="" className="profile" />
                <button className="inputBtn ">Send</button>
            </div>
        </form>
    )
}
export default ReplyComment