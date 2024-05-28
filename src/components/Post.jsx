import { Box, Text, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";
import { useState } from "react";

const Post = ({ content }) => {
  const [reactions, setReactions] = useState({ thumbsUp: 0, heart: 0, laugh: 0 });

  const handleReaction = (type) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [type]: prevReactions[type] + 1,
    }));
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} width="100%">
      <Text mb={4}>{content}</Text>
      <HStack spacing={4}>
        <IconButton
          aria-label="Thumbs Up"
          icon={<FaThumbsUp />}
          onClick={() => handleReaction("thumbsUp")}
        />
        <Text>{reactions.thumbsUp}</Text>
        <IconButton
          aria-label="Heart"
          icon={<FaHeart />}
          onClick={() => handleReaction("heart")}
        />
        <Text>{reactions.heart}</Text>
        <IconButton
          aria-label="Laugh"
          icon={<FaLaugh />}
          onClick={() => handleReaction("laugh")}
        />
        <Text>{reactions.laugh}</Text>
      </HStack>
    </Box>
  );
};

export default Post;