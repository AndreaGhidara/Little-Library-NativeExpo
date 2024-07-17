import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
    id: string;
    title: string;
}

interface BooksState {
    booksFavorite: Book[];
}

const initialState: BooksState = {
    booksFavorite: [],
};

const booksSlice = createSlice({
    name: 'booksFavorite',
    initialState,
    reducers: {
        addBookToFavorite(state, action: PayloadAction<Book>) {
            state.booksFavorite.push(action.payload);
        },
        removeBookToFavorite(state, action: PayloadAction<string>) {
            state.booksFavorite = state.booksFavorite.filter(book => book.id !== action.payload);
        },
    },
});

const store = configureStore({
    reducer: {
        booksFavorite: booksSlice.reducer,
    },
});

export const { addBookToFavorite, removeBookToFavorite } = booksSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store;
