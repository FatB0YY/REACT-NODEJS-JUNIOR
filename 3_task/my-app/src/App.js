import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Spinner from './components/Spinner/Spinner'
import Layout from './components/pages/Layout'
import Home from './components/pages/Home'

import './App.css'

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
