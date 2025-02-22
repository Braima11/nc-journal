import { Link } from 'react-router-dom'
import { getUsers } from "../files/apis";
import { useState,useEffect } from "react";

export default function Users () {
    const [loading,setLoading] =useState(true)
    const [users,setUsers] = useState([])

    useEffect(()=>{
        getUsers()
        .then(({users})=>{
            setUsers(users)
            setLoading(false)
        })
    },[])

    const mappedUsers= users.map((user)=>{
        return <section key={user.username} className="user">
            <h1 className="user-name">Name: {user.name}</h1>
            <p className="user-username">Username: {user.username}</p>
            <img src={user.avatar_url} className="user-avatar"/>
            <Link to={`/articles?author=${user.username}`} className="topic-btn">
                Read all {user.username}'s articles
            </Link>
        </section>
    })

    return (

        <>
        {mappedUsers}
        </>
    )
}