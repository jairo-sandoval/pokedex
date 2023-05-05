function getTypes(type = ""){
    return fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then(res => res.json())
}

export default getTypes