import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import getPokemons from '../services/getPokemons'
import InputTypePokemon from './InputTypePokemon';
import PokemonCard from './PokemonCard';
import pokeball from '../img/pokeball.png'

const Pokedex = () => {
    const userName = useSelector(state => state.userName)
    const configNumber = useSelector(state => state.configNumber)
    const navigate = useNavigate()

    const [filter, setFilter] = useState(false)
    const [pokemons, setPokemons] = useState([])
    const [numberPages, setNumberPages] = useState([])
    const [width, setWidth] = useState(0)
    const [numbersPokemons, setNumbersPokemons] = useState(0)
    const [typeInput, setTypeInput] = useState(true)
    const [inputPokemon, setInputPokemon] = useState("")

    useEffect(() => {
        if (!filter) {
            getPokemons(numbersPokemons * configNumber, configNumber)
                .then(res => {
                    setPokemons(res.results)
                    const numberPagesCalc = (res.count / configNumber)

                    const numberConditional = Number.isInteger(numberPagesCalc)
                        ? [...Array(parseInt(numberPagesCalc)).keys()]
                        : [...Array(parseInt(numberPagesCalc + 1)).keys()]
                    setNumberPages(numberConditional)
                })
        } 
    }, [configNumber, numbersPokemons, filter])

    const ul = document.getElementsByTagName('ul')[0]
    const div_ul = document.querySelector('.buttons_style')
    const container = ul?.offsetWidth - div_ul?.offsetWidth

    const next = () => {
        const translateXRigth = Number.isInteger(width) ? width - 320 : width + 200
        ul.style.transform = `translateX(${translateXRigth}px)`

        setWidth(translateXRigth)
    }

    const previus = () => {
        const translateXleft = Number.isInteger(width) ? width + 320 : width - 200
        ul.style.transform = `translateX(${translateXleft}px)`

        setWidth(translateXleft)
    }

    const numberNegative = (num) => {
        return num > 0
            ? -num
            : num
    }

    const searchPokemonInfo = (e) => {
        e.preventDefault()
        if(!inputPokemon) return

        navigate(`/pokedex/${inputPokemon}`)
        setInputPokemon(false)
    }

    const changeTypeInput = () => {
        if (typeInput) {
            return (
                <form className="input_search_pokemon" onSubmit={searchPokemonInfo}>
                    <input
                        type="text"
                        placeholder="Search pokemon"
                        onChange={e => setInputPokemon(e.target.value)}
                        value={inputPokemon}
                    />
                    <button
                        type='submit'    
                        className=''
                    >
                        <img src="https://w7.pngwing.com/pngs/324/645/png-transparent-pokemon-go-gotcha-video-game-jynx-pokeball-orange-pokemon-technology.png" />
                    </button>
                </form>
            )
        }
        else {
            return <InputTypePokemon
                setPokemons={setPokemons}
                setNumberPages={setNumberPages}
                numbersPokemons={numbersPokemons}
                setFilter={setFilter}
            />
        }
    }

    return (
        <div>
            <div className="welcome">
                <h1>Pokedex</h1>
                <p>Welcome <b>{userName}</b> here you can find your favorite pokemon</p>

                <div className="input_pokemon_type">
                    <label htmlFor={!typeInput ? "pokemon_type" : ""} >
                        pokemon
                    </label>

                    <input
                        type="checkbox"
                        onChange={() => setTypeInput(!typeInput)}
                        id="pokemon_type"
                    />
                    <label htmlFor={typeInput ? "pokemon_type" : ""}>
                        type
                    </label>

                </div>
                {
                    changeTypeInput()
                }
            </div>
            <div className="pokemons_list">
                {
                    filter  
                        ? pokemons?.map(pokemon =>  {
                            if(pokemon?.pokemon){
                                return (                                     
                                    <Link
                                        key={pokemon?.pokemon.name}
                                        to={`/pokedex/${pokemon?.pokemon.name}`}>
                                        <PokemonCard pokemon={pokemon?.pokemon} />
                                    </Link>
                                )
                            }
                        }
                            
                        ) : pokemons?.map(pokemon => (
                            <Link
                                key={pokemon?.name}
                                to={`/pokedex/${pokemon?.name}`}>
                                <PokemonCard pokemon={pokemon} />
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
                            numberPages?.map(numValue => (
                                <li
                                    key={numValue}
                                    onClick={() => setNumbersPokemons(numValue)}
                                >{numValue + 1}
                                </li> 
                            ))
                        }
                    </ul>
                </div>

                {
                    container
                    &&  width > numberNegative(container)
                    &&  <button onClick={next}><i className="fa-solid fa-chevron-right"></i></button>
                }
            </div>
        </div>
    );
};

export default Pokedex;