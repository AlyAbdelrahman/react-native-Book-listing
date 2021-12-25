import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, Image, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import getBooksList from '../../services/books-service'
import { SPACING, BOOK_IMAGE_SIZE, NO_IMAGE_FOUND_URL, BG_IMAGE_URL } from '../../helpers/constants';
import AddButton from '../../components/AddButton';
import 'react-native-get-random-values'; 
import TrancatedText from '../../components/TrancatedText';   
import { v4 as uuidv4 } from 'uuid';


export default function BooksList() {
    const [books, setBooks] = useState([])
    const mapBooksData = (booksData) => {
        const filteredBooksData = [];
        booksData.items.map((bookItem) => filteredBooksData.push({
            title: bookItem.volumeInfo.title || '',
            description: bookItem.volumeInfo.description || '',
            publishedDate: bookItem.volumeInfo.publishedDate || '',
            key: uuidv4(),
            thumbnail: (bookItem.volumeInfo.imageLinks ? (bookItem.volumeInfo.imageLinks.thumbnail || bookItem.volumeInfo.imageLinks.smallThumbnail) : NO_IMAGE_FOUND_URL)
        }))
        return filteredBooksData;
    }
    useEffect(() => {
        getBooksList().then(mapBooksData).then(booksData => setBooks(booksData));
    }, [])
    return (
        <SafeAreaView style={{flex: 1 }}>
            <View style={styles.homeContainer}>
                <Image
                    source={{ uri: BG_IMAGE_URL }}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={80}
                />
                <FlatList
                    data={books}
                    keyExtractor={item => item.key }
                    contentContainerStyle={styles.booksListContainer}
                    renderItem={({ item }) => {
                        return <View style={styles.bookItemContainer}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.imageContainer}
                                resizeMode="cover"
                            />
                            <View style={styles.bookDescriptionContainer}>
                                {item.title !== '' && <Text style={styles.bookTitle}>{item.title}</Text>}
                                {item.description !== '' && <TrancatedText postDescription={item.description}/>}
                                {item.publishedDate !== '' && <Text style={styles.publishedDate}>{item.publishedDate}</Text>}
                            </View>
                        </View>
                    }} />
                    <AddButton setBooks={setBooks}/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bookDescriptionContainer: {
        maxWidth: '80%'
    },
    booksListContainer: {
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 43
    },
    imageContainer: {
        width: BOOK_IMAGE_SIZE,
        height: BOOK_IMAGE_SIZE,
        borderRadius: BOOK_IMAGE_SIZE,
        marginRight: SPACING / 2
    },
    bookItemContainer: {
        flexDirection: 'row',
        padding: SPACING,
        margin: SPACING,
        backgroundColor: '#ffffffcc',
        borderRadius: 12,
        shadowColor: "#000",
        elevation: 300,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: .3,
        shadowRadius: 20
    },
    bookTitle: {
        fontSize: 22,
        fontWeight: '700'
    },
    bookDescription: {
        fontSize: 18,
        opacity: 0.7
    },
    publishedDate: {
        fontSize: 14,
        opacity: 0.8,
        color: '#0099cc'
    }
});