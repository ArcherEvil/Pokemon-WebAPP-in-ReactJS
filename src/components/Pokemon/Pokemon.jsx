import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './Pokemon.css';

const Pokemon = () => {

    const param = useParams().name
    const [Pokemon, SetPokemon] = useState({
        name: '',
        img: '',
        weight: 0,
        abilities: 0,
        height: 0,
        id: 0,
        is_default: false,
        types: ['', ''],
        sprites : [''],
        stats: {
        }
    })

    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + param;
        axios.get(url).then((response) => {
            const data = response.data
            console.log(data)
            console.log('Data is Above \n \n')


            // Determening Abilities
            let abilitieslist = []
            for (var i = 0; i < data.abilities.length; i++) {
                if (data.abilities[i].is_hidden == true) {
                    abilitieslist.push(data.abilities[i].ability.name + " (hidden)")
                }
                else {
                    abilitieslist.push(data.abilities[i].ability.name)
                }
            }

            // Determening Types
            let typeslist = []
            for (var i = 0; i < data.types.length; i++) {
                typeslist.push(data.types[i].type.name)
            }

            
            // Determening sprites
            let spriteslist = []
            for (var i = 0; i< Object.entries(data.sprites).length; i++) {
                if (Object.entries(data.sprites)[i][1] != null & typeof Object.entries(data.sprites)[i][1] != 'object') {
                spriteslist.push(Object.entries(data.sprites)[i][1])
            }}

            // Determening Stats
            let statslist = {}
            for (var i = 0; i< data.stats.length; i++ ) {
                statslist[data.stats[i].stat.name] = data.stats[i].base_stat
            }

            const Dict = {
                name: param,
                img: data.sprites.other['official-artwork'].front_default,
                weight: data.weight,
                abilities: abilitieslist,
                height: data.height,
                id: data.id,
                is_default: data.is_default,
                types: typeslist,
                sprites : spriteslist,
                stats: statslist
            }
            SetPokemon(Dict)
            console.log(Pokemon)
        })
    }, [])


    return (
        <main>
            <div className='container'>
                <div className={[Pokemon.types[0], 'imgcontainer'].join(' ')}>
                    <img className={[Pokemon.types[0]]} src={Pokemon.img}/>
                <p>{Pokemon.name}</p>
                </div>
            </div>
        </main>
    )
}

export default Pokemon

/* API Output:
{
  "name": "geodude",
  "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
  "weight": 200,
  "abilities": [
    "rock-head",
    "sturdy",
    "sand-veil (hidden)"
  ],
  "height": 4,
  "id": 74,
  "is_default": true,
  "types": [
    "rock",
    "ground"
  ],
  "sprites": [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/74.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/74.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/74.png"
  ],
  "stats": {
    "hp": 40,
    "attack": 80,
    "defense": 100,
    "special-attack": 30,
    "special-defense": 30,
    "speed": 20
  }
}

*/