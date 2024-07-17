import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addBookToFavorite, removeBookToFavorite } from '../store/store';
import { BookData } from '../types/types';


interface RouteParams {
    title: string;
}

interface DetailsBooksProps {
    route: { params: RouteParams };
}

export default function DetailsBooks({ route }: DetailsBooksProps) {
    const { title } = route.params;

    const [infoBook, setInfoBook] = useState<BookData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const favoriteBooks = useSelector((state: RootState) => state.booksFavorite.booksFavorite);

    async function getInfoBooks() {
        const url = `https://openlibrary.org/search.json?title=${title}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.docs && data.docs.length > 0) {
                const bookData = data.docs[0];
                setInfoBook(bookData);
            } else {
                setError('No book data found');
            }
        } catch (error) {
            setError('Failed to fetch book data');
            console.error(error);
        }
    }

    function saveInFavorite() {
        if (infoBook) {
            dispatch(addBookToFavorite({ id: infoBook.key, title: infoBook.title }));
        }
    };

    function removeFromFavorite() {
        if (infoBook) {
            dispatch(removeBookToFavorite(infoBook.id));
        }
    };

    useEffect(() => {
        getInfoBooks();
    }, []);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const isFavorite = infoBook && favoriteBooks.some(book => book.id === infoBook.key);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>DetailsBooks - {title}</Text>
                {infoBook ? (
                    <>
                        <Text style={styles.infoText}>First Publish Year: {infoBook.first_publish_year ?? 'N/A'}</Text>
                        <Text style={styles.infoText}>Publish Date: {infoBook.publish_date?.join(', ') ?? 'N/A'}</Text>
                        <Text style={styles.infoText}>Publisher: {infoBook.publisher?.join(', ') ?? 'N/A'}</Text>
                        <Text style={styles.infoText}>Author Name: {infoBook.author_name?.join(', ') ?? 'N/A'}</Text>
                        {isFavorite ? (
                            <Button title='Remove from Favorites' onPress={removeFromFavorite} />
                        ) : (
                            <Button title='Save in Favorites' onPress={saveInFavorite} />
                        )}
                    </>
                ) : (
                    <Text style={styles.loadingText}>Loading...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    loadingText: {
        fontSize: 16,
        color: 'gray',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});
