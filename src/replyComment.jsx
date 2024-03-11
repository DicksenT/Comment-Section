function ReplyComment(props){
    const data = props.data
    return(
        <form action="" className="myComment comment">
            <textarea type="" className="contentInput" placeholder="Add a comment...">
                {`@${props.name}`}
            </textarea>
            <div className="myComment-details">
                <img src="" alt="" className="profile" />
                <button className="inputBtn ">Send</button>
            </div>
        </form>
    )
}
export default ReplyComment