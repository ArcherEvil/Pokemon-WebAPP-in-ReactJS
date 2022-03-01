import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './Pokemon.css';

const Pokemon = () => {

    const param = useParams().name
    const [Pokemon, SetPokemon] = useState({
        name: param,
        weight: 0,
        abilities: [],
        is_default: false,
        types: [],
        stats : {
            hp: 0,
            speed: 0,
            attack: 0,
            defense: 0
        }


    })
    const [img, setimg] = useState('')
    useEffect(() => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + param;
        axios.get(url).then((response) => {
            setimg(response.data.sprites.other['official-artwork'].front_default)
            const data = response.data
            console.log(data)


            // Determening Abilities
            let abilities = []
            for (var i = 0; i < data.abilities.length; i++) {
                if (data.abilities[i].is_hidden == true) {
                    abilities.push(data.abilities[i].ability.name + " (hidden)")
                }
                else {
                    abilities.push(data.abilities[i].ability.name)
                }
            }

            // Determening Types
            let types = []
            for (var i = 0; i < data.types.length; i++) {
                types.push(data.types[i].type.name)
            }

            const object = {
                name: param,
                weight: data.weight,
                abilities: abilities,
                height: data.height,
                id: data.id,
                is_default: data.is_default,
                types: types,
                


            }
            console.log(object)
        })
    }, [])

    return (
        <main>
            <div className='container'>

            </div>
        </main>
    )
}

export default Pokemon