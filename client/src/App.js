import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Admin from "./components/Admin";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { authState } from "./store/authState";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <>
      <RecoilRoot>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BrowserRouter>
          <InitState />
          <Routes>
            <Route
              path="/login"
              element={
                <Homepage>
                  <Login />
                </Homepage>
              }
            />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
};

const InitState = () => {
  const base_url = "http://localhost:5002";
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const init = async () => {
    const token = localStorage.getItem("token");
    try {
      var config = {
        method: "GET",
        url: `${base_url}/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios(config);
      setAuth({ token: res.data.token, user: res.data.user });
      navigate("/admin");
    } catch (e) {
      navigate("/login");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
};

export default App;
