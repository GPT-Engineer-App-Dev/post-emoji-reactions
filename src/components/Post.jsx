import { Box, Text, HStack, IconButton, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useReactions, useAddReaction } from '../integrations/supabase/api';
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";


const Post = ({ content, postId }) => {
  const { data: reactions, isLoading, isError } = useReactions(postId);
  const addReaction = useAddReaction();

  const handleReaction = (type) => {
    addReaction.mutate({ post_id: postId, emoji: type });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} width="100%">
      <Text mb={4}>{content}</Text>
      {isLoading && <Spinner />}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          Error fetching reactions
        </Alert>
      )}
      {reactions && (
        <HStack spacing={4}>
          <IconButton
            aria-label="Thumbs Up"
            icon={<FaThumbsUp />}
            onClick={() => handleReaction("👍")}
          />
          <Text>{reactions.filter(r => r.emoji === "👍").length}</Text>
          <IconButton
            aria-label="Heart"
            icon={<FaHeart />}
            onClick={() => handleReaction("❤️")}
          />
          <Text>{reactions.filter(r => r.emoji === "❤️").length}</Text>
          <IconButton
            aria-label="Laugh"
            icon={<FaLaugh />}
            onClick={() => handleReaction("😂")}
          />
          <Text>{reactions.filter(r => r.emoji === "😂").length}</Text>
        </HStack>
      )}
    </Box>
  );
};

export default Post;