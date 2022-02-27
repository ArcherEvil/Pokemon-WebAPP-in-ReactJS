import './header.css';

const header = () => {
  return (
    <div className='header'>    
        <h1>PokéData</h1>
        <form>
            <input/>
            <button>
                <img src="https://img.icons8.com/ios-filled/40/000000/search--v1.png"/>
            </button>
        </form>
    </div>
  )
}

export default header