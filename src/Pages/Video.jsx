import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../Components/Comments";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { dislike, fetchSuccess, like } from "../redux/Slices/videoSlice.jsx";
import noAvatar from "../img/noAvatar.png";
import { subscription } from "../redux/Slices/userSlice.jsx";
import Recommendation from "../Components/Recommendation.jsx";
import { URL } from "../utils/urls.jsx";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  justify-content: space-between;
  gap: 1px;
  margin-top: 10px;
`;

const ChannelName = styled.span`
  font-weight: 500;

  &:hover {
    color: ${({ theme }) => theme.textSoft};
  }
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f40612;
  }
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const api = axios.create({
  baseURL: URL,
  withCredentials: true, // Ensure this is set to send cookies
});

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (path) {
          const videoRes = await api.get(`/videos/find/${path}`);
          console.log(videoRes.data);
          const channelId = videoRes.data.userId;
          if (channelId) {
            const channelRes = await api.get(`/users/find/${channelId}`);
            console.log(channelRes.data);
            setChannel(channelRes.data);
            dispatch(fetchSuccess(videoRes.data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [path, dispatch]);

  // like handler
  const handleLike = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (!token) return dispatch(loginFailure()) && console.log("no token");
      const config = {
        headers: { authorization: `Bearer ${token}` }
      };
      await api.put(`/users/like/${currentVideo._id}`, {}, config);
      console.log("liked");
      dispatch(like(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  // dislike handler
  const handleDislike = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (!token) return dispatch(loginFailure()) && console.log("no token");
      const config = {
        headers: { authorization: `Bearer ${token}` }
      };
      await api.put(`/users/dislike/${currentVideo._id}`, {}, config);
      console.log("disliked");
      dispatch(dislike(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  // subscribe handler
const handleSub = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("access_token"));
    if (!token) return dispatch(loginFailure()) && console.log("no token");
    const config = {
      headers: { authorization: `Bearer ${token}` }
    };
    const endpoint = currentUser.subscribedUsers.includes(channel._id) 
      ? `/users/unsub/${channel._id}`
      : `/users/sub/${channel._id}`;
    await api.put(endpoint, {}, config);
    dispatch(subscription(channel._id));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            src={currentVideo?.videoUrl}
            autoPlay
            controls
          ></VideoFrame>
        </VideoWrapper>

        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpAltOutlinedIcon />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownAltOutlinedIcon />
              )}
              {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />

        <Channel>
          <ChannelInfo>
            <Image src={channel.img || noAvatar} alt={channel.name} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>

          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
