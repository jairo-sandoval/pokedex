import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import  getPokemons  from '../services/getPokemons' 
import getTypes from '../services/getTypes'
import InputTypePokemon from './InputTypePokemon';
import PokemonCard from './PokemonCard';

const Pokedex = () => {
    const userName = useSelector(state => state.userName)
    const configNumber = useSelector(state => state.configNumber)
 
    const [ pokemons, setPokemons ] = useState([])
    const [ numberPages, setNumberPages ] = useState([])
    const [ width, setWidth ] = useState(0)
    const [ numbersPokemons, setNumbersPokemons] = useState(0)
    const [ typeInput, setTypeInput ] = useState(true)
   

    useEffect(() => {
        getPokemons(numbersPokemons * configNumber, configNumber)
        .then(res => {
            setPokemons(res.results)
            const numberPagesCalc = (res.count / configNumber) 
            
            const numberConditional = Number.isInteger(numberPagesCalc) 
                ? [...Array(parseInt(numberPagesCalc)).keys()]
                : [...Array(parseInt(numberPagesCalc + 1)).keys()]
            setNumberPages(numberConditional)
        })
    }, [configNumber])

    const ul = document.getElementsByTagName('ul')[0]
    const div_ul = document.querySelector('.buttons_style')
    const container = ul?.offsetWidth - div_ul?.offsetWidth  

    const next = () => {
        const translateXRigth = Number.isInteger(width) ?  width - 320 : width + 200
        ul.style.transform = `translateX(${translateXRigth}px)`
        
        setWidth(translateXRigth)
    }
 
    const previus = () => {
        const translateXleft = Number.isInteger(width) ?  width + 320 : width - 200
        ul.style.transform = `translateX(${translateXleft}px)`
        
        setWidth(translateXleft)
    }

    const numberNegative = (num) => {
        return num > 0
            ? -num 
            : num
    }


    const changeTypeInput = () => {
        if(typeInput){
            return <input type="text" /> 
        } 
        else {
            return <InputTypePokemon setPokemons={setPokemons} pokemons={pokemons}/>
        }
    } 

    return (
        <div>
            <div className="welcome">
                <h1>Pokedex</h1>
                <p>Welcome <b>{userName}</b> here you can find your favorite pokemon</p> 


                <input type="checkbox" onChange={() => setTypeInput(!typeInput)}/>

                {
                    changeTypeInput()
                }
            </div>
            <div className="pokemons_list">
                
                {
                    pokemons?.map( pokemon => (
                        <Link 
                            key={pokemon.name} 
                            to={`/pokedex/${pokemon.name}`}>
                                <PokemonCard pokemon={pokemon}/> 
                        </Link>
                        
                    ))
                }
            </div>
            
            <Link to="/config">
                <div className='config'>
                    <i className="fa-solid fa-gear"></i>
                </div>
            </Link>
            

            <div className="container_pagination">
                {
                    width < 0 
                        && <button onClick={previus}><i className="fa-solid fa-chevron-left"></i></button>
                }
                <div className="buttons_style">
                    <ul>
                        {
                           numberPages?.map( numValue => (
                                <li 
                                    key={numValue}
                                    onClick={() => setNumbersPokemons(numValue)}
                                    >{ numValue + 1}
                                </li>
                           )) 
                        }
                    </ul>
                </div>
  
                { 
                    container 
                        &&
                            width > numberNegative(container)
                                && <button onClick={next}><i className="fa-solid fa-chevron-right"></i></button>
                }
            </div>
        </div>
    );
};

export default Pokedex;