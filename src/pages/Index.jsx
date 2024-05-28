import { Container, VStack, Input, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Post from "../components/Post";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <Box>
      <NavBar />
      <Container maxW="container.md" py={4}>
        <VStack spacing={4}>
          <Input
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={handlePost} colorScheme="blue">
            Post
          </Button>
          {posts.map((post, index) => (
            <Post key={index} content={post} />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;