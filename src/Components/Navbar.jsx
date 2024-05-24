import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"; // Changed import
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Upload from "./Upload.jsx";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
  `;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #3ea6ff;
  padding: 5px 15px;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Navbar = ( { theme}) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Changed from redirect to useNavigate

  const handleClick = () => {
    console.log("Search button clicked");
    console.log(q);
    navigate(`/search?q=${q}`); // Using navigate to redirect
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search theme={theme} >
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={handleClick} /> {/* Removed arrow function */}
          </Search>
          {currentUser ? (
            <User>
              <VideoCallIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
              />
              <Avatar />
              {currentUser?.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>

      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
