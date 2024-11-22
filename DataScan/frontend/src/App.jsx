import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Upload from './Pages/Upload/Upload'
import ScansHistory from './Pages/ScansHistory/ScansHistory'
import DeleteScans from './Pages/DeleteScans/DeleteScans'

const App = () =>{

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analyse' element={<Upload/>} />
        <Route path='/scans' element={<ScansHistory/>} />
        <Route path='/delete' element={<DeleteScans />} />
      </Routes>

    </div>
  )
}

export default App
