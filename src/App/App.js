import './App.css';
import { BrowserRouter, Routes , Route,  useLocation , Navigate } from 'react-router-dom';
import { lazy ,useState } from 'react';
import Upload from '../Pages/Upload Story/Upload';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import SignUp from '../Pages/Auth/SignUp';
import Page404 from '../Pages/NotFound/NotFound';
import Header from '../Components/Header';
import FlashMessagesList from '../Components/FlashMessagesList';
import { useSelector } from 'react-redux';

function App() {
  const flashMessages = useSelector((state) => state.flashMessages);
  return (   
      <BrowserRouter>
        <Header/>
        <FlashMessagesList messages = {flashMessages}/>
        <AppRoutes />
      </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Routes location={location}>
      <Route exact path="/" element ={ <Home/> } />
      <Route path="/home" element ={ <Home/> } />
      <Route path="/login" element ={ <Login/> } />
      <Route path="/story/upload" element ={ <Upload/> } />
      <Route path="/signup" element ={ <SignUp/> } />
      <Route path="/404" element ={ <Page404/> }/>
      <Route path="*" element ={ <Navigate to='/404' /> }/>
    </Routes>
  );
}

export default App;
