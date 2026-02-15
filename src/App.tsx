import { Route, Routes } from 'react-router-dom'
import './App.css'

import Landing from './pages/LandingPage'
import ContentPage from './pages/ContentPage'
import CreateContentPage from './pages/CreateContentPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/:contentType/:category/:id' element={<ContentPage />} />
      <Route path='/create/:user_id' element={<CreateContentPage mode='edit' />} />
      <Route path='/play' element={<CreateContentPage mode='edit' />} />
    </Routes>
  )
}

export default App
