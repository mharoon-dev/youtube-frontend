import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => (props.type !== "sm" && "360px")};
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
  display: ${(props ) => props.type === "sm" && "none"};
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
  color: ${({ theme }) => theme.text};
  margin: 3px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({type}) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        />
        <Details type={type}>
          <ChannelImage type={type} src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />

          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Test Channel</ChannelName>
            <Info>100K views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
