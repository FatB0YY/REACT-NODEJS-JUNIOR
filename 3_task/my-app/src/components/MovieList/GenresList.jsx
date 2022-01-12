import { memo } from 'react'

const GenresList = memo(({ item }) => {
  return (
    <>
      {item.genres
        ? item.genres.map((item) => {
            return (
              <span key={item} className='mov__item-genres'>
                {item}
              </span>
            )
          })
        : null}
    </>
  )
})

export default GenresList
