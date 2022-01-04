import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp()

  const _apiUrl = 'https://yts.mx/api/v2/list_movies.json'
  const _baseOffset = 5
  const _basePage = 1

  const getAllMovies = async (offset = _baseOffset, page = _basePage) => {
    const res = await request(
      `${_apiUrl}?page=${page}&limit=${offset}`
    )
    return res.data.movies.map(_transformMovie)
  }

  const getMov = async (id) => {
    const res = await request(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    return _transformMovie(res.data.movie)
  }

  const _transformMovie = (mov) => {
    return {
      background: mov.large_cover_image,
      id: mov.id,
      genres: mov.genres,
      rating: mov.rating,
      description: mov.description_full ? mov.description_full : null,
      title: mov.title,
      year: mov.year,
      runtime: mov.runtime,
    }
  }

  return {
    loading,
    error,
    getAllMovies,
    getMov,
    clearError,
  }
}

export default useMarvelService



