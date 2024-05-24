import styled, { ThemeProvider } from "styled-components";
import Menu from "./Components/Menu.jsx";
import Navbar from "./Components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme.jsx";
import { useEffect, useState } from "react";
import Home from "./Pages/Home.jsx";
import Video from "./Pages/Video.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn.jsx";
import axios from "axios";
import { LOCAL_URL } from "./utils/urls.jsx";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "./redux/Slices/userSlice.jsx";
import Cookies from "js-cookie";
import Search from "./Pages/Search.jsx";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

const api = axios.create({
  baseURL: LOCAL_URL,
  withCredentials: true,
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const isUserLoggedIn = async () => {
      const token = JSON.parse(localStorage.getItem("access_token"));
      const tokenFromCookies = Cookies.get("access_token");
      if (!token) return dispatch(loginFailure());

      dispatch(loginStart());

      try {
        dispatch(loginStart());
        const res = await api.get("/auth/isuserloggedin", {
          headers: { Authorization: `Bearer ${tokenFromCookies || token}` },
        });
        if (res.data) {
          console.log(res.data);
          dispatch(loginSuccess(res.data.data));
        }
      } catch (error) {
        console.log(error);
        dispatch(loginFailure(error));
      }
    };

    isUserLoggedIn();
  }, []);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" element={<Home type="random" />} />
                <Route path="/trend" element={<Home type="trend" />} />
                <Route path="/subscriptions" element={<Home type="sub" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/video/:id" element={<Video />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
