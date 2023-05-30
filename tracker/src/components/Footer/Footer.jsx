import {Box,Text} from '@chakra-ui/react'

const Footer = () => {
    return (
        <Box position="absolute" textAlign="center" bottom="-6px">
            <Text mb="20px" fontWeight="500" bgColor="rgba(255, 255, 255, 0)">&copy; ENERGISE Fitness Tracker {new Date().getFullYear()}</Text>
        </Box>
    )
}

export default Footer;