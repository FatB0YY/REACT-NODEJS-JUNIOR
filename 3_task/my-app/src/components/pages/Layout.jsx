import { Outlet } from 'react-router-dom'

import './layout.scss'

const Layout = () => {
  return (
    <>
      {/* вот здесь можем расположить нав меню, это лейаут*/}
      <header className='header'>
        <div className='container'>
          <h1>Movies</h1>
          {/* <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul> */}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
