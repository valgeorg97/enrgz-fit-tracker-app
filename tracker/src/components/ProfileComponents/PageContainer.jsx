import { Flex } from "@chakra-ui/react";

export default function PageContainer(props) {
  return (
    <Flex
      bg="secondary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      paddingTop={props.isFixedNav ? { md: "4rem" } : "0"}
    >
      {props.children}
    </Flex>
  );
}