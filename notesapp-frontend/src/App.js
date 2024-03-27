import './App.css'
import Create from './components/create'
import Read from './components/read'
import Update from './components/update'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// react routing used in app function

function App() {

  return (
    <div className="main">
      <h2 className="main-header">My Notes</h2>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<Read />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;