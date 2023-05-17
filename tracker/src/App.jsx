import * as React from "react"
import Navigation from "./components/Navigation/Navigation"; 
import { ChakraProvider, Box, Button} from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <Navigation />
      <div className="content">
      
    </div>
    </ChakraProvider>
  )
}

export default App;
