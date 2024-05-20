import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import { LOCAL_URL } from "../utils/urls.jsx";
import noAvatar from "../img/noAvatar.png";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: "100%";
  height: ${(props) => (props.type === "sm" ? "100px" : "202px")};
  background-color: #999;
  cursor: pointer;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  gap: 12px;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  font-size: 12px;
  cursor: pointer;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  object-fit: cover;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 3px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const api = axios.create({
  baseURL: LOCAL_URL,
});

const Card = ({ type, video }) => {
  console.log("video", video);
  const [channel, setChannel] = useState({});

  useEffect(() => {
    // console.log("fetching videos");
    const fetchChannel = async () => {
      try {
        const res = await api.get(`/users/find/${video.userId}`);
        if (res.data) {
          console.log(res.data);
          setChannel(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl} />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img || noAvatar}
          />

          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
