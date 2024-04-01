import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Fetch from "../api/Fetch";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);

  /*
  async function getCurrentUserId() {
    try {
      const response = await Fetch.get("")
    } catch (error) {
      console.error(error.message);
    }
  }
  */

  useEffect(() => {
    const fetchCurrentUserInfo = async () => {
      try {
        if (localStorage.username && localStorage.token) {
          const userInfoResponse = await Fetch.get(`/auth/user/${localStorage.username}`, {
            headers: {
              token: localStorage.token
            }
          })
          setCurrentUserInfo(userInfoResponse.data.data)
        }
      } catch (error) {
        console.error(error.message)
      }
    };
    fetchCurrentUserInfo()
  }, [isAuthenticated])


  const notifySuccess = (text) =>
    toast.success(text, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (text) =>
    toast.error(text, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  }

  async function isAuth() {
    try {
      const response = await Fetch.get("/auth/isAuthorized", {
        headers: {
          token: localStorage.token,
        },
      });

      response.data.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <AppContext.Provider
      value={{
        notifySuccess,
        notifyError,
        isAuth,
        setAuth,
        isAuthenticated,
        setIsAuthenticated,
        currentUserInfo,
        setCurrentUserInfo
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
