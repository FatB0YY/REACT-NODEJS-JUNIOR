import React, { useState, useEffect } from 'react'
import useMoviesService from '../../services/MoviesService'
import { TransitionGroup } from 'react-transition-group'
import Spinner from '../../components/Spinner/Spinner'
import ErrorIMG from '../../components/ErrorIMG/error.png'

import MovieList from '../../components/MovieList/MovieList'

import './home.scss'

const Home = () => {
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

    const items = (
      <TransitionGroup className='mov__grid'>
        <MovieList array={array}/>
      </TransitionGroup>
    )

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <>{items}</>
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

export default Home
