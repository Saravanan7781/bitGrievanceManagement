import '../Css/App.css';
import MainHeader from './MainHeader';
import Sidebar from './admin/Sidebar';
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './admin/Home'
import InboxAdmin from './careTaker/InboxCaretaker';
import AddUser from './admin/AddUser';
import BriefReport from './careTaker/BriefReport'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' 
        element={
          <>
        <MainHeader />
        <Home  />
        </>
        }>
        </Route>
        <Route path='/' element={<Login />}>
        </Route>

        <Route path='/inbox'
          element=
          {
            <>
              <MainHeader />
              <Sidebar />
            <InboxAdmin />
            </>
          }></Route>

          <Route path='/addUser'
          element={
            <>
            <MainHeader />
            <AddUser />
            </>
          }
          >

        </Route>
        <Route path='/viewReport' element={ < BriefReport />} >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
