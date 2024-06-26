import React from 'react';
import { TextInput, StyleSheet } from 'react-native'

const InputFormProduct = (props) => {
    return (
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        placeholderTextColor="gray"></TextInput>
    );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 60,
    backgroundColor: '#ffff',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    borderWidth: 2,
    borderColor: '#dfdfdf',
    color: 'black',
  },
});

export default InputFormProduct;