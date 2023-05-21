/* eslint-disable react/no-children-prop */
import {Container,Avatar,Box,Text,Stack,InputGroup,Input,InputLeftElement,Icon,FormLabel,Checkbox,Button,Divider,FormControl,Heading,} from "@chakra-ui/react";
import { FaRegEnvelope, FaLock, FaRegUser } from "react-icons/fa";
import PageContainer from "./PageContainer";
import PageContent from "./PageContent";
import { useState, useContext, useRef } from "react";
import { updateProfile, updateEmail, deleteUser } from "firebase/auth";
import { uploadPhoto, auth, db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteUserDialog from "./DeleteUserDialog";

export default function Profile() {
  const {name,setName,email,setEmail,photoURL,setPhotoURL,userID,family,setFamily,userDocID,username,setUsername} = useContext(AuthContext);
  const [changedName, setChangedName] = useState("");
  const [changedUsername, setChangedUsername] = useState("");
  const [changedFamily, setChangedFamily] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedPhoto, setChangedPhoto] = useState(null);
  let navigate = useNavigate();

  const avatarInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const familyInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleChangeName = (event) => {
    setChangedName(event.target.value);
  };
  const handleChangeFamily = (event) => {
    setChangedFamily(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setChangedUsername(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setChangedEmail(event.target.value);
  };
  const handleChangeAvatar = (event) => {
    setChangedPhoto(event.target.files[0]);
  };

  const handleDeleteUser = () => {
    deleteUser(auth.currentUser)
    .then(() => {
      deleteDoc(doc(db, "users", userDocID));
      toast.success("User successfully deleted !")
    })
    .then(() => {
      navigate('/login')
    }).catch((error) => {
      console.error("Error with deleting user :" + error)
    });
  }

  const handleCancel = () => {
    avatarInputRef.current.value = null;
    nameInputRef.current.value = null;
    usernameInputRef.current.value = null;
    familyInputRef.current.value = null;
    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
  };

  const updateInfo = (event) => {
    event.preventDefault();

    if (!changedPhoto && !changedEmail && !changedName && !changedFamily && !changedUsername) {
      toast.error("No information to update");
      return;
    }

    if (changedPhoto) {
      uploadPhoto(changedPhoto, userID).then(() => {
        setPhotoURL(changedPhoto);
        avatarInputRef.current.value = null;
      });
    }
    if (changedEmail) {
      updateEmail(auth.currentUser, changedEmail).then(() => {
        const userRef = doc(db, "users", userDocID);
        updateDoc(userRef, { email: changedEmail })
          .then(() => {
            setEmail(changedEmail);
          })
          .catch((error) => {
            console.log("Error updating email:", error);
          });
      });
    }
    if (changedUsername) {
        const userRef = doc(db, "users", userDocID);
        updateDoc(userRef, { username: changedUsername })
          .then(() => {
            setUsername(changedUsername);
          })
          .catch((error) => {
            console.log("Error updating username:", error);
          });
      }
    if (changedName) {
      let fixname = `${changedName} ${family}`;
      updateProfile(auth.currentUser, { displayName: fixname })
        .then(() => {
          const userRef = doc(db, "users", userDocID);
          updateDoc(userRef, { name: changedName })
            .then(() => {
              setName(changedName);
            })
            .catch((error) => {
              console.log("Error updating name:", error);
            });
        })
        .catch((error) => {
          console.log("Error updating profile:", error);
        });
    }
    if (changedFamily) {
      let fixfamily = `${name} ${changedFamily}`;
      updateProfile(auth.currentUser, { displayName: fixfamily })
        .then(() => {
          const userRef = doc(db, "users", userDocID);
          updateDoc(userRef, { family: changedFamily })
            .then(() => {
              setFamily(changedFamily);
            })
            .catch((error) => {
              console.log("Error updating family:", error);
            });
        })
        .catch((error) => {
          console.log("Error updating profile:", error);
        });
    }
    toast.success("User information updated !")
  };

  return (
    <PageContainer isFixedNav>
      <PageContent centerContent={true}>
        <Container maxW="container.sm">
          <Heading marginBottom="1.5rem">Edit profile</Heading>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Avatar size="2xl" name={name} src={photoURL} />
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <FormLabel htmlFor="name">Your first name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={ <Icon as={FaRegUser} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="name"
                    id="name"
                    placeholder={name}
                    onChange={handleChangeName}
                    ref={nameInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="family">Your family name</FormLabel>
                <InputGroup>
                  <InputLeftElement  children={<Icon as={FaRegUser} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="family"
                    id="family"
                    placeholder={family}
                    onChange={handleChangeFamily}
                    ref={familyInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="family">Username</FormLabel>
                <InputGroup>
                  <InputLeftElement  children={<Icon as={FaRegUser} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="text"
                    name="username"
                    id="username"
                    placeholder={username}
                    onChange={handleChangeUsername}
                    ref={usernameInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<Icon as={FaRegEnvelope} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={email}
                    onChange={handleChangeEmail}
                    ref={emailInputRef}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
            <Stack justifyContent="space-between" isInline marginBottom="1rem">
              <Stack isInline>
                <Checkbox
                  size="md"
                  fontWeight="500"
                  colorScheme="main"
                  name="subscribe"
                  id="subscribe"
                >
                  Receive newsletter
                </Checkbox>
              </Stack>
            </Stack>
          </Box>

          <Stack spacing={0} marginTop="2rem" marginBottom="1rem">
            <Heading as="h4" size="md">
              Security settings
            </Heading>
            <Text color="gray.500" fontSize="md">
              Update your password
            </Text>
          </Stack>

          <Box bg="secondary.card" rounded="lg" p={5}>
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="old_password">Current password</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement children={ <Icon as={FaLock} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    name="old_password"
                    id="old_password"
                    type="password"
                    placeholder="Enter your current password"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_password">New password</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement children={ <Icon as={FaLock} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    name="new_password"
                    id="new_password"
                    type="password"
                    placeholder="Enter your new password"
                    ref={passwordInputRef}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_password2">
                    Confirm new password
                  </FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement children={ <Icon as={FaLock} color="secondary.inputHelper" /> }/>
                  <Input
                    focusBorderColor="main.500"
                    name="new_password2"
                    id="new_password2"
                    type="password"
                    placeholder="Confirm your new password"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Stack justifyContent="space-between" isInline>
                  <FormLabel htmlFor="new_avatar">Upload new avatar</FormLabel>
                </Stack>
                <InputGroup>
                  <InputLeftElement children={ <Icon as={FaLock} color="secondary.inputHelper" /> }/>
                  <Input
                    focusBorderColor="main.500"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeAvatar}
                    ref={avatarInputRef}
                  />
                </InputGroup>
              </FormControl>
            </Stack>
          </Box>

          <Stack
            direction={["column", "row"]}
            spacing="1rem"
            justify="end"
            marginTop="2rem"
          >
            <Button
              type="submit"
              colorScheme="main"
              variant="outline"
              onClick={updateInfo}
            >
              Update settings
            </Button>
            <Button colorScheme="main" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
          <Divider
            marginTop="2rem"
            marginBottom="2rem"
            orientation="horizontal"
          />
          <Box bg="secondary.card" rounded="lg" p={5} marginBottom="2rem">
            <Stack spacing={0} marginBottom="1rem">
              <Heading as="h4" size="md">
                Danger zone
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Delete your account and data
              </Text>
            </Stack>
            <Stack spacing={4} marginBottom="1rem">
            <DeleteUserDialog handleDeleteUser={handleDeleteUser} />
            </Stack>
            <ToastContainer />
          </Box>
        </Container>
      </PageContent>
    </PageContainer>
  );
}
