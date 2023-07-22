import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";


const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) =>{
    let [authentication, setAuthentication] = useState(false)
    let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let loginUser = async(e)=>{
        e.preventDefault()
        console.log("form submited")
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
            
        })
        let data = await response.json()
        console.log(data.access)
        console.log(response)
        if (response.status=== 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            setAuthentication(true)
        }else{
            alert("something went wrong!")
        }
        
    }

    let logoutUser = ()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setAuthentication(false)
    }

    let updateToken = async()=>{
        console.log("update token working")
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh':authToken.refresh})
            
        })
        let data = await response.json()
        console.log(data.access)
        console.log(response)
        if (response.status=== 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        authentication: authentication,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=>{
        let fourMin = 1000*60*4
        let interval = setInterval(() => {
            if (authToken){
                updateToken()
            }
        },fourMin);
        return ()=> clearInterval(interval)
    }, [authToken, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}