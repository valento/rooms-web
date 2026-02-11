import { Route, Routes } from 'react-router-dom'
import './App.css'

import Landing from './pages/LandingPage'
import ContentPage from './pages/ContentPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/:contentType/:category/:id' element={<ContentPage />} />
    </Routes>
  )
}

export default App
