import { useContext,useState,useEffect } from "react";
import { Box, Button, Text, Tooltip,Spinner, Avatar, FormControl, FormLabel, Input, Select, Flex, Td, Th, Tbody, Thead, Table, Tr, Grid, GridItem } from "@chakra-ui/react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { BsFillPersonCheckFill, BsFillPersonPlusFill, BsFillPersonXFill, BsFillPersonBadgeFill, } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import { MdFlashOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommunityLogic from "../../logic/CommunityLogic/CommunityLogic";
import goalheader from "../../assets/goal.png";

/**
 * Renders the Community component.
 */
const Community = () => {
  const { userDocID, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const {
    userList,
    searchTerm,
    searchType,
    sortConfig,
    bg,
    handleSearchTermChange,
    handleSearchTypeChange,
    handleDeleteUser,
    handleBlockUser,
    handleUnblockUser,
    handleFriendRequest,
    handleCancelFriendRequest,
    onSort
  } = CommunityLogic()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <Box w="1560px">
      <Grid templateColumns="repeat(1, 1fr)" h="700px">

        <GridItem colSpan={1} rounded="md" borderColor="gray.50" h="140px" w="1600px" bgImage={goalheader} p={8} />

        <GridItem colSpan={1} bgColor={bg}>
          <FormControl mb={4}>
            <FormLabel
              htmlFor="searchType"
              fontWeight="bold"
              fontSize="sm"
              mb={2}
            >
              Search by:
            </FormLabel>
            <Select
              id="searchType"
              value={searchType}
              onChange={handleSearchTypeChange}
              bg="bg"
            >
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="email">Email</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="searchTerm"
              fontWeight="bold"
              fontSize="sm"
              mb={2}
            >
              Search term:
            </FormLabel>
            <Input
              className="inputt"
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={handleSearchTermChange}
              bg={bg}
              borderRadius="sm"
              borderColor="gray.300"
              _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              _placeholder={{ color: "gray.400" }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <Table variant="simple" mb={"56"}>
          <Thead>
            <Tr>
              <Th onClick={() => onSort('name')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'name' ? 'blue.500' : 'black'}>{'Name '}{sortConfig?.field === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('energizePoints')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'energizePoints' ? 'blue.500' : 'black'}>{'Energize Points '}{sortConfig?.field === 'energizePoints' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('username')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'username' ? 'blue.500' : 'black'}>{'Username '}{sortConfig?.field === 'username' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('email')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'email' ? 'blue.500' : 'black'}>{'Email '}{sortConfig?.field === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('role')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'role' ? 'blue.500' : 'black'}>{'Role '}{sortConfig?.field === 'role' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('phoneNumber')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'phoneNumber' ? 'blue.500' : 'black'}>{'Phone '}{sortConfig?.field === 'phoneNumber' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
              <Th onClick={() => onSort('isBlocked')} _hover={{ cursor: "pointer" }} color={sortConfig?.field === 'isBlocked' ? 'blue.500' : 'black'}>{'Status '}{sortConfig?.field === 'isBlocked' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}</Th>
            </Tr>
          </Thead>
          {isLoading ? (
            <Box ml="700px" mt="200px" display="flex" justifyContent="center" alignItems="center" height="70%">
            <Spinner size="xl" />
          </Box>
          ) : (
            <Tbody>
              {userList.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Flex align="center">
                      <Avatar
                        size="sm"
                        src={user.avatar}
                        _hover={{ cursor: "pointer" }}
                      />
                      <Text ml="2">
                        {user.name} {user.family}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Tooltip
                        hasArrow
                        arrowSize={10}
                        bg="orange.500"
                        borderRadius={10}
                        label="Energize points! You can earn Energize points by completing your goals. Click to learn more."
                        fontSize="md"
                      >
                        <Button display="flex" flexDirection="row" variant="unstyled" onClick={() => navigate('/energizeConquest')}>
                          <Icon as={MdFlashOn} boxSize="4" color="orange.500" />
                          <Text ml={1}>{user.energizePoints}</Text>
                        </Button>
                      </Tooltip>
                    </Flex>
                  </Td>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td>{user.isBlocked ? "Blocked" : "Not Blocked"}</Td>

                  <Td>
                    {user.friends &&
                      user.friends.find(
                        (friend) => friend.userDocID === userDocID
                      ) ? (
                      <Tooltip label="Friend">
                        <Button
                          className="friends"
                          size="md"
                          variant="ghost"
                          colorScheme="green"
                        >
                          <Flex align="center">
                            <BsFillPersonCheckFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    ) : user.requests &&
                      user.requests.find(
                        (request) => request.userDocID === userDocID
                      ) ? (
                      <Tooltip label="Cancel Friend Request">
                        <Button
                          className="cancelrequest"
                          onClick={() => handleCancelFriendRequest(user.id)}
                          size="md"
                          variant="ghost"
                          colorScheme="red"
                        >
                          <Flex align="center">
                            <BsFillPersonXFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    ) : user.docID === userDocID ? (
                      <Tooltip label="You">
                        <Button
                          className="reddotbutton"
                          size="md"
                          variant="ghost"
                          colorScheme="orange"
                        >
                          <Flex align="center">
                            <BsFillPersonBadgeFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip label="Send Friend Request">
                        <Button
                          className="friendrequest"
                          onClick={() => handleFriendRequest(user.id)}
                          size="md"
                          variant="ghost"
                          colorScheme="linkedin"
                        >
                          <Flex align="center">
                            <BsFillPersonPlusFill />
                          </Flex>
                        </Button>
                      </Tooltip>
                    )}
                  </Td>
                  {isAdmin && (<>
                    <Td>
                      <Tooltip label="Delete User">
                        <Button
                          className="deleteuser"
                          onClick={() => handleDeleteUser(user.id)}
                          size="lg"
                          variant="ghost"
                          colorScheme="red"
                          p={1}
                        >
                          <Flex align="center">
                            <MdDeleteForever />
                          </Flex>
                        </Button>
                      </Tooltip>
                    </Td>
                    <Td>
                      {user.isBlocked ? (
                        <Tooltip label="Unblock User">
                          <Button
                            className="unblockuser"
                            onClick={() => handleUnblockUser(user.id)}
                            size="md"
                            variant="ghost"
                            colorScheme="red"
                          >
                            <Flex align="center">
                              <AiFillLock />
                            </Flex>
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip label="Block User">
                          <Button
                            className="blockuser"
                            onClick={() => handleBlockUser(user.id)}
                            size="md"
                            variant="ghost"
                            colorScheme="green"
                          >
                            <Flex align="center">
                              <AiFillUnlock />
                            </Flex>
                          </Button>
                        </Tooltip>
                      )}
                    </Td>
                  </>
                  )}

                </Tr>
              ))}
            </Tbody>
)}
            
          </Table>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Community;
