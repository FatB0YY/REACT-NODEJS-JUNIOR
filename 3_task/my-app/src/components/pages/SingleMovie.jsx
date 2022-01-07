import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

import useMoviesService from '../../services/MoviesService'
import Spinner from '../Spinner/Spinner'
import ErrorIMG from '../ErrorIMG/ErrorIMG'
import star from '../star-amsll.png'
import submit from '../undo.png'

import Comment from '../Comment'

import './singleMovie.scss'

const SingleMovie = (props) => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const { error, loading, getMov, clearError } = useMoviesService()

  // comments
  const [value, setValue] = useState('')
  const [comments, setComments] = useState({})

  useEffect(() => {
    updateData()
  }, [id])

  const updateData = () => {
    clearError()
    getMov(id).then((info) => onDataLoaded(info))
  }

  const onDataLoaded = (info) => {
    setData(info)
  }

  // добавление в стейт нового комментария
  const addComment = (event) => {
    event.preventDefault()

    if (!value) {
      return
    }

    const now =
      new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    const obj = { ...comments, [now]: value }

    setComments(obj)

    setValue('')
  }

  const renderComments = useCallback(() => {
    return Object.keys(comments).map((obj, idx) => {
      return <Comment key={obj} obj={obj} comments={comments} />
    })
  }, [comments])

  const errorMessage = error ? <ErrorIMG /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !data) ? (
    <div className='mov-info'>
      <div className='mov-info__posterBlock posterBlock'>
        <div className='posterBlock__block'>
          <img src={data.background} alt={data.title} />
          <div className='posterBlock__ratingBlock'>
            <img src={star} alt='rating' />
            <span>{data.rating}</span>
          </div>
        </div>
      </div>
      <div className='mov-info__descBlock descBlock'>
        <h2>{data.title}</h2>
        <span className='descBlock__year'>{data.year}</span>
        <div className='descBlock__genresBlock'>
          {data.genres
            ? data.genres.map((item, idx) => {
                return (
                  <div key={idx} className='descBlock__genresBlockItem'>
                    <span className='genresBlockItem-circle'></span>
                    <span key={item} className='descBlock__genres'>
                      {item}
                    </span>
                  </div>
                )
              })
            : null}
        </div>
        <div className='descBlock__description'>
          <h3>Synopsis</h3>
          <p>{data.description}</p>
        </div>
        <div className='descBlock__comments'>
          <h3>Comments</h3>

          {/* работает неверно useCallback*/}
          {comments ? renderComments() : null}

          <form className='addComment' onSubmit={(event) => addComment(event)}>
            <textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              type='text'
              placeholder='Leave a comment'
            />
            <button>
              <img src={submit} alt='submit' />
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  )
}

export default SingleMovie
