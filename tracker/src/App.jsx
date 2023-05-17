import * as React from "react"
import { ChakraProvider, Box, Button} from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <div className="content">
      <Box>
      <Button colorScheme="teal">Опа</Button>
    </Box>
    </div>
    </ChakraProvider>
  )
}

export default App;
