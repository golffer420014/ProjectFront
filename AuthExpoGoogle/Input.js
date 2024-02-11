import React from 'react';
import { TextInput, StyleSheet } from 'react-native'

const Input = (props) => {
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
        onSubmitEditing={props.onSubmitEditing}
        placeholderTextColor="gray">
        </TextInput>
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
        paddingLeft:15,
        color:'black'
    },
});

export default Input;