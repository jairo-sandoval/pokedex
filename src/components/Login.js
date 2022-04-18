import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [ userName, setUserName ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit_userName = (event) => {
        event.preventDefault()
        dispatch({
            type: "GET_USERNAME",
            payload: userName
        })
        setUserName("")
        navigate("/pokedex")
    }   

    return (
        <div className="Login">
            <form onSubmit={submit_userName}>
                <input 
                    type="text"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                />
                <button>submit</button>
            </form>
        </div>
    );
};

export default Login;