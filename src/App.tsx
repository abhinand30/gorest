
// import './App.css'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddUserPage from './pages/AddUserPage'



function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/adduser' element={<AddUserPage/>}/>
    </Routes>
  
  )
}

export default App
