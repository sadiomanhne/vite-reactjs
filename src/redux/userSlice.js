import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsersApi } from '../api/userApi';

const initialState = {
    loading: false,
    error: false,
    data: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
    },
    searchText: "",
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ pagination, searchText }, thunkAPI) => {
        const response = await fetchUsersApi(pagination?.current, pagination?.pageSize, searchText);
        return response;
    },
)

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updatePagination: (state, action) => {
            state.pagination.current = action.payload.current;
            state.pagination.pageSize = action.payload.pageSize;
        },
        updateSearchText: (state, action) => {
            state.searchText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.pagination.total = 80;
        });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    },
})

// Action creators are generated for each case reducer function
export const { updatePagination, updateSearchText } = userSlice.actions

export default userSlice.reducer