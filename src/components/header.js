import { Link, useNavigate } from 'react-router-dom';
import './header.css';



const Header = () => {

  let input = '';
  const navigate = useNavigate();

  const Search = () => {
    navigate('/search/' + input)
  }

  return (
    <div className='header'>    
        <Link id='header' to='/'
      >PokéData</Link>
        <form>
            <input onChange={(evt) => { input = evt.target.value;}}/>
            <button onClick={Search}>
                <img src="https://img.icons8.com/ios-filled/40/000000/search--v1.png"/>
            </button>
        </form>
    </div>
  )
}

export default Header