import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getColors from '../services/getColors';
import getPokemon from '../services/getPokemon';


const PokemonInfo = () => {
    const { id } = useParams();
    const [pokemonInfo, setPokemonInfo] = useState({})
 
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]

        getPokemon(id)
            .then(res => {
                setPokemonInfo(res)
                console.log(res.types[0].type.name)

               
                body.style.background = getColors(res.types[0].type.name)
            })

        return () => {
            body.style.background = 'white'
        }
    }, [])

    return (
        <div className="container_pokemon_info">
            <Link to="/pokedex">
                <i className="fa-solid fa-arrow-left"></i>
            </Link>

            <Link to="/config">
                <div className='config'>
                    <i className="fa-solid fa-gear"></i>
                </div>
            </Link>
 
            <img src='https://logos-marcas.com/wp-content/uploads/2020/05/Pokemon-Logo.png'/>

            <div className="pokemon_ct">
                <div className="pokemon_ft">
                    <div className="pokemon_gl_1">
                        <div className="pokemon_glp_1">
                            <img src={pokemonInfo.sprites?.other.dream_world.front_default} alt={pokemonInfo.name} />
                        </div>
                        <div className="pokemon_glp_2">
                            <div>
                                <h4>{pokemonInfo.weight}</h4>
                                <p>Weight</p>
                            </div>

                            <div>
                                <h4>{pokemonInfo.height}</h4>
                                <p>height</p>
                            </div>
                        </div>

                        <h2>{pokemonInfo.name}</h2>
                        <p># {pokemonInfo.id}</p>
                    </div>

                    <div className="pokemon_gl_2">
                        <div className="pokemon_glp2">
                            <h2>Type</h2>
                            <div className="pokemon_glp3">
                                {
                                    pokemonInfo.types?.map( type => (
                                        <div key={type.type.name} className="pokemon_glp4" style={{'background': getColors(type.type.name)}}>
                                            {type.type.name}
                                        </div>
                                    ))
                                }
                            </div>
                            

                        </div>
                        <div className="pokemon_glp2">
                            <h2>Abilities</h2>
                            <div className="pokemon_glp3">
                                {
                                    pokemonInfo.abilities?.map( abilitie => (
                                        <div key={abilitie.ability.name} className="pokemon_glp4 abilities">
                                            {abilitie.ability.name}
                                        </div>
                                    ))
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="pokemon_gl3">
                    <h2>Movements</h2>

                    {
                        pokemonInfo.moves?.map( move => (
                            <p key={move.move.name}>{move.move.name}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PokemonInfo;