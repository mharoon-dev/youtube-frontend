import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Components/Card.jsx";
import axios from "axios";
import { URL } from "../utils/urls.jsx";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const api = axios.create({
  baseURL: URL,
  withCredentials: true
});
const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("access_token"));
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const res = await api.get(`/videos/${type}`, config);
        if (res.data) {
          setVideos(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
