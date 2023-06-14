import { Container, Stack, Heading, Button } from "@chakra-ui/react";
import PropTypes from 'prop-types';

export default function PageContent({
  title = "",
  primaryAction = null,
  secondaryActions = null,
  centerContent = false,
  children,
}) {
  const actions = [
    primaryAction ? (
      <Button
        key="0"
        onClick={primaryAction.onClick}
        colorScheme="main"
        size="sm"
      >
        {primaryAction.content}
      </Button>
    ) : (
      ""
    ),
    secondaryActions
      ? secondaryActions.map((action, i) => (
          <Button
            key={i}
            onClick={action.onClick}
            colorScheme="main"
            variant="outline"
            size="sm"
          >
            {action.content}
          </Button>
        ))
      : "",
  ];

  const header =
    title || actions ? (
      <Stack direction="row" alignItems="top" marginBottom="1.5rem">
        <Heading size="lg">{title}</Heading>
        <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
          {actions}
        </Stack>
      </Stack>
    ) : (
      ""
    );
  return (
    <Container
      maxW="container.lg"
      centerContent={centerContent}
      paddingTop="1.5rem"
    >
      {header}
      {children}
    </Container>
  );
}

PageContent.propTypes = {
  title: PropTypes.string,
  primaryAction: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    content: PropTypes.node.isRequired,
  }),
  secondaryActions: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),
  centerContent: PropTypes.bool,
  children: PropTypes.node.isRequired,
};