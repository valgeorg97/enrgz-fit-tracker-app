import {Flex,FormControl,FormLabel,Input,Checkbox,Stack,Link,Button,Heading,Text,useColorModeValue,Box,} from '@chakra-ui/react';
import { Link as RouterLink, Link as ChakraLink,useNavigate } from "react-router-dom";
import { auth } from "../../../services/firebase";
import { AuthContext }  from "../../../context/AuthContext";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useContext} from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

  const { setIsLoggedIn, email, setEmail, password, setPassword } = useContext(AuthContext);
  // const [user, setUser] = useState("{}")
  let navigate = useNavigate();

  // onAuthStateChanged(auth, (currentUser) =>{
  //   setUser(currentUser)
  // })

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          toast.error("Incorrect email or password! Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       localStorage.setItem("isAuth", true);
  //       setIsLoggedIn(true);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <form onSubmit={signIn}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Box>
                  <Text align={'center'}>
                    Don't have an account?{" "}
                    <RouterLink to="/register">
                      <Link  to={"/register"} color={'blue.400'}>Register now !</Link>
                    </RouterLink>
                  </Text>
                </Box>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
      <ToastContainer
        position="top-center"
        toastStyle={{
          position: 'relative',
          top: '40%',
          left: '30%',
          marginTop: '-10px',
        }}
      />
    </Flex>
  );
}

export default Login;