import { Container, VStack, Input, Button, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { usePosts, useAddPost } from '../integrations/supabase/api';
import { useState } from "react";
import NavBar from "../components/NavBar";
import Post from "../components/Post";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const [newPost, setNewPost] = useState("");

  const addPost = useAddPost();

  const handlePost = () => {
    if (newPost.trim() !== "") {
      addPost.mutate({ title: newPost, body: newPost });
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
          {isLoading && <Spinner />}
          {isError && (
            <Alert status="error">
              <AlertIcon />
              Error fetching posts
            </Alert>
          )}
          {posts && posts.map((post) => (
            <Post key={post.id} content={post.body} />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;