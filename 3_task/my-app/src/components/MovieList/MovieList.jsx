import { memo } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import rating from '../../img/rating.png'

import GenresList from './GenresList'



const MovieList = memo(({ array, scrollPosition }) => {

  // хуй его как это хуйню передать правильно 
  // console.log(scrollPosition);

  const setViewed = (id) => {
    localStorage.setItem(id, 'true')
  }

  return (
    <>
      {array.map((item, idx) => {
        return (
          <CSSTransition
            key={item.id}
            timeout={380}
            classNames='genresAnimation'
          >
            <li className='mov__item'>
              <LazyLoadImage
                className='mov__item-img'
                src={item.background}
                alt={item.title}
                effect="opacity"
                scrollPosition={scrollPosition}
              />
              <div className='mov__item-block'>
                <div className='mov__item-blockRating'>
                  <img
                    className='mov__item-ratingStar'
                    src={rating}
                    alt='rating'
                  />
                  <span className='mov__item-rating'>{item.rating}</span>
                </div>
                <div className='mov__item-genresBlock'>
                  <GenresList item={item} />
                </div>

                <Link className='mov__item-btn' to={`/movie/${item.id}`} onClick={() => setViewed(item.id)}>
                  More
                </Link>
              </div>
              <div className='mov__item-titleBlock'>
                <h2 className='mov__item-title'>{item.title}</h2>
                <span className='mov__item-year'>{item.year}</span>
              </div>
              {localStorage.getItem(item.id) ? (
                <div className='mov__item-viewed'>Просмотренно</div>
              ) : null}
            </li>
          </CSSTransition>
        )
      })}
    </>
  )
})

export default trackWindowScroll(MovieList)
