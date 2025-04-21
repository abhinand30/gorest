import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {   createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import NotFound from './pages/NotFound.tsx'
import AddUserPage from './pages/AddUserPage.tsx'


const router=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>,
    errorElement:<NotFound/>
  },
  {
    path:'/adduser',
    element:<AddUserPage/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
