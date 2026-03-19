import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from '../components/LeftSideBar'
import RightsideBar from '../components/RightsideBar'

const Dashboardlayout = () => {
  return (
    <div>
      <LeftSideBar/>
      <Outlet/>
      <RightsideBar/>
    </div>
  )
}

export default Dashboardlayout
