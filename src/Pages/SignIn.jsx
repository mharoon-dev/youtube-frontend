import React, { useState } from "react";
import styled from "styled-components";
import { LOCAL_URL } from "../utils/urls.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/Slices/userSlice.jsx";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 56px);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;

  a {
    margin-left: 30px;
  }
`;

const Link = styled.span`
  font-weight: 500;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const api = axios.create({
  baseURL: LOCAL_URL,
  withCredentials: true,
});

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await api.post("/auth/signin", {
        name,
        password,
      });
      console.log(res.data);
      dispatch(loginSuccess(res.data.data));
      Cookies.set("access_token", res.data.token,);
    } catch (error) {
      console.log(error);
      dispatch(loginFailure(error));
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>To continue to Youtube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>OR</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign Up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
          <Link>Setting</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
