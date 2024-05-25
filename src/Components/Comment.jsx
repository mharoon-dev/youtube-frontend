import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LOCAL_URL, PROD_URL } from "../utils/urls.jsx";
import axios from "axios";
import { format } from "timeago.js";
import noAvatar from "../img/noAvatar.png";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const api = axios.create({
  baseURL: PROD_URL,
  withCredentials: true, // Ensure this is set to send cookies
});

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    try {
      const fetchChannel = async () => {
        const channelRes = await api.get(`/users/find/${comment?.userId}`);
        console.log(channelRes.data);
        setChannel(channelRes.data);
      };
      fetchChannel();
    } catch (error) {
      console.log(error);
    }
  }, [comment?.userId]);
  return (
    <Container>
      <Avatar src={channel?.img || noAvatar} />
      <Details>
        <Name>
          <b>{channel?.name}</b> 
          <Date>{format(comment?.createdAt)}</Date>
        </Name>
        <Text>{comment?.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
