import '../Css/App.css';
import MainHeader from './MainHeader';
import Sidebar from './Sidebar';
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'
import UserWriteForm from './UserWriteForm';
import UserWriteForm2 from './UserWriteForm2';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path='/home' 
    //     element={
          <>
        <MainHeader />
        <UserWriteForm2  />
        </>
    //     }>
    //     </Route>
    //     <Route path='/' element={<Login />}>
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
