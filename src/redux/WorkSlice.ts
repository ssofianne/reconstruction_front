import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Work } from '../api/Api';

interface WorkState {
    data: Work | null;
    loading: boolean;
    error: boolean;
}

const initialState: WorkState = {
    data: null,
    loading: true,
    error: false
};

export const fetchWork = createAsyncThunk(
    'work/fetchWork',
    async (workId: string, { rejectWithValue }) => {
        console.log('Fetching work with id:', workId);
        try {
            const response = await api.works.worksRead(workId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить работу по id')
        }
    }
);

export const updateWork = createAsyncThunk(
    'work/updateWork',
    async ({ workId, updatedWork }: { workId: string; updatedWork: Work }, { rejectWithValue }) => {
        try {
            const response = await api.works.worksChangeUpdate(workId, { ...updatedWork });
            return response.data
        } catch {
            return rejectWithValue('Не удалось обновить работу')
        }
    }
);

export const deleteWork = createAsyncThunk(
    'work/deleteWork',
    async (workId: string, { rejectWithValue }) => {
        try {
            const response = await api.works.worksDeleteDelete(workId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось удалить работу')
        }
    }
);

export const updateWorkImage = createAsyncThunk(
    'work/updateWorkImage',
    async ({ workId, imageFile }: { workId: string; imageFile: File }, { rejectWithValue }) => {
        try {
            const response = await api.works.worksImageCreate(workId, { pic: imageFile });
            return response.data
        } catch {
            return rejectWithValue('Не удалось обновить изображение работы')
        }
    }
);

const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWork.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchWork.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = false
                state.loading = false
            })
            .addCase(fetchWork.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(updateWork.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = false
            })
            .addCase(updateWork.rejected, (state) => {
                state.error = true
            })

            .addCase(deleteWork.fulfilled, (state) => {
                state.data = null;
                state.error = false
            })
            .addCase(deleteWork.rejected, (state) => {
                state.error = true
            })

            .addCase(updateWorkImage.fulfilled, (state) => {
                state.error = false
            })
            .addCase(updateWorkImage.rejected, (state) => {
                state.error = true
            })
    }
});

export default workSlice.reducer;