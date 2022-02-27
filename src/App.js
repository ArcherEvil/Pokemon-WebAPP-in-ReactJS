import axios from 'axios';
import { useState } from 'react';

function App() {

  const [PokemonList, setPokemonList] = useState([])
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100'
  const list = []
  
  axios.get(url).then((response) => {
    setPokemonList(response.data.results)
    console.log(response.data.results)
  })

  

  
  return (
    <div className="App">
      {PokemonList.map(pokemon => <div>{pokemon.name}</div>)}
    </div>
  );
}

export default App;
