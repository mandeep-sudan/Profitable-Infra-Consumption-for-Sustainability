import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Stack,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { getQueryFromPrompt } from "../utils/APICalls";

export const Assistant = () => {
  const [response, setResponse] = useState<string>(
    "Responses will be shown here"
  );
  const [prompt, setPrompt] = useState<string>("");

  const submitPrompt = () => {
    getQueryFromPrompt(prompt).then((r) => setResponse(r.data));
  };

  return (
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
          {response}
        </Box>
        <Flex
          style={{
            flexGrow: 5,
            border: "thin solid Silver",
            borderBottomLeftRadius: "1em",
            borderBottomRightRadius: "1em",
            padding: "1em",
          }}
          direction={"column"}
          justify={"space-between"}
        >
          <Textarea
            onSubmit={() => console.log("POOP")}
            variant="unstyled"
            placeholder="Type your question and press <ENTER>"
            onChange={(event) => setPrompt(event.currentTarget.value)}
            autosize
          />

          <Flex
            direction={"row-reverse"}
            style={{ position: "relative", bottom: 0 }}
          >
            <Button style={{ flexGrow: 0 }} onClick={submitPrompt}>
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};
