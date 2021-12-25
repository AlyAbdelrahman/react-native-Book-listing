import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TrancatedText = ({ postDescription }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <View style={styles.postContentContainer}>
            {postDescription.length > 120 ? (
                showMore ? (
                    <TouchableOpacity delayPressIn={150} onPress={() => setShowMore(!showMore)} >
                        <Text style={styles.postDescription}>{postDescription}</Text>
                        <Text style={styles.seeMore}>Show less</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity delayPressIn={150} onPress={() => setShowMore(!showMore)}>
                        <Text style={styles.postDescription}>
                            {`${postDescription.slice(0, 120)}... `}
                        </Text>
                        <Text style={styles.seeMore}>Show more</Text>
                    </TouchableOpacity>
                )
            ) : (
                <Text style={styles.postDescription}>{postDescription}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    postContentContainer: {
        flexDirection: 'row',
        display: 'flex'
    },

    postMedia: {
        width: '100%',
        height: 280,
        resizeMode: 'cover',
    },

    postDescription: {
        fontSize: 18,
        opacity: 0.7
    },

    seeMore: {
        // paddingHorizontal: 15,
        color: 'grey',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
    },
});

export default TrancatedText;