import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const TestApi = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImagePick = () => {
    const options = {
      title: 'Select an Image',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Selected Image URI: ', response.uri);
        setSelectedImage({ uri: response.uri });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>TestApi</Text>
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={selectedImage} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default TestApi;
