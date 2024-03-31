// import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AppContextProvider } from './context/AppContext';
import Home from './pages/Home';
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <AppContextProvider>
      <main id='app-routes'>
        <Router>
          <Routes>
            <Route exact path="" element={<Home />} />
            <Route exact path="/account/register" element={<Register />} />
            <Route exact path="/user/:id/profile" element={<UserProfile />} />
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
