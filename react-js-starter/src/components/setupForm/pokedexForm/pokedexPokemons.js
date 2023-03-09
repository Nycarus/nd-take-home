import React, {useState, useEffect, useRef, useCallback} from "react";
import { Card, CardContent, Grid, Typography, CardActionArea, Divider, CircularProgress } from "@mui/material";
import PokemonInfoQuery from "./pokemonInfoQuery";

const elementsPerPagination = 20

const PokedexPokemons = (props) => {
    const [pokemonIndex, setPokemonIndex] = useState(20)
    const [pokemonPreviousIndex, setPreviousPokemonIndex] = useState(0)
    const observer = useRef()

    useEffect(()=>{
        setPokemonIndex(elementsPerPagination)
        setPreviousPokemonIndex(0)
    }, [props.pokemons])

    const {pokemonInfo, loading, error, hasMore} = PokemonInfoQuery(props.pokemons, pokemonIndex, pokemonPreviousIndex)


    const lastPokemonRef = useCallback(node => {
        if (loading) {
            return
        }
        
        if (observer.current) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                setPokemonIndex(pokemonIndex + elementsPerPagination)
                setPreviousPokemonIndex(pokemonIndex)
            }
        })

        if (node){
            observer.current.observe(node)
        }
    })

    if (error){
        console.log(error)
    }

    return (
        <Card variant="outlined" sx={{display:"flex", justifyContent:"center", minWidth:250, marginTop:3, border:'3px solid'}}>
            <CardContent sx={{marginTop:2}}>
                <Grid container spacing={2} direction="row" align="center" alignItems="center" justifyContent="center">
                    {
                        pokemonInfo && pokemonInfo.length > 0 ?
                        pokemonInfo.map((pokemon, index) => {
                            
                            return(
                                <Grid item key={index}>
                                    <Card sx={{border: '1px solid', width:125, height:170}}>
                                        <CardActionArea onClick={()=> {props.handleSelectPokemon(pokemon.species.name, pokemon.sprites.front_default)}}>
                                            <CardContent>
                                                <img src={pokemon.sprites.front_default}></img>

                                                <Divider/>

                                                <Typography sx={{overflowWrap:"break-word"}}>
                                                    {pokemon.species.name}
                                                </Typography>
                                                
                                                {
                                                    // Load more pokemon when rendered
                                                    pokemonInfo.length === index + 1 && hasMore ?
                                                        <div ref={lastPokemonRef}></div>
                                                    :
                                                        null
                                                }
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })
                        :
                        <Typography>Search pokemon to display.</Typography>
                    }

                    {
                        // Loading bar
                        loading && <CircularProgress/>
                    }
                </Grid>

                
            </CardContent>
        </Card>
    )
}

export default PokedexPokemons