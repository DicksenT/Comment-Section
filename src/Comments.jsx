import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import Comment from './Comment'

function Comments(){
    const fetchedData = useFetch('data.json')
    useEffect(()=>{console.log(fetchedData)},[fetchedData])
    return(
        <section className="comments">
            {fetchedData && fetchedData.comments.map((cdt)=>(
                <Comment data={cdt} key={cdt.id}/>
            ))}
        </section>
    )
}
export default Comments