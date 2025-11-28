import './App.css'
import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/HomePage'
import './Pages/HomePage.css'
import './Pages/header.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
    </Routes>
  )
}

export default App
