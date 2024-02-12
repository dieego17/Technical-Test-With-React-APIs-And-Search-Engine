export const searchMovies = async ({ search }) =>{
    if(search === '') return null
    fetch(`https://www.omdbapi.com/?apikey=25ae7164&s=${search}`)

    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=&s=${search}`)
        const json = await response.json()

        const movies = json.Search
   
        return movies?.map(movie =>({
            id: movie.Title,
            title:movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))

    }catch (e){
        throw new Error('Error searching movies')
    }
}