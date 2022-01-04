import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import useMoviesService from '../../services/MoviesService'
import Spinner from '../Spinner/Spinner'
import ErrorIMG from '../ErrorIMG/ErrorIMG'

const SingleMovie = (props) => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const { error, loading, getMov, clearError } = useMoviesService()

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

  const errorMessage = (error ) ? <ErrorIMG /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !data) ? (
    <div>
      <h1>{data.title}</h1>
      <img src={data.background} alt={data.title} />
      <div>
        genres:{' '}
        {data.genres
          ? data.genres.map((item) => {
              return <span key={item}>{item}</span>
            })
          : null}
      </div>

      <div>
        rating: <span>{data.rating}</span>
      </div>
      <p>{data.description}</p>
      <div>
        year: <span>{data.year}</span>
      </div>
      <div>runtime: <span>{data.runtime}</span></div>
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
