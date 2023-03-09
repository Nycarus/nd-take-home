import React, {useContext, useState, useEffect} from "react";
import { Card, CardContent, Grid, Button, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, ToggleButton, ToggleButtonGroup, CardActionArea, Divider } from "@mui/material";
import { SetupFormContext } from "../../../context/setupFormContext";
import ProfileFormStepper from "../profileFormStepper";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PokedexPokemons from "./pokedexPokemons";

const pokemonTypes = [{type:"normal", color:"#A8A878"}, {type:"fire", color:"#f03080"}, {type:"water", color:"#6897f0"}, {type:"grass", color:"#78c850"}, {type:"electric", color:"#f8d0f0"}, {type:"ice", color:"#98d8d8"}, {type:"fighting", color:"#c03028"},
{type:"poison", color:"#a040a0"}, {type:"ground", color:"#e0c068"}, {type:"flying", color:"#a890f0"}, {type:"psychic", color:"#f85888"}, {type:"bug", color:"#a8b820"}, {type:"rock", color:"#b8a038"}, {type:"ghost", color:"#705898"}, {type:"dark", color:"#f05848"}, {type:"dragon", color:"#7038f8"}, {type:"steel", color:"#b8b8d0"}, {type:"fairy", color:"#f0b6bc"}]

const PokedexForm = () => {
    const {togglePreviousPage, toggleNextPage} = useContext(SetupFormContext)
    const [selectedPokemon, setSelectedPokemon] = useState({})
    const [pokemons, setPokemons] = useState([])
    const [filters, setFilters] = useState([])
    const [pokemonName, setPokemonName] = useState("")

    const validateForm = () => {
        let valid = true
        if (!selectedPokemon.name || !selectedPokemon.img){
            valid = false
        }
        return valid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()){
            toggleNextPage()
        }
    }

    const handleSearchFormSubmit = (e) => {
        e.preventDefault()
        
        if (filters.length > 0){
            const filterTypeRequests = []

            // Get all pokemon from each type
            filters.forEach((filterType)=>{
                filterTypeRequests.push(fetch(`https://pokeapi.co/api/v2/type/${filterType}`).then((res)=>res.json()))
            })
            
            // Filter pokemons that are in both types
            Promise.all(filterTypeRequests).then((filter) => {
                const filterTypePokemons = filter.map((data) => ({
                    pokemon: data.pokemon
                }))

                let re = new RegExp(`${pokemonName}`,'gi')
                let filteredPokemons = []

                // Filtering pokemon in both list
                if (filters.length == 2){
                    filteredPokemons = filterTypePokemons[0].pokemon.filter(a => filterTypePokemons[1].pokemon.some(b=> a.pokemon.name === b.pokemon.name))
                }
                else if (filters.length == 1){
                    filteredPokemons = filterTypePokemons[0].pokemon
                }

                // Filtering pokemon that partially matches input
                if (pokemonName){
                    filteredPokemons = filteredPokemons.filter(a => a.pokemon.name.match(re))
                }
                
                // remove unnecessary information
                filteredPokemons = filteredPokemons.map((o)=>o.pokemon)

                setPokemons(filteredPokemons)
            })
        }
        else{
            // Grab all pokemon and filter by name
            let data = JSON.parse(window.localStorage.getItem("pokemon"))
            
            // Filtering pokemon that partially matches input
            if (pokemonName){
                let re = new RegExp(`${pokemonName}`,'g')
                data = data.filter(a=> a.name.match(re))
            }

            setPokemons(data)
        }
    }

    const handleFilterButton = (e, filter) => {
        if (filter.length <= 2){
            setFilters(filter)
        }
    }

    const handleResetButton = () => {
        setPokemonName("")
        setFilters([])
    }

    const handleSelectPokemon = (name, img) => {
        if (name && img){
            setSelectedPokemon({name, img})

            // Save selected pokemon
            if (window){
                let data = window.localStorage.getItem("profile-form")
                if (data){
                    data = JSON.parse(data)
                    data.pokemonName = name
                    data.pokemonImg = img
                    window.localStorage.setItem("profile-form", JSON.stringify(data))
                }
            }
        }
    }

    useEffect(()=>{
        // populate auto complete
        if (window && window.localStorage.getItem("pokemon")){
            setPokemons(JSON.parse(window.localStorage.getItem("pokemon")))
        }
        // Store pokemon names to localstorage
        else{
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
            .then((res)=>res.json())
            .then((data) => {
                window.localStorage.setItem("pokemon",JSON.stringify(data.results))
                setPokemons(data)
            })
        }

        // Retrieve selected pokemon
        if (window){
            let data = window.localStorage.getItem("profile-form")
            if (data){
                data = JSON.parse(data)
                setSelectedPokemon({name:data.pokemonName, img:data.pokemonImg})
            }
        }
    }, [])

    return (
        <Box>
            {/* Pokedex Form */}
            <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
                <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                    <ProfileFormStepper/>
                    <form onSubmit={handleSubmit} style={{marginTop:5}}>
                        {/* Chosen Pokemon */}
                        {
                            selectedPokemon.name && selectedPokemon.img ?
                            <Card sx={{border: '1px solid'}}>
                                <CardContent>
                                    <img src={selectedPokemon.img}></img>
                                    <Divider/>
                                    <Typography>
                                        {selectedPokemon.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                            :
                            <Typography sx={{marginTop:3}}>
                                Enter a name and/or use the filter to find a pokemon.
                            </Typography>
                        }

                        {/* buttons */}
                        <Grid container spacing={2} sx={{justifyContent:"space-between", marginTop:"5px"}}>
                            <Grid item>
                                <Button variant="contained" onClick={togglePreviousPage}>
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            
            {/* Search Pokemon */}
            <Card variant="outlined" sx={{minWidth:250, marginTop:3, border:'3px solid'}}>
                <CardContent sx={{justifyContent:"center", textAlign:'center'}}>
                    <form onSubmit={handleSearchFormSubmit}>
                        {/* Field Input */}
                        <Grid container spacing={2} direction="column" align="center" sx={{justifyContent:"center", marginTop:"5px"}}>
                            <TextField label="Pokemon Name" variant="outlined" value={pokemonName} onChange={e => setPokemonName(e.target.value)} sx={{margin:2}}/>
                            
                            {/* Filters */}
                            <Grid item>
                                <Accordion sx={{ backgroundColor:"#616161"}}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1a-content" id="panel1a-header">
                                        <Typography sx={{color:"#fff"}}>
                                            Filters
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography sx={{color:"#fff"}}>
                                            Pokemon Types (max 2)
                                        </Typography>

                                        {/* Pokemon Types */}
                                        <ToggleButtonGroup color="primary" value={filters} onChange={handleFilterButton} sx={{justifyContent:"center", flexWrap: "wrap", gap:"20px", padding:"10px"}}>
                                            {
                                                pokemonTypes.map((pokemonType, index) => (
                                                    <ToggleButton value={pokemonType.type} sx={{width: "100px", borderRadius: "10px !important", boxShadow:"1px 1px 7px 1px", backgroundColor:`${pokemonType.color} !important`, color:"white", }} key={index}>
                                                        <Typography color="#fff">
                                                            {pokemonType.type}
                                                        </Typography>
                                                    </ToggleButton>
                                                ))
                                            }
                                        </ToggleButtonGroup>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>

                        {/* buttons */}
                        <Grid container spacing={2} sx={{justifyContent:"space-around", marginTop:"5px"}}>
                            <Grid item>
                                <Button variant="contained" onClick={handleResetButton}>
                                    Reset
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" type="submit">
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>

            {/* Pokemon List */}
            <PokedexPokemons pokemons={pokemons} handleSelectPokemon={handleSelectPokemon}/>
        </Box>
    )
}

export default PokedexForm