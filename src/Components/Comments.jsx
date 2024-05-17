import React from "react";
import styled from "styled-components";
import Commentx from "./Comment";
import Comment from "./Comment";

const Container = styled.div`
  padding: 20px;
  margin: 20px 0px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const NewComment = styled.div`
  display: flex;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
  font-size: 14px;

  &::placeholder {
    color: ${({ theme }) => theme.soft};
  }
`;

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        <Input placeholder="Add a comment..." />
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />

    </Container>
  );
};

export default Comments;
