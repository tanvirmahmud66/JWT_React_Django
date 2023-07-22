import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let navigate = useNavigate()
    const {user, logoutUser, authentication} = useContext(AuthContext);
    useEffect(()=>{
        navigate('/')
    },[authentication])
  return (
    <div>
        <Link to="/">Home</Link>
        {user?(
            <>
                <p>Hello {user.username}</p>
                <button onClick={logoutUser}>Logout</button>
            </>
        ):(
            <>
                <span> | </span>
                <Link to="/login">Login</Link>
            </>
        )}
    </div>
  )
}

export default Header