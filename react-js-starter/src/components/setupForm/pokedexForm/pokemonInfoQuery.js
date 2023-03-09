import { useEffect, useState } from "react"

const PokemonInfoQuery = (pokemon, pokemonIndex, pokemonPreviousIndex) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [pokemonInfo, setPokemonInfo] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(()=>{
        setPokemonInfo([])
    }, [pokemon])

    useEffect(()=>{
        if (!pokemon){
            return
        }

        setLoading(true)
        setError(false)
        
        // Check if there are any pokemons left to render
        if (pokemonPreviousIndex > pokemon.length){
            console.log("no more pokemon")
            return
        }

        let maxIter = 0

        // Get the maximum iterations for the pagination
        if (pokemon.length > pokemonIndex){
            maxIter = pokemonIndex - pokemonPreviousIndex
        }
        else{
            maxIter = pokemon.length - pokemonPreviousIndex - 1
            setHasMore(false)
        }

        // Fetch all pokemon information
        let results = []
        for (let i = pokemonPreviousIndex; i <= pokemonPreviousIndex + maxIter; i++){
            results.push(fetch(`${pokemon[i].url}`).then((res)=>res.json()))
        }

        Promise.all(results)
        .then((info) => {
            const pokemonData = info.map((data) => ({
                species: data.species,
                sprites: data.sprites
            }))

            // Adding new pokemon to list
            if (pokemonData){
                setPokemonInfo(prevPokemonInfo => prevPokemonInfo.concat(pokemonData))
            }
            setLoading(false)
            setHasMore(pokemonIndex < pokemon.length)
        }).catch((e)=>{
            console.log(e)
            setLoading(false)
            setError(true)
        })
    }, [pokemon, pokemonIndex, pokemonPreviousIndex])

    return {pokemonInfo, loading, error, hasMore}
}

export default PokemonInfoQuery