import { useState } from 'react'
import './App.css';
import Navbar from '../components/navbar';
import BookNow from '../components/booknow';


function App() {
  return (
    <div>
      <div className='navbar'>
        <Navbar />
      </div>
      <div> <BookNow/> </div>

      <div className='new-client-form'></div>
      <div className='new-appointment-form'></div>
    </div>
  )
}

export default App
