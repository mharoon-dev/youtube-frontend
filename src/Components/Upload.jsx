import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { URL } from "../utils/urls.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadingStart,
  uploadingSuccess,
  uploadingFailure,
} from "../redux/Slices/videouploadingSlice.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border: none;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 3px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.textSoft};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});

const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const { videoUploading } = useSelector((state) => state);
  console.log(videoUploading);

  const uploadVideo = async (e) => {
    try {
      e.preventDefault(); // Prevent default form submission behavior
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("tags", tags.join(","));
      formData.append("image", img);

      const token = JSON.parse(localStorage.getItem("access_token"));
      if (!token) {
        dispatch(loginFailure());
        console.log("no token");
        return;
      }

      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      dispatch(uploadingStart());
      const res = await api.post("/videos/upload", formData, config);
      console.log(res.data);
      dispatch(uploadingSuccess());
    } catch (error) {
      console.error(error);
      dispatch(uploadingFailure(error));
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false) && console.log("close")}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        <Form
          action="/profile"
          method="post"
          enctype="multipart/form-data"
          onSubmit={uploadVideo}
        >
          <Input
            type="file"
            name="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
          <Label>Title:</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label>Description:</Label>
          <Desc
            rows={8}
            name="desc"
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Seprate the Tags with commas"
            onChange={(e) => setTags(e.target.value.split(","))}
          />
          <Label>Image:</Label>
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImg(e.target.files[0])}
          />

          <Button type="submit">
            {videoUploading.loading ? (
              <CircularProgress color="inherit" />
            ) : videoUploading.success ? (
              "Uploaded Successfully"
            ) : videoUploading.error ? (
              <RestartAltIcon />
            ) : (
              "Upload"
            )}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Upload;
