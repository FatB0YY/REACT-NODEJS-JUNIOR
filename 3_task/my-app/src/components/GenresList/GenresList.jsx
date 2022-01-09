import { memo } from 'react'

const GenresList = memo(({ data }) => {
    console.log('1');
  return (
    <>
      {data.genres.map((item, idx) => {
        return (
          <div key={idx} className='descBlock__genresBlockItem'>
            <span className='genresBlockItem-circle'></span>
            <span key={item} className='descBlock__genres'>
              {item}
            </span>
          </div>
        )
      })}
    </>
  )
})

export default GenresList
