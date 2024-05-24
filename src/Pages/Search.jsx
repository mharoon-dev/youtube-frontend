import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LOCAL_URL } from '../utils/urls.jsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from '../Components/Card.jsx';

const Container = styled.div`
    
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

const api = axios.create({
    baseURL: LOCAL_URL,
    withCredentials: true
  });

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const res = await api.get(`/videos/search${query}`);
          console.log(res.data);
          setVideos(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchVideos();
    }, [query]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Search