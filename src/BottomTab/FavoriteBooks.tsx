import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeBookToFavorite } from '../store/store';

export default function FavoriteBooks() {
    const favoriteBooks = useSelector((state: RootState) => state.booksFavorite.booksFavorite);
    const dispatch = useDispatch();

    function handleRemove(id: string) {
        dispatch(removeBookToFavorite(id));
    };

    const renderItem = ({ item }: { item: { id: string; title: string } }) => (
        <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Button title="Rimuovi" onPress={() => handleRemove(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
            </View>
            <Text style={styles.title}>Libri Preferiti</Text>
            {favoriteBooks.length > 0 ? (
                <FlatList
                    data={favoriteBooks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.noFavorites}>Nessun libro</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    bookItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookTitle: {
        fontSize: 18,
        maxWidth: '70%',

    },
    noFavorites: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    headerStyle: {
        height: 50,
    }
});
