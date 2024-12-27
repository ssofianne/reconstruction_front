import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Reconstruction } from '../api/Api';

interface ReconstructionsStateData {
    creators: string[];
    reconstructions: Reconstruction[];
}

interface ReconstructionsState {
    data: ReconstructionsStateData;
    loading: boolean;
    error: boolean;
}

const initialState: ReconstructionsState = {
    data: { creators: [], reconstructions: [] },
    loading: true,
    error: false
};

export const fetchReconstructions = createAsyncThunk(
    'reconstructions/fetchReconstructions',
    async ({ startDate, endDate, status }: { startDate: string, endDate: string, status: string }, { rejectWithValue }) => {
        try {
            console.log('Start Date:', startDate); // Проверка перед передачей
            console.log('End Date:', endDate);
            const response = await api.reconstructions.reconstructionsList({ apply_date_start: startDate, apply_date_end: endDate, status: status });
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить список заявок')
        }
    }
);

export const changeStatus = createAsyncThunk(
    'reconstructions/changeStatus',
    async ({ applicationId, status }: { applicationId: string; status: "completed" | "rejected" }, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsFinishUpdate(applicationId, { status: status });
            return response.data
        } catch {
            return rejectWithValue('Не удалось изменить статус заявки')
        }
    }
);

const reconstructionsSlice = createSlice({
    name: 'reconstructions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReconstructions.pending, (state) => {
                state.error = false
            })
            .addCase(fetchReconstructions.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.reconstructions = data.reconstructions;

                const creators = data.reconstructions.map(app => app.creator);
                const uniqueCreators = new Set(creators);
                state.data.creators = (Array.from(uniqueCreators));

                state.error = false
                state.loading = false
            })
            .addCase(fetchReconstructions.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(changeStatus.fulfilled, (state) => {
                state.error = false
            })
            .addCase(changeStatus.rejected, (state) => {
                state.error = true
            })
    }
});

export default reconstructionsSlice.reducer;