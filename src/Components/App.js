import '../Css/App.css';
import MainHeader from './MainHeader';
import Sidebar from './Sidebar';
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<MainHeader />}>
        </Route>
        <Route path='/' element={<Login />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
