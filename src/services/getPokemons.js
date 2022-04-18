import API_URL from '../constants/constants'

function getPokemons(numbersPokemons, limit){
    return fetch(`${API_URL}?offset=${numbersPokemons}&limit=${limit}`)
        .then(res => res.json())
        .then(res => res)
}

export default getPokemons