import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomeScreen from './components/HomeScreen';
import Gallery from './components/Gallery';
import Upload from './components/Upload';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/Upload' element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
