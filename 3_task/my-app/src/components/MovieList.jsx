import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useMoviesService from '../services/MoviesService'
import Spinner from './Spinner/Spinner'
import ErrorIMG from './ErrorIMG/ErrorIMG'
import rating from './rating.png'
// import Skeleton from './Skeleton/Skeleton'
import './movieList.scss'

const MovieList = (props) => {
  // массив фильмов
  const [movieArray, setMovieArray] = useState([])
  // bool идет ли загрузка фильмов
  const [newItemsLoading, setNewItemsLoading] = useState(false)
  // количество фильмов, которое нужно загрузить
  const [offset, setOffset] = useState(8)
  // страница
  const [page, setPage] = useState(1)
  // закончились ли фильмы в бд
  const [movieEnded, setMovieEnded] = useState(false)

  // работа с api
  const { error, loading, getAllMovies } = useMoviesService()

  // при DidMount запрашиваем первые n фильмов
  useEffect(() => {
    onRequest(offset, true, page)
  }, [])

  // запрос на загрузку фильмов
  const onRequest = (offset, initial, page) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true)
    getAllMovies(offset, page).then(onMovieListLoaded)
  }

  // загрузка фильмов
  const onMovieListLoaded = (newMovieArray) => {
    let ended = false

    if (newMovieArray < 8) {
      ended = true
    }

    setMovieArray((movieArray) => [...movieArray, ...newMovieArray])
    setNewItemsLoading((newItemsLoading) => false)
    setOffset((offset) => offset + 8)
    setPage((page) => page + 1)
    setMovieEnded((movieEnded) => ended)
  }

  // рендеринг фильмов
  function renderItems(array) {
    const items = array.map((item, idx) => {
      return (
        <li key={item.id} className='mov__item'>
          {item.background ? (
            <img
              className='mov__item-img'
              src={item.background}
              alt={item.title}
            />
          ) : (
            <img className='mov__item-img' src={ErrorIMG} alt={item.title} />
          )}

          <div className='mov__item-block'>
            <div className='mov__item-blockRating'>
              <img className='mov__item-ratingStar' src={rating} alt='rating' />
              <span className='mov__item-rating'>{item.rating}</span>
            </div>
            <div className='mov__item-genresBlock'>
              {item.genres
                ? item.genres.map((item) => {
                    return (
                      <span key={item} className='mov__item-genres'>
                        {item}
                      </span>
                    )
                  })
                : null}
            </div>

            <Link className='mov__item-btn' to={`/movie/${item.id}`}>
              More
            </Link>
            
          </div>
          <div className='mov__item-titleBlock'>
            <h2 className='mov__item-title'>{item.title}</h2>
            <span className='mov__item-year'>{item.year}</span>
          </div>
        </li>
      )
    })

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className='mov__grid'>{items}</ul>
  }

  const items = renderItems(movieArray)
  const errorMessage = error ? <ErrorIMG /> : null
  const spinner = loading && !newItemsLoading ? <Spinner /> : null

  return (
    <>
      <div className='container mov'>
        {errorMessage}
        {spinner}
        {items}
        {/* <Skeleton /> */}
        <button
          onClick={() => onRequest(offset, false, page)}
          disabled={newItemsLoading}
          style={{ display: movieEnded ? 'none' : 'block' }}
          className='btn btn__mov'
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    </>
  )
}

export default MovieList
