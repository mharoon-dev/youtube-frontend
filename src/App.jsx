import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import Menu from "./Components/Menu.jsx";
import Navbar from "./Components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme.jsx";
import { useState } from "react";
import Home from "./Pages/Home.jsx";
import Video from "./Pages/Video.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn.jsx";

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

function App() {
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
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/video/:id" element={<Video />} />
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
