import './styles/App.css';
import {
  HashRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Login, ProtectedRoutes, Pokedex, PokemonInfo, Config } from './components/index' 

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
        
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
