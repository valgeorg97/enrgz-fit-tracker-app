/* eslint-disable react/no-children-prop */
import {Container,Avatar,Box,Text,Stack,InputGroup,Input,InputLeftElement,Icon,FormLabel,Checkbox,Button,Divider,FormControl,Heading,} from "@chakra-ui/react";
import { FaRegEnvelope, FaLock, FaRegUser,FaPhoneAlt,FaWeightHanging } from "react-icons/fa";
import PageContainer from "./PageContainer";
import PageContent from "./PageContent";
import { useState, useContext, useRef } from "react";
import { updateProfile, updateEmail, deleteUser,updatePassword } from "firebase/auth";
import { storage, auth, db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteUserDialog from "./DeleteUserDialog";
import { GiBodyHeight } from "react-icons/gi";


import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function Profile() {
  const {name,setName,password,setPassword,email,setEmail,photoURL,setPhotoURL,userID,family,setFamily,userDocID,username,setUsername,weight,setWeight,height,setHeight,phoneNumber,setPhoneNumber} = useContext(AuthContext);
  const [changedName, setChangedName] = useState("");
  const [changedUsername, setChangedUsername] = useState("");
  const [changedFamily, setChangedFamily] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedPhone, setChangedPhone] = useState("");
  const [changedPhoto, setChangedPhoto] = useState(null);
  const [changedWeight, setChangedWeight] = useState("");
  const [changedHeight, setChangedHeight] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const avatarInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const familyInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const weightInputRef = useRef(null);
  const heightInputRef = useRef(null);

  const handleChangeName = (event) => {
    setChangedName(event.target.value);
  };
  const handleChangeFamily = (event) => {
    setChangedFamily(event.target.value);
  };
  const handleChangeUsername = (event) => {
    setChangedUsername(event.target.value);
  };
  const handleChangePhone = (event) => {
    setChangedPhone(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setChangedEmail(event.target.value);
  };
  const handleChangeAvatar = (event) => {
    setChangedPhoto(event.target.files[0]);
  };
  const handleChangeWeight = (event) => {
    setChangedWeight(event.target.value);
  };
  const handleChangeHeight = (event) => {
    setChangedHeight(event.target.value);
  };
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
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
    phoneInputRef.current.value = null;
    weightInputRef.current.value = null;
    heightInputRef.current.value = null;
  };

  const updateInfo = (event) => {
    event.preventDefault();
    const userRef = doc(db, "users", userDocID);

    if(currentPassword!== password) {
      toast.error("Please input your current password to update profile");
      return;
    }
    if(newPassword && newPassword!==confirmPassword) {
      toast.error("Your changed passwords doesn't match");
      return;
    }
    if (!changedPhoto && !newPassword && !changedEmail && !changedName && !changedFamily && !changedUsername && !changedPhone && !changedWeight && !changedHeight) {
      toast.error("No information to update");
      return;
    }

    async function uploadPhoto(file, currentUser) {
      const fileRef = ref(storage, `${currentUser}.png`);
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      const changeAvatar = await updateProfile(auth.currentUser, { photoURL: photoURL });
      return photoURL;
    }
    
    if (changedPhoto) {
      uploadPhoto(changedPhoto, userID)
        .then((photoURL) => {
          setPhotoURL(photoURL);
          return updateDoc(userRef, { avatar: photoURL });
        })
        .then(() => {
          avatarInputRef.current.value = null;
        })
        .catch((error) => {
          console.error("Error updating photo:", error);
        });
    }
    

    if (changedEmail) {
      updateEmail(auth.currentUser, changedEmail).then(() => {
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
        updateDoc(userRef, { username: changedUsername })
          .then(() => {
            setUsername(changedUsername);
          })
          .catch((error) => {
            console.log("Error updating username:", error);
          });
      }
    if (changedPhone) {
      updateDoc(userRef, { phoneNumber: changedPhone })
        .then(() => {
          setPhoneNumber(changedPhone);
        })
        .catch((error) => {
          console.log("Error updating phone number:", error);
        });
    }
    if (changedName) {
      let fixname = `${changedName} ${family}`;
      updateProfile(auth.currentUser, { displayName: fixname })
        .then(() => {
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
    if (changedWeight) {
      updateDoc(userRef, { weight: changedWeight })
        .then(() => {
          setWeight(changedWeight);
        })
        .catch((error) => {
          console.log("Error updating weight:", error);
        });
    }
    if (changedHeight) {
      updateDoc(userRef, { height: changedHeight })
        .then(() => {
          setHeight(changedHeight);
        })
        .catch((error) => {
          console.log("Error updating height:", error);
        });
    }
    if (newPassword) {
      updatePassword(auth.currentUser, newPassword).then(() => {
        updateDoc(userRef, { password: newPassword })
      }).then(() => {
        setPassword(newPassword);
      })
      .catch((error) => {
        console.log("Error updating password:", error);
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
                <FormLabel htmlFor="username">Username</FormLabel>
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

              <FormControl>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftElement  children={<Icon as={FaPhoneAlt} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder={phoneNumber}
                    onChange={handleChangePhone}
                    ref={phoneInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="weight">Weight</FormLabel>
                <InputGroup>
                  <InputLeftElement  children={<Icon as={FaWeightHanging} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder={weight}
                    onChange={handleChangeWeight}
                    ref={weightInputRef}
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="height">Height</FormLabel>
                <InputGroup>
                  <InputLeftElement  children={<Icon as={GiBodyHeight} color="secondary.inputHelper" />}/>
                  <Input
                    focusBorderColor="main.500"
                    type="number"
                    name="height"
                    id="height"
                    placeholder={height}
                    onChange={handleChangeHeight}
                    ref={heightInputRef}
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
                    ref={passwordInputRef}
                    onChange={handleCurrentPassword}
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
                    onChange={handleNewPassword}
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
                    ref={passwordInputRef}
                    onChange={handleConfirmPassword}

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
