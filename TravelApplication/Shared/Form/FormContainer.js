import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    title: {
        fontSize: 30,
    }
})

export default FormContainer;