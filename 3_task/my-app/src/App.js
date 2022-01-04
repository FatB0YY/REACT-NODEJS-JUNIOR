import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Spinner from './components/Spinner/Spinner'

import './App.css'

const Layout = lazy(() => import('./components/pages/Layout'))
const Home = lazy(() => import('./components/pages/Home'))
const SingleMovie = lazy(() => import('./components/pages/SingleMovie'))

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/movie/:id' element={<SingleMovie />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
