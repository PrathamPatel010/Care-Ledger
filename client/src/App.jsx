import './App.css'
import DisplayRecords from './Components/DisplayRecords'
import Healthcare from './Components/Healthcare'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Healthcare />} />
        <Route path="/records" element={<DisplayRecords/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
