import { Flex } from "@chakra-ui/react";
import PropTypes from 'prop-types';

/**
 * PageContainer component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} [props.isFixedNav] - Determines if the navigation is fixed.
 * @param {ReactNode} props.children - The content to render inside the page container.
 * @returns {JSX.Element} PageContainer component.
 */

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

PageContainer.propTypes = {
  isFixedNav: PropTypes.bool,
  children: PropTypes.node.isRequired,
};