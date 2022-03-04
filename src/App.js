import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/header.js';
import Home from './components/home';
import Pokemon from './components/Pokemon/Pokemon';
import Search from './components/search';


function App() {

  const [PokemonList, setPokemonList] = useState([])

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=1126';
    axios.get(url).then((response) => {
    setPokemonList(response.data.results)
})
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <div>
        
      </div>
    <div className='Main'>
      <Routes>
        <Route path='/' element={<Home list={PokemonList}/>}/>
        <Route path='/pokemon/:name' element={<Pokemon></Pokemon>}/>
        <Route path='/search/:name' element={<Search list={PokemonList}/>}/>
      </Routes>
    </div>
    </div>
    </BrowserRouter>
  );
};

export default App;
