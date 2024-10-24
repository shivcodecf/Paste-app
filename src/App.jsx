import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import ViewPaste from './components/ViewPaste'
import Paste from './components/Paste'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
       <Navbar/>
       <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
       <Navbar/>
       <Paste/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
          <Navbar/>
          <ViewPaste/>
      </div>
    },
  ]
);



function App() {
 

  return (
   <div className='bg-white'> 
  
   <RouterProvider router = {router}/>
   </div>
  )
}

export default App
