import mimg from './Images/MainImg.png'
import './home.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const MainImg = () => {
  return (
  <>
    <img src={mimg}/>
  </>
)}



const Home = ({list}) => {

  console.log(list)
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
  

  const [img, setimg] = useState('')
  useEffect(() => {
    axios.get(url).then((response) => {
      setimg(response.data.sprites.other['official-artwork'].front_default)
})
  }, [])
  
  return(

    <button className='card'>
      <img src={img}/>
      <p>{name}</p>
    </button>)
}

export default Home