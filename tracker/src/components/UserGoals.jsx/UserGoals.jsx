import { useContext } from "react";
import { Box,Heading,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GoalContext } from '../../context/GoalContext';

const UserGoals = () => {
  const { goals } = useContext(GoalContext);
  const navigate = useNavigate()

    return (
        <Box ml={10} _hover={{ backgroundColor: "#3a9690", cursor: "pointer" }} onClick={() => navigate('/goals')} bgColor="#3a9679" boxShadow="lg" p="5" rounded="md" w="210px" h="190px" textAlign="center">
            <Heading color="white" size="md"> Goals Created </Heading>
            <Text color="white" fontSize="80px">{goals.length}</Text>
        </Box>
    )
}

export default UserGoals