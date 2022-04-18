import  { useEffect, useState } from 'react';
import getTypes from '../services/getTypes';

const InputTypePokemon = ({setPokemons, pokemons}) => {
    const [ types, setTypes] = useState([])
    const [ valueType, setValueType ] = useState("")

    useEffect(() => {
        getTypes()
            .then(res => setTypes(res.results))

        if(valueType){
            console.log(valueType)
            getTypes(valueType)
                .then(res => console.log(res))
        }
    }, [setPokemons])

    return (
        <select value={valueType} onChange={e => setValueType(e.target.value)} >
                {
                    types?.map( type => <option key={type.name} value={type.name}> {type.name}</option>) 
                }
        </select>
       
    );
};

export default InputTypePokemon;