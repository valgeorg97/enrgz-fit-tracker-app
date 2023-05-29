import { useContext} from "react";
import {Box,Heading,Text} from "@chakra-ui/react"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserWorkouts = () => {
  const {workouts} = useContext(AuthContext);
  const navigate = useNavigate()

      return (
        <Box _hover={{ backgroundColor: "#fabc80", cursor: "pointer" }} onClick={() => navigate('/workouts')} bgColor="#fabc60" boxShadow="lg" p="5" rounded="md" w="210px" h="190px" textAlign="center">
            <Heading color="white" size="md"> Workouts Created </Heading>
            <Text color="white" fontSize="80px">{workouts.length}</Text>
        </Box>
    )
}
export default UserWorkouts