import React from 'react'
import { Outlet } from 'react-router-dom'

const Authlayout = () => {
  return (
    <div>
      <Outlet/>
      <div className="flex flex-col items-center justify-center ">
             <p className="text-xs text-gray-400 mt-6 pb-6">© {new Date().getFullYear()} StudyFlow. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Authlayout
