import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Spinner from './components/Spinner/Spinner'
import Layout from './pages/Layout/Layout'
import Home from './pages/Home/Home'

import './App.css'

const SingleMovie = lazy(() => import('./pages/SingleMovie/SingleMovie'))
const NotFoundPage = lazy(() => import('./pages/404/404'))

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/movie/:id' element={<SingleMovie />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
