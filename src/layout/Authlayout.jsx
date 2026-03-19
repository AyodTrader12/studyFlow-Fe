import React from 'react'
import { Outlet } from 'react-router-dom'

const Authlayout = () => {
  return (
    <div>
      <Outlet/>
      <div className="flex flex-col items-center justify-center ">
             <p className="text-xs text-gray-400 pb-3">© {new Date().getFullYear()} StudyFlow. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Authlayout
