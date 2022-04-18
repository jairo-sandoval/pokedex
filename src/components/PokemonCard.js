import  { useEffect, useState } from 'react';
import getPokemon from '../services/getPokemon';
import getColors from '../services/getColors';


const PokemonCard = ({ pokemon }) => {
    const [ pokemonInfo, setPokemonInfo ] = useState({})

    useEffect(() => {
        getPokemon(pokemon.name)
            .then(res => {
                setPokemonInfo(res)
            })
    }, [pokemon])

    return (
        <div className="card_pokemon" style={{"background" : getColors(pokemonInfo.types?.[0].type.name)}}>
            
            <div className="content" >
                <h2>{pokemonInfo.name}</h2>
                <div>   
                    <b>Types:</b>  { pokemonInfo.types?.map( type => <span key={type.type.name}>{type.type.name}, </span>)}
                </div>

                <div>
                    <b>{pokemonInfo.stats?.[0].stat.name}</b>: {pokemonInfo.stats?.[0].base_stat}
                </div>

                <div>
                    <b>{pokemonInfo.stats?.[1].stat.name}</b> : {pokemonInfo.stats?.[1].base_stat}
                </div>

                <div>
                    <b>{pokemonInfo.stats?.[2].stat.name}</b> : {pokemonInfo.stats?.[2].base_stat}
                </div>
        
            </div>
            <img
                src={pokemonInfo.sprites?.other.dream_world.front_default 
                    ? pokemonInfo.sprites?.other.dream_world.front_default
                    : pokemonInfo.sprites?.front_default 
                    } alt={pokemonInfo.name}/>

               </div>
    );
};

export default PokemonCard;