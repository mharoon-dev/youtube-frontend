import React from "react";
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../Components/Comments";
import Card from "../Components/Card";

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

const Recommendation = styled.div`
  flex: 2;
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
  color: ${({ theme }) => theme.textSoft};
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

const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/rMiRZ1iRC0A"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>

        <Title>Test Video</Title>
        <Details>
          <Info>100K views • 1 day ago</Info>
          <Buttons>
            <Button>
              <ThumbUpAltOutlinedIcon /> 123
            </Button>
            <Button>
              <ThumbDownAltOutlinedIcon /> Dislike{" "}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share{" "}
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save{" "}
            </Button>
          </Buttons>
        </Details>
        <Hr />

        <Channel>
          <ChannelInfo>
            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
            <ChannelDetail>
              <ChannelName>Test Channel</ChannelName>
              <ChannelCounter>200K subscribers</ChannelCounter>
              <Description>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
                similique ea architecto inventore ipsa aspernatur impedit optio,
                dignissimos accusantium beatae assumenda soluta nesciunt
                laudantium.
              </Description>
            </ChannelDetail>
          </ChannelInfo>

          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation>
    </Container>
  );
};

export default Video;
