import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment.jsx";
import { URL } from "../utils/urls.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import noAvatar from "../img/noAvatar.png";

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

const api = axios.create({
  baseURL: URL,
  withCredentials: true, // Ensure this is set to send cookies
});

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await api.get(`/comments/${videoId}`);
      console.log(res.data);
      setComments(res.data);
    };
    fetchComments();
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img ? currentUser?.img : noAvatar} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
