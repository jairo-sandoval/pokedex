import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [ userName, setUserName ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit_userName = (event) => {
        event.preventDefault()

        if(!userName) return 
        
        dispatch({
            type: "GET_USERNAME",
            payload: userName
        })
        setUserName("")
        navigate("/pokedex")
    }   

    return (
        <div className="login">
            <div className='login-image'>
                <img 
                    src="https://www.pngmart.com/files/2/Pokemon-Ash-PNG-HD.png"
                />

            </div>
            <form onSubmit={submit_userName}>
                <input 
                    type="text"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                    placeholder="Escribe tu nombre"
                />
                <button className='submit'>
                    <img src="https://icons.veryicon.com/png/o/business/middle-stage-background-icon/submission-3.png"/>
                </button>
            </form>
        </div>
    );
};

export default Login;