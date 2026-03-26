import React from 'react'
import Header from '../static/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../static/Footer'

const Mainlayout = () => {
  return (
    <div>
      <Header/>
        <main className="pt-16 px-5">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default Mainlayout
