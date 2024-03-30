import Comments from "./Comments"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserPost from "./UserPost"
import useFetch from "./useFetch"
import { useEffect, useState } from "react"

function App() {
  const {fetchedComment, fetchedUser} = useFetch('data.json')
  const [data, setData] = useState()
  const [user, setUser] = useState()
  useEffect(() =>{
    setData(fetchedComment)
    setUser(fetchedUser)
  },[fetchedComment])

  const addComment= (commentData)=>{
    
    setData(prevData => [...prevData, commentData])
    console.log(data);
}
  const deleteComment =(id) =>{
    setData(prevData => prevData.filter(comment => comment.id !== id))
  }
  return(
  <Router>
    <div className="App">
      <Routes>
        {data && user && <Route path="" element={ <Comments data={data} user={user} addComment={addComment} deleteComment={deleteComment}/>}/>}
        {data && <Route path='/:name' element={<UserPost data={data}/>}/>}
      </Routes>
    </div>
  </Router>
  )
}

export default App
