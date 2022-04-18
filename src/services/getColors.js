function getColors(color){
    const colors = {
        normal : '#7C555D',
        fighting: "#A6462E",
        flying: "#7CB1B8",
        poison: "#7845A9",
        ground: "#91621D",
        rock: "#909197",
        bug: "#55C352",
        ghost: "#4D53B1",
        steel: "#7E8F89",
        fire: "#E57921",
        water: "#1579FB",
        grass: "#9FD5C6",
        electric: "#4A4FB7",
        psychic: "#86948F",
        ice: "#69CDF7",
        dragon: "#6AABB3",
        dark: "#0D1211",
        fairy: "#C54973",
        unknown: "#868689",
        shadow: "#3F4393"
    }

    return colors[color]
}

export default getColors