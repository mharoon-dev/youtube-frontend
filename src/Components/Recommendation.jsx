import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { URL } from "../utils/urls.jsx";
import axios from "axios";
import Card from "./Card.jsx";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 2;
`;

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get(`/videos/tags?tags=${tags}`);
        console.log(res.data);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
          <Card type="sm" key={video._id} video={video} />
        </Link>
      ))}
    </Container>
  );
};

export default Recommendation;
