
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import DatePicker from 'react-native-neat-date-picker';
import { INPUT_FIELD_HEIGHT, PUBLISHED_DATE_FIELD } from '../helpers/constants';
import getFormattedTimeFromDate from '../helpers/utils';
import PropTypes from 'prop-types';

const DatePickerCalender = ({ handleSelectedDate, handleChange, dateValue }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const openDatePicker = () => {
        setShowDatePicker(true)
    }

    const onCancel = () => {
        setShowDatePicker(false)
    }

    const onConfirm = (date) => {
        setShowDatePicker(false);
        handleSelectedDate(getFormattedTimeFromDate(date));
    }

    return (
        <View>
            <TextInput style={styles.datePickerContainer} placeholder="please enter or select book published date"  onChangeText={(value) => handleChange(PUBLISHED_DATE_FIELD, value)} value={dateValue} />
            <TouchableOpacity title={'open'} onPress={openDatePicker} style={styles.datePickerButton} >
                <Image source={require('../assets/calendar.png')} style={styles.datePickerIcon} />
            </TouchableOpacity>
            <DatePicker
                isVisible={showDatePicker}
                mode={'single'}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    datePickerContainer: {
        height: INPUT_FIELD_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
        fontSize: 15,
        paddingLeft: 10,
        position: 'relative'
    },
    datePickerButton: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: '#273365',
        color: 'white',
        position: 'absolute',
        right: 0,
    },
    datePickerIcon: {
        width: '90%',
        height: '90%',
    }
})
DatePickerCalender.defaultProps = {
    handleSelectedDate: () => { },
    handleChange: () => { },
}
DatePickerCalender.propTypes = {
    handleSelectedDate: PropTypes.func,
    handleChange: PropTypes.func,
}
export default DatePickerCalender;