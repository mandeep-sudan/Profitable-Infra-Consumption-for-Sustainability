import {
  Box,
  Container,
  Flex,
  Grid,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";

export const Assistant = () => (
  <Container
    fluid
    p="1em"
    style={{ width: "100vw", position: "relative", height: "80vh" }}
  >
    <Flex direction={"column"} style={{ height: "100%" }}>
      <Box
        style={{
          flexGrow: 15,
          border: "thin solid Silver",
          borderTopLeftRadius: "1em",
          borderTopRightRadius: "1em",
          padding: "1em",
          backgroundColor: "white",
          borderBottom: 0,
        }}
      >
        A
      </Box>
      <Box
        style={{
          flexGrow: 5,
          border: "thin solid Silver",
          borderBottomLeftRadius: "1em",
          borderBottomRightRadius: "1em",
          padding: "1em",
        }}
      >
        <Textarea variant="unstyled" placeholder="Ask a question" autosize />
      </Box>
    </Flex>
  </Container>
);
