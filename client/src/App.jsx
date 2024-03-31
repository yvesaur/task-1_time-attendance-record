// import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppContextProvider } from './context/AppContext';
import Home from './pages/Home';

const App = () => {
  return (
    <AppContextProvider>
      <main id='app-routes'>
        <Router>
          <Routes>
            <Route exact path="" element={<Home />} />
          </Routes>
        </Router>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </AppContextProvider>
  )
}

export default App
