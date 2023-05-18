import { useState,useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Avatar } from '@chakra-ui/react';
import { AuthContext } from '../../context/AuthContext';
import {uploadPhoto,auth} from "../../services/firebase"
import { updateEmail } from "firebase/auth";


const Profile = () => {
    const { name, setName, email, setEmail, photoURL, setPhotoURL, userID } = useContext(AuthContext);
    const [changedEmail, setChangedEmail] = useState("");
    const [showEmailInputForm, setShowEmailInputForm] = useState(false);
    const [changedPhoto, setChangedPhoto] = useState(null)


  const handleChangeName = (event) => {
    setName((prevUser) => ({ ...prevUser, name: event.target.value }));
  };

  const handleChangeEmail = (event) => {
    setChangedEmail(event)
  };
  function changeTheEmail() {
    updateEmail(auth.currentUser, changedEmail).then(() => {
      setEmail(changedEmail);
      setShowEmailInputForm(false);
    });
  }
  function handleShowEmailInputForm() {
    setShowEmailInputForm((showEmailInputForm) => !showEmailInputForm);
  }

  const handleChangeAvatar = (event) => {
    setChangedPhoto(event);
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

        <Avatar size="xl" name={name} src={photoURL} />
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input type="text" value={name} onChange={handleChangeName} />
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => handleChangeEmail(e.target.value)} />
          <Button onClick={() => changeTheEmail()} colorScheme="blue">Update Email</Button>

        </FormControl>

        <FormControl id="avatar">
          <FormLabel>Avatar</FormLabel>
          <Input type="file" onChange={(e) => handleChangeAvatar(e.target.files[0])} />
          <Button onClick={() => handleUploadPhoto(changedPhoto)} colorScheme="blue">Update Avatar</Button>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default Profile;
