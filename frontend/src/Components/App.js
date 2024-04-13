import '../Css/App.css';
import MainHeader from './MainHeader';
import Sidebar from './Sidebar';
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'
import InboxAdmin from './InboxAdmin';
import AddUser from './AddUser';

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
      </Routes>
    </Router>
  );
}

export default App;
