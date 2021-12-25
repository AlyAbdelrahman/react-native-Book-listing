import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { BG_IMAGE_URL, SPACING, INPUT_FIELD_HEIGHT, TITLE_FIELD, DESCRIPTION_FIELD, THUMBNAIL_FIELD, PUBLISHED_DATE_FIELD } from '../../helpers/constants';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import DatePickerCalender from '../../components/DatePicker';

export default function AddingBooks(props) {
    const [formFields, setFormFields] = useState({ key: uuidv4() });
    const [formErrors, setFormErrors] = useState([]);
    const [pickedImagePath, setPickedImagePath] = useState('');
    const navigation = useNavigation();
    const { route } = props
    const handleChange = (field, value) => {
        let formFieldCopy = { ...formFields };
        let formErrorsCopy = { ...formErrors };
        formFieldCopy[field] = value;
        formErrorsCopy[field] = false;
        setFormErrors(formErrorsCopy);
        setFormFields(formFieldCopy);
    }
    const handleTimePicker = (value) => {
        let formFieldCopy = { ...formFields };
        let formErrorsCopy = { ...formErrors };
        formErrorsCopy['publishedDate'] = false;
        formFieldCopy['publishedDate'] = value;
        setFormErrors(formErrorsCopy);
        setFormFields(formFieldCopy);
    }
    const handleValidation = () => {
        console.log('>>form', formFields)
        let isFourmCorrect = true;
        let errors = { ...formErrors };
        let formIsValid = true;
        //Title
        if (!formFields[TITLE_FIELD] || formFields[TITLE_FIELD].trim() === '') {
            formIsValid = false;
            errors[TITLE_FIELD] = "Book title is required";
        }
        //Description
        if (!formFields["description"] || formFields["description"].trim() === '') {
            formIsValid = false;
            errors["description"] = "Book description is required";
        }
        // published Date
        if (!formFields["publishedDate"] || formFields["publishedDate"].trim() === '') {
            formIsValid = false;
            errors["publishedDate"] = "Book publishedDate is required";
        }
        if (!formFields["thumbnail"] || formFields["thumbnail"].trim() === '') {
            formIsValid = false;
            errors["thumbnail"] = "Book thumbnail is required";
        }
        setFormErrors(errors);
        isFourmCorrect = Object.entries(errors).every(fieldError => fieldError[1] === false);
        if (isFourmCorrect) {
            route.params.setBooks((oldVal) => [...oldVal, formFields]);
            navigation.navigate('Books list')
        }

    }
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            handleChange('thumbnail', result.uri)
        }
    }
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            handleChange('thumbnail', result.uri)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.AddingBookContainer}>
                <Image
                    source={{ uri: BG_IMAGE_URL }}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={80}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.formContainer}>
                        <Text style={styles.inputTitle}>Book Title </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => handleChange(TITLE_FIELD, value)}
                            value={formFields[TITLE_FIELD]}
                            placeholder="please enter book title"
                        />
                        {formErrors[TITLE_FIELD] && <Text style={styles.errorMessage}>{formErrors[TITLE_FIELD]}</Text>}

                        <Text style={styles.inputTitle}>Book Description </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => handleChange('description', value)}
                            value={formFields['description']}
                            placeholder="please enter book description"
                            multiline
                        />
                        {formErrors['description'] && <Text style={styles.errorMessage}>{formErrors['description']}</Text>}

                        <Text style={styles.inputTitle}>Book published date </Text>
                        <DatePickerCalender handleSelectedDate={handleTimePicker} handleChange={handleChange} dateValue={formFields["publishedDate"]} />
                        {formErrors['publishedDate'] && <Text style={styles.errorMessage}>{formErrors['publishedDate']}</Text>}

                        <Text style={styles.inputTitle}>Book thumbnail </Text>
                        <View style={styles.imageContainer}>
                            {
                                pickedImagePath !== '' && (formFields['thumbnail'] === pickedImagePath) && <Image
                                    source={{ uri: pickedImagePath || formFields['thumbnail'] }}
                                    style={styles.image}
                                />
                            }
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => handleChange('thumbnail', value)}
                            value={formFields['thumbnail']}
                            placeholder="please enter book thumbnail url or choose "
                        />
                        {formErrors['thumbnail'] && <Text style={styles.errorMessage}>{formErrors['thumbnail']}</Text>}

                        <View style={styles.uploadImageOptionsContainer}>
                            <TouchableOpacity onPress={showImagePicker} style={styles.uploadImageButton} >
                                <Text styles={styles.uploadImageButtonText}>Select an image</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={openCamera} title="Open camera" style={styles.uploadImageButton}>
                                <Text styles={styles.uploadImageButtonText}>Open camera</Text>
                            </TouchableOpacity>
                        </View>

                        <Button onPress={handleValidation} title='submit' color="red" />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    AddingBookContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        padding: SPACING
    },
    inputTitle: {
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 4,
        marginTop: 20,
        color: 'black'
    },
    input: {
        height: INPUT_FIELD_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        fontSize: 15,
        paddingLeft: 10,
    },
    errorMessage: {
        fontSize: 12,
        fontWeight: '300',
        color: 'red'
    },
    imageContainer: {
        overflow: 'hidden',
    },
    image: {
        width: 400,
        height: 300,
        resizeMode: 'cover'
    },
    uploadImageOptionsContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    uploadImageButton: {
        width: '50%',
        height: 40,
        backgroundColor: 'grey',
        margin: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
    },


})