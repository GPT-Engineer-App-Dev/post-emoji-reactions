import { Box, Flex, Heading } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box bg="brand.800" px={4} py={2} color="white" width="100%">
      <Flex alignItems="center" justifyContent="space-between">
        <Heading size="md">Post Board</Heading>
      </Flex>
    </Box>
  );
};

export default NavBar;