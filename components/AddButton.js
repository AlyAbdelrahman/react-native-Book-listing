import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { ADD_BOOK_PAGE } from '../helpers/constants'

export default function AddButton({ setBooks }) {
    const navigation = useNavigation();
    return (
        <View style={styles.AddNewBookButtonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate(ADD_BOOK_PAGE, { setBooks })}
                style={styles.button}
                activeOpacity={0.9}
            >
                <Text style={styles.buttonText}>Add new book</Text>
            </TouchableOpacity>
        </View>
    )
}
AddButton.propTypes = {
    setBooks: PropTypes.func.isRequired
}
const styles = StyleSheet.create({
    AddNewBookButtonContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    buttonText: {
        fontSize: 20,
        color: 'white'
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#273365',
    },
})