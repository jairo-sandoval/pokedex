import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getTypes from '../services/getTypes';

const InputTypePokemon = ({setPokemons, setNumberPages, numbersPokemons, setFilter}) => {
    const configNumber = useSelector(state => state.configNumber)

    const [ types, setTypes] = useState([])
    const [ valueType, setValueType ] = useState("")

    useEffect( () => {
        getTypes()
            .then(res => setTypes(res.results))
    }, [])

    const getTypesPokemons = (e) => {
        setValueType(e.target.value)
        setFilter(true)

        getTypes(e.target.value)
            .then(res => {
                const pokemonsPage = []
                const from = numbersPokemons * configNumber
                const to = from + configNumber

                for(let i = from; i < to; i++){
                    pokemonsPage.push(res.pokemon[i])
                }

                setPokemons([...pokemonsPage])

                const numberPagesCalc = (res.pokemon.length / configNumber)

                const rangeNumberPages = Number.isInteger(numberPagesCalc)
                    ? [...Array(parseInt(numberPagesCalc)).keys()]
                    : [...Array(parseInt(numberPagesCalc + 1)).keys()]

                setNumberPages(rangeNumberPages)
            })

    }

    return (
        <form >
            <select value={valueType} onChange={getTypesPokemons} >
                {
                    types?.map( type => <option key={type.name} value={type.name}> {type.name}</option>) 
                }
            </select>
        </form>
       
    );
};

export default InputTypePokemon;