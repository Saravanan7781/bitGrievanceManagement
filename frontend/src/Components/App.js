import '../Css/App.css';
import MainHeader from './MainHeader';
import Sidebar from './admin/Sidebar';
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './admin/Home'
import InboxAdmin from './careTaker/InboxCaretaker';
import AddUser from './admin/AddUser';
import BriefReport from './careTaker/BriefReport'
import AdminHome from './admin/AdminHome';
import UserWriteForm from './user/UserWriteForm';
import UserProfile from './user/UserProfile';
import CreateUser from './admin/CreateUser';
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
            
            <AddUser />
            </>
          }
          >

        </Route>
        <Route path='/userWriteForm' element={<UserWriteForm />}  >

        </Route>

        <Route path='/adminHome' element={ <>
          <MainHeader />
          <AdminHome />
          </>
          }>
        </Route>

        <Route path='/createUser' element={ <>
          <CreateUser />
          </>
          }>
        </Route>

        <Route path='/viewReport/:id' element={ < BriefReport />} >
        </Route>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
