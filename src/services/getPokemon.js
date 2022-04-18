import API_URL from '../constants/constants'

function getPokemon(id){
    return fetch(`${API_URL}${id}`)
        .then(res => res.json())
}

export default getPokemon