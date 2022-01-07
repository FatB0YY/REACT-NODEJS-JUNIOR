import { Outlet, useParams, Link } from 'react-router-dom'
import img from '../undo.png'

import './layout.scss'

const Layout = () => {
  const { id } = useParams()
  return (
    <>
      {/* вот здесь можем расположить нав меню, это лейаут*/}
      <header className='header'>
        <div className='container'>
          <h1>Movies</h1>
          {id ? (
            <div>
              <Link to='/' className='header__back'>
                <img src={img} alt='home page' />
              </Link>
            </div>
          ) : (
            // <ul>
            //   <li>1</li>
            //   <li>2</li>
            //   <li>3</li>
            // </ul>
            <ul></ul>
          )}
        </div>
      </header>

      <main>
        <div className='container'>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
