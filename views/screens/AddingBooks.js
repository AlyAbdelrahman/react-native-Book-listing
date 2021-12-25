import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { BG_IMAGE_URL, SPACING, INPUT_FIELD_HEIGHT, TITLE_FIELD, DESCRIPTION_FIELD, THUMBNAIL_FIELD, PUBLISHED_DATE_FIELD, BOOKS_LIST_PAGE } from '../../helpers/constants';
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
        formErrorsCopy[PUBLISHED_DATE_FIELD] = false;
        formFieldCopy[PUBLISHED_DATE_FIELD] = value;
        setFormErrors(formErrorsCopy);
        setFormFields(formFieldCopy);
    }
    const handleValidation = () => {
        let isFourmCorrect = true;
        let errors = { ...formErrors };
        let requiredValidationsFields = [TITLE_FIELD, DESCRIPTION_FIELD, PUBLISHED_DATE_FIELD, THUMBNAIL_FIELD];
        requiredValidationsFields.map((requiredField)=>{
            if (!formFields[requiredField] || formFields[requiredField].trim() === '') {
                errors[requiredField] = `Book ${requiredField} is required`;
            }
        })
        setFormErrors(errors);
        isFourmCorrect = Object.entries(errors).every(fieldError => fieldError[1] === false);
        if (isFourmCorrect) {
            route.params.setBooks((oldVal) => [...oldVal, formFields]);
            navigation.navigate(BOOKS_LIST_PAGE)
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
        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            handleChange(THUMBNAIL_FIELD, result.uri)
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
        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            handleChange(THUMBNAIL_FIELD, result.uri)
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
                            onChangeText={(value) => handleChange(DESCRIPTION_FIELD, value)}
                            value={formFields[DESCRIPTION_FIELD]}
                            placeholder="please enter book description"
                            multiline
                        />
                        {formErrors[DESCRIPTION_FIELD] && <Text style={styles.errorMessage}>{formErrors[DESCRIPTION_FIELD]}</Text>}

                        <Text style={styles.inputTitle}>Book published date </Text>
                        <DatePickerCalender handleSelectedDate={handleTimePicker} handleChange={handleChange} dateValue={formFields[PUBLISHED_DATE_FIELD]} />
                        {formErrors[PUBLISHED_DATE_FIELD] && <Text style={styles.errorMessage}>{formErrors[PUBLISHED_DATE_FIELD]}</Text>}

                        <Text style={styles.inputTitle}>Book thumbnail </Text>
                        <View style={styles.imageContainer}>
                            {
                                pickedImagePath !== '' && (formFields[THUMBNAIL_FIELD] === pickedImagePath) && <Image
                                    source={{ uri: pickedImagePath || formFields[THUMBNAIL_FIELD] }}
                                    style={styles.image}
                                />
                            }
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => handleChange(THUMBNAIL_FIELD, value)}
                            value={formFields[THUMBNAIL_FIELD]}
                            placeholder="please enter book thumbnail url or choose "
                        />
                        {formErrors[THUMBNAIL_FIELD] && <Text style={styles.errorMessage}>{formErrors[THUMBNAIL_FIELD]}</Text>}

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