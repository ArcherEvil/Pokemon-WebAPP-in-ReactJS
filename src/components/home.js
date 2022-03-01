import mimg from './Images/MainImg.png'
import './home.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MainImg = () => {
  return (
  <>
    <img src={mimg}/>
  </>
)}



const Home = ({list}) => {
  
  return (
    <>
    <div className='mainimg'>
    <MainImg/>
    <h1>PokéData</h1>
    </div>
    <h1 id='listlabel'>Pokemon List</h1>
    <div className='pokemonlist'>
      {list.map((item) => (<Card name={item.name} url={item.url}/>))}
    </div>
    </>
  )
}

const Card = ({name, url}) => {
  const base = window.location.origin;
  const navigate = useNavigate();

  const Link = (names) => {
    navigate('pokemon/'+ names)
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

export default Home