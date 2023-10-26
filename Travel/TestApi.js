import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// permission
import { request, PERMISSIONS } from 'react-native-permissions';

export default function TestApi() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.CAMERA);
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA);
      request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
