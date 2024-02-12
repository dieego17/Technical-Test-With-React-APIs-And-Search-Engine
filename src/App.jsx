
import { useEffect, useState, useRef } from 'react'
import './App.css'

import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies'


function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  //validacion del input
  useEffect(() =>{

    //comprobamos que no ha escrito nada la primera vez para que no valide
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return 
    }

    if(search === ''){
      setError('No se puede buscar una película vacia')
      return
    }

    if(search.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  },[search])

  return { search, updateSearch, error }
}

function App() {
  
  //custom Hooks
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({search})

  const handleSubmit = (event) =>{
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) =>{
    updateSearch(event.target.value)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Prueba técnica de OMDB</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' type="text" className="form__input" placeholder="The Matrix, Avengers, Cars..." />
          <button type='submit' className="form__button">Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main className='main'>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
