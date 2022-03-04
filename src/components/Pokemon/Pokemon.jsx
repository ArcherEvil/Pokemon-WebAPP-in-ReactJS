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
        abilities: ['', ''],
        height: 0,
        id: 0,
        is_default: false,
        types: ['', ''],
        sprites : [''],
        stats: {
            hp: 0
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
                <img className={[Pokemon.types[0]]} src={Pokemon.img}/>
                <p>{Pokemon.name}</p>
                <div className="types">
                    {Pokemon.types.map((type) => (<h3 className={type}>{type}</h3>))}
                </div>
                <div className='abilities'>
                    <h2>Abilities:</h2>
                    {Pokemon.abilities.map((ability) => (<h2 className={ability}>{ability}</h2>))}
                </div>
                <div className='statsgrid'>
                    <details className='stats'>
                        <summary   summary>Stats</summary>
                        {Object.entries(Pokemon.stats).map(stat => (<stat>{stat[0]} : {stat[1]}</stat>))}
                    </details>
                    <div className="information">
                        <h5>
                            ID: {Pokemon.id}
                        </h5>
                        <h5>
                            height: {Pokemon.height}
                        </h5>
                        <h5>
                            Weight: {Pokemon.weight}
                        </h5>
                    </div>
                </div>
                <div className="Sprites">
                    <p>Other sprites:</p>
                    <div>
                        {Pokemon.sprites.map((sprite) => (<img src={sprite}></img>))}
                    </div>
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