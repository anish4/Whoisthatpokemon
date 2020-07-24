import React,{useState, useEffect} from 'react'
import { Typography, Link, CircularProgress, Button } from '@material-ui/core'
import axios from 'axios'

const Pokemon = (props)=>{
    const {match,history} = props
    const {params} = match
    const {pokemonId}=params   
    const[pokemon,setPokemon] = useState(undefined)


    useEffect(()=>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(function(response){
            const {data} = response
            setPokemon(data)

        })
        .catch(function(error){
            setPokemon(false)
        })
    })

    const getPokemonJSX = ()=>{
        const{name,id,height,weight,species,types,sprites}=pokemon
        const fullImage =`https://pokeres.bastionbot.org/images/pokemon/${id}.png`
        const {front_default} = sprites

        return(
            <>
            <Typography variant='h1'>
                {`${id}.${name.toUpperCase()}`}<img src={front_default} alt={`${name}`}/>
            </Typography>
            <img style={{height:'300px',width:"300px"}} src={fullImage} alt={`${name}`} />
            <Typography variant='h3'>Pokemon Info</Typography>
            <Typography>
                Species:<Link href={species.url}>{species.name}</Link>
            </Typography>
            <Typography>Weight:{weight}</Typography>
            <Typography>Height:{height}</Typography>
            <Typography variant='h6'>Types:</Typography>
            {
                types.map((speName)=>{
                    return(<Typography>{speName.type.name}</Typography>)
                })
            }
            
            </>
        )
    }


    return(
    <>
        {pokemon===undefined &&<CircularProgress/>}
        {pokemon!==undefined && pokemon && getPokemonJSX()}
        {pokemon===false &&<Typography>Pokemon not FOund</Typography>}
        {pokemon!==undefined&&(<Button onClick={()=>history.push(`/`)}>Back to Pokedex</Button>)}
    
    </>)
}

export default Pokemon