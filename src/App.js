import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Components/Header.js';
import MainPage from './Pages/MainPage.js';
import SearchPage from './Pages/SearchPage.js';
import ViewPage from './Pages/ViewPage.js';
import UserLists from './Components/UserLists.js';
import LoginPage from './Pages/LoginPage.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  //add some kind of check for user login? and then only let access to pages once login completed
  const [userLogin, setUserLogin] = useState(null);

  function validateUserLogin() {
    //add user login validation here
  }

  useEffect(() => {
    validateUserLogin();
  }, []);

  // if (!userLogin) {
  //   return (
  //     <div>
  //       <LoginPage />
  //     </div>
  //   )
  // } else {
    return (
      <div>
        <header className='headerLayout'>
          <Header />
        </header>
        <main>
          <div className='bodyContainerLayout'>
            <div className='bodyContentLayout'>
              <Routes>
                  <Route path='/' element={<MainPage />}/> 
                  <Route path='/search' element={<SearchPage />} />
                  <Route path='/search/:id' element={<ViewPage />} />
              </Routes>
            </div>
            <div className='userListsLayout'>
              <UserLists />
            </div>
          </div>
        </main>
      </div>
    );
  // }
}

export default App;
