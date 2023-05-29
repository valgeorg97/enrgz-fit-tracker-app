import { Box, Text, Image } from "@chakra-ui/react";
import gif1 from "../../assets/gif/gif1.gif";
import gif2 from "../../assets/gif/gif2.gif";
import gif3 from "../../assets/gif/gif3.gif";
import gif4 from "../../assets/gif/gif4.gif";
import gif5 from "../../assets/gif/gif5.gif";
import { useState } from "react";

const DashboardGif = () => {
  const [showText, setShowText] = useState(false);
  const [currentGif, setCurrentGif] = useState(gif1);

  const handleClick = () => {
    if (currentGif === gif1) setCurrentGif(gif2);
    else if (currentGif === gif2) setCurrentGif(gif3);
    else if (currentGif === gif3) setCurrentGif(gif4);
    else if (currentGif === gif4) setCurrentGif(gif5);
    else if (currentGif === gif5) {
      setShowText(true);
      setTimeout(() => {
        setShowText(false);
        setCurrentGif(gif1);
      }, 4000);
    } else setCurrentGif(gif1);
  };

  return (
    <Box>
      {showText ? (
        <Box
          display="flex"
          alignItems="center"
          rounded="lg"
          boxShadow="lg"
          w="390px"
          h="290px"
          bgColor="white"
          color="black"
          textAlign="center"
        >
          <Text p={10} fontSize="xl" fontWeight="bold">
            Stop clicking the gif and go do some PUSH UPS
          </Text>
        </Box>
      ) : (
        <Image
          src={currentGif}
          rounded="lg"
          boxShadow="lg"
          onClick={handleClick}
          cursor="pointer"
          alt="GIF"
          style={{ width: "390px", height: "290px" }}
        />
      )}
    </Box>
  );
};

export default DashboardGif;
