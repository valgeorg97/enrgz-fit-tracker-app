import { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack,HStack, Heading, Avatar,Text } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import { uploadPhoto, auth } from "../../services/firebase"
import { updateEmail,updateProfile } from "firebase/auth";

const Profile = () => {
  const { name,setName,email, setEmail, photoURL, userID } = useContext(AuthContext);
  const [changedName, setChangedName] = useState("");
  const [changedEmail, setChangedEmail] = useState("");
  const [changedPhoto, setChangedPhoto] = useState(null)

  const [showEmailInputForm, setShowEmailInputForm] = useState(false);
  function handleShowEmailInputForm() {
    setShowEmailInputForm((showEmailInputForm) => !showEmailInputForm);
  }
  const [showNameInputForm, setShowNameInputForm] = useState(false);
  function handleShowNameInputForm() {
    setShowNameInputForm((showNameInputForm) => !showNameInputForm);
  }
  const [showAvatarInputForm, setShowAvatarInputForm] = useState(false);
  function handleShowAvatarInputForm() {
    setShowAvatarInputForm((showAvatarInputForm) => !showAvatarInputForm);
  }


  const handleChangeName = (event) => {
    setChangedName(event.target.value);
  };
  function changeTheName() {
    updateProfile(auth.currentUser, {displayName: changedName}).then(() => {
        setName(changedName)
    })

  }



  const handleChangeEmail = (event) => {
    setChangedEmail(event.target.value);
  };
  function changeTheEmail() {
    updateEmail(auth.currentUser, changedEmail).then(() => {
      setEmail(changedEmail);
    });
  }



  const handleChangeAvatar = (event) => {
    setChangedPhoto(event.target.files[0]);
  };
  function handleUploadPhoto(changedPhoto) {
    if (changedPhoto) {
      uploadPhoto(changedPhoto, userID);
    }
  }



  return (

<Box p={4}>
  <VStack spacing={4} align="start">
    <Heading size="md">Profile</Heading>

    <Avatar size="2xl" name={name} src={photoURL} />

    <VStack spacing={2} align="start" w="100%">
      <HStack justify="space-between" w="100%">
        <Text fontSize="lg">{`Account name: ${name}`}</Text>
        <Button onClick={handleShowNameInputForm} colorScheme="blue">
          {showNameInputForm ? "Cancel" : "Change Name"}
        </Button>
      </HStack>
      {showNameInputForm && (
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" onChange={handleChangeName} />
          <Button onClick={changeTheName} colorScheme="blue" alignSelf="flex-end">
            Update Name
          </Button>
        </FormControl>
      )}
    </VStack>

    <VStack spacing={2} align="start" w="100%">
      <HStack justify="space-between" w="100%">
        <Text fontSize="lg">{`Account email: ${email}`}</Text>
        <Button onClick={handleShowEmailInputForm} colorScheme="blue">
          {showEmailInputForm ? "Cancel" : "Change Email"}
        </Button>
      </HStack>
      {showEmailInputForm && (
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" onChange={handleChangeEmail} />
          <Button onClick={changeTheEmail} colorScheme="blue" alignSelf="flex-end">
            Update Email
          </Button>
        </FormControl>
      )}
    </VStack>

    <HStack justify="flex-end" w="100%">
      <Button onClick={handleShowAvatarInputForm} colorScheme="blue">
        {showAvatarInputForm ? "Cancel" : "Change Avatar"}
      </Button>
      {showAvatarInputForm && (
        <FormControl id="avatar">
          <FormLabel>Avatar</FormLabel>
          <Input type="file" onChange={handleChangeAvatar} />
          {changedPhoto && (
            <Button onClick={() => handleUploadPhoto(changedPhoto)} colorScheme="blue">
              Update Avatar
            </Button>
          )}
        </FormControl>
      )}
    </HStack>
  </VStack>
</Box>
    
  );
};

export default Profile;
