import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Work } from '../types/types';

export default function BooksPage() {
    const [books, setBooks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    async function getBooks() {
        const url = 'https://openlibrary.org/authors/OL11416317A/works.json';
        try {
            const response = await fetch(url);
            const data = await response.json();
            setBooks(data.entries);            
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    const navigation = useNavigation<any>();

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.loader}>
                {error && (
                    <Text>Problemi con il server, riprovare più tardi</Text>
                )}
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerStyle}>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {books && books.length > 0 && books.map((book) => (
                        <View style={styles.box} key={book.key}>

                            <Pressable onPress={() => navigation.navigate('DetailsBooks', { title: book.title })}>
                                <View style={{ width: '100%' }}>
                                    <Image
                                        source={book.covers && book.covers.length > 0 ?
                                            { uri: `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg` } :
                                            require('../../assets/img/cover-not-availble.jpg')
                                        }
                                        style={styles.bookImage}
                                    />
                                    <Text style={styles.bookTitle}>
                                        {book.title}
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('DetailsBooks', { title: book.title })}>
                                <Text style={styles.detailsText}>Go to book details</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    box: {
        width: '48%',
        marginBottom: 10,
        display: 'flex',
        padding: 10,
    },
    bookImage: {
        width: '100%',
        height: 200,
        minHeight: 200,
        maxHeight: 200,
        marginBottom: 10,
    },
    bookTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 5,
    },
    detailsText: {
        color: '#0000ff',
        textAlign: 'center',
        marginTop: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerStyle: {
        height: 50,
    }
});
