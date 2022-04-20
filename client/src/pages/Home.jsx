import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>KanBan</h1>
        <Link to="/login">Get Started</Link>
    </div>
  )
}

export default Home