import React,{useState, useEffect} from 'react'
import {AppBar,Toolbar, Grid,Card,CardContent, CardMedia, Typography} from '@material-ui/core'
import {makeStyles,fade} from '@material-ui/core/styles'
import {CircularProgress} from '@material-ui/core'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'

const useStyle = makeStyles(theme=>({
    pokedexContainer:{
        paddingTop:'20px',
        paddingLeft:'50px',
        paddingRight:'50px'
    },
    cardMedia:{
        margin:'auto'
    },
    cardContent:{
        textAlign:"center",
    },
    searchContainer:{
        display:'flex',
        backgroundColor:fade(theme.palette.common.white,0.15),
        paddingLeft:'20px',
        paddingRight:'20px',
        marginTop:'5px',
        marginBottom:'5px'

    },
    searchIcon:{
        alignSelf:'flex-end',
        marginBottom:'5px'
    },
    textInput:{
        width:'200px',
        margin:'5px'
    }
}))




const Pokedex = (props)=>{
    const classes = useStyle()
    const [pokeData,setPokeData] = useState({})
    const [filter,setFilter] = useState('')
    const {history} = props

    const handleInput = (e)=>{
        setFilter(e.target.value)
    }



    useEffect(()=>{
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(function(response){
                const {data} = response
                const {results} = data
                const newPokemonData = {}
                results.forEach((pokemon,index) => {
                    newPokemonData[index+1]={
                        id:index+1,
                        name:pokemon.name,
                        sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                    }
                });
                setPokeData(newPokemonData)
            })

    },[])



    const getPokemonCard = (pokemonId)=>{
        const {id,name,sprite} = pokeData[pokemonId]
        return(
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card onClick={()=>history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{height:'130px',width:'130px'}}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}.${name.toUpperCase()}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return(
        <>
           <AppBar position='static'>
               <Toolbar>
                   <div className={classes.searchContainer}>
                       <SearchIcon className={classes.searchIcon}/>
                       <TextField onChange={handleInput} className={classes.textInput} label='Pokemon' variant='standard'/>
                   </div>
               </Toolbar>
           </AppBar>
           {pokeData?(<Grid className={classes.pokedexContainer} container spacing={2}>
               {Object.keys(pokeData).map((pokemonId)=>
                   pokeData[pokemonId].name.includes(filter)&&
                   getPokemonCard(pokemonId))}
           </Grid>):<CircularProgress/>}
           
        </>
        
    )
}

export default Pokedex