import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useMoviesService from '../../services/MoviesService'

import Spinner from '../../components/Spinner/Spinner'
import ErrorIMG from '../../components/ErrorIMG/ErrorIMG'
import star from '../../img/star-amsll.png'
import submit from '../../img/undo.png'

import Skeleton from '../../components/Skeleton/Skeleton'

import CommentsList from '../../components/CommentsList/CommentsList'
import GenresList from '../../components/GenresList/GenresList'

import './singleMovie.scss'

const SingleMovie = (props) => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const { error, loading, getMov, clearError } = useMoviesService()

  // comments
  const [comment, setComment] = useState({
    value: '',
    date: '',
    id: '',
  })
  const [comments, setComments] = useState([])

  // select
  const [selectedSort, setSelectedSort] = useState('')

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

  const addNewComment = (event) => {
    event.preventDefault()

    // мини валидация ;) можно подключить formik или react form hooks
    if (!comment.value.trim()) {
      return
    }
    const dateNow =
      new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    setComments([...comments, { ...comment, id: `commentID-${uuidv4()}`, date: dateNow }])
    setComment({
      value: '',
      date: '',
      id: '',
    })
  }

  // функция обратного вызова для удаления комментария
  const removeComment = useCallback(
    (comment) => {
      setComments(comments.filter((c) => c.id !== comment.id))
    },
    [comments]
  )

  // сортировка
  const sortComments = (event) => {
    setSelectedSort(event.target.value)

    if (selectedSort === 'new') {
      setComments([...comments].sort((a, b) => b.date.localeCompare(a.date)))
    } else if (selectedSort === 'old') {
      setComments([...comments].sort((a, b) => a.date.localeCompare(b.date)))
    }
  }

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
          {data.genres ? <GenresList data={data} /> : null}
        </div>
        <div className='descBlock__description'>
          <h3>Synopsis</h3>
          <p>{data.description}</p>
        </div>
        <div className='descBlock__comments'>
          <h3>Comments</h3>

          <div className='descBlock__sortBlock'>
            <select
              value={selectedSort}
              onChange={(event) => sortComments(event)}
            >
              <option disabled value=''>
                Сортировка по дате
              </option>
              <option value='new' name='new'>
                Сначала новые
              </option>
              <option value='old' name='old'>
                Сначала старые
              </option>
            </select>
          </div>

          {comments.length ? (
            <CommentsList comments={comments} removeComment={removeComment} />
          ) : (
            <Skeleton />
          )}

          <form
            className='addComment'
            onSubmit={(event) => addNewComment(event)}
          >
            <textarea
              value={comment.value}
              onChange={(event) =>
                setComment({ ...comment, value: event.target.value })
              }
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
