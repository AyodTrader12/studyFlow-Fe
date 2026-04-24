import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Authlayout = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <Outlet/>
      </div>
      <Toaster />
   
      
            
    
    </div>
  )
}

export default Authlayout
