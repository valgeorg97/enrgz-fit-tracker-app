import { Flex, Text, Icon, Link, Menu, MenuButton, MenuList, Badge } from '@chakra-ui/react'

export default function NavItem({ icon, title, description, active, navSize, link, friendRequestCount }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    href={link}
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize === "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
                            {title === "Friends" && friendRequestCount > 0 && navSize !== "small" &&(
                                <Badge
                                    color="white"
                                    fontSize="0.7em"
                                    borderRadius="full"
                                    bg="red.500"
                                    ml={5}
                                    mt={0.5}
                                    boxSize="20px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    {friendRequestCount}
                                </Badge>
                            )}
                        </Flex>

                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                </MenuList>
            </Menu>
        </Flex>
    )
}