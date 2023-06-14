import { Spinner } from "@chakra-ui/react";

/**
 * Loading component.
 *
 * @component
 * @returns {JSX.Element} Loading component.
 */

const Loading = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
};

export default Loading;
