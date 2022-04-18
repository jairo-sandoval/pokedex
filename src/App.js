import './App.css';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Pokedex from './components/Pokedex';
import PokemonInfo from './components/PokemonInfo';
import Config from './components/Config';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} /> 

        <Route element={<ProtectedRoutes/>}>
          <Route path="/pokedex" element={<Pokedex />}/>
          <Route path="/pokedex/:id" element={<PokemonInfo />} />
          <Route path="/config" element={<Config />} /> 
        </Route>
      </Routes>

    </HashRouter> 
  );
}

export default App;
