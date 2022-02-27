import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header.js';



function App() {

  const [PokemonList, setPokemonList] = useState('')

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    axios.get(url).then((response) => {
    setPokemonList(response.data.results)
})
  }, [])

  return (
    <div className="App">
      <Header/>
    </div>
  );
};

export default App;
