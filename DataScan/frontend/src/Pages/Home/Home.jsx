import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className='img-wrapper'>
      <div className='container'>
        <div className='img-div'>
          <img src="https://imgs.search.brave.com/UDB1cf4luBRukHHrE0ybzt_RszHt56k0uEL_hGDAGw4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd0/b3RleHQubmV0L2Fz/c2V0cy9pbWcvSW5p/dGlhdGUlMjB0aGUl/MjBpbWFnZS5wbmc" alt="image" />
        </div>
        <div className='img-description'>
          <h1 >Welcome to DataScan!</h1>
          <h2>Upload files to classify and manage</h2> 
          <h2>sensitive data securely.</h2>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
