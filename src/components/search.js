import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import raw from './names.txt';
import axios from 'axios'
import './home.css';




const Search = ({list}) => {
    const param = useParams().name;
    const results = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i].name.includes(param) && !results.includes(list[i])) {
            results.push(list[i])
        }
    }


    return (
        <div className='pokemonlist'>
                  {results.map((item) => (<Card name={item.name} url={item.url}/>))}
        </div>
      )

}

const Card = ({name, url}) => {
    const base = window.location.origin
    const navigate = useNavigate();
  
    const Link = (names) => {
      console.log(base + 'pokemon/' + names)
      
    }
    const [types, setTypes] = useState([])
    const [img, setimg] = useState('')
    useEffect(() => {
      axios.get(url).then((response) => {
        setimg(response.data.sprites.other['official-artwork'].front_default)
        setTypes(response.data.types)
  })
    }, [])
    
    return(
  
      <button className='card' onClick={() => {Link(name)}}>
        <img src={img}/>
        <p>{name}</p>
        <div className='types'>
        {types.map((item) => (<p className={[item.type.name,' type'].join(' ')}>{item.type.name}</p>))}
        </div>
      </button>)
  }
  

export default Search