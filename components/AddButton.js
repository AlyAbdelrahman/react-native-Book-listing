import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddButton({ setBooks }) {
    const navigation = useNavigation();
    return (
        <View style={styles.AddNewBookButtonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Adding Book', { setBooks })}
                style={styles.button}
                activeOpacity={0.9}
            >
                <Text style={styles.buttonText}>Add new book</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    AddNewBookButtonContainer: {
        backgroundColor: 'transparent'
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