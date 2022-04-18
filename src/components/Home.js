import { Link } from "react-router-dom";

const Home = () => {
    return (
        <header className="header">
            <h1>Welcome to Pokedex</h1>
            <h2></h2> 
            <Link to="/login">
                <button>Login</button>
            </Link>
        </header>   
    );
};

export default Home;