import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Work, Reconstruction } from '../api/Api';

interface ReconstructionStateData {
    works: Work[];
    reconstruction: Reconstruction | null;
}

interface ReconstructionState {
    data: ReconstructionStateData;
    loading: boolean;
    error: boolean;
}

const initialState: ReconstructionState = {
    data: { works: [], reconstruction: null },
    loading: true,
    error: false
};

export const fetchReconstruction = createAsyncThunk(
    'reconstruction/fetchReconstruction',
    async (reconstructionId: string, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsRead(reconstructionId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить заявку на реконструкцию по id')
        }
    }
);

export const removeWork = createAsyncThunk(
    'reconstruction/removeWork',
    async ({ reconstructionId, workId }: { reconstructionId: string; workId: string }, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsSpaceDelete(reconstructionId, workId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось удалить работу из заявки на реконструкцию')
        }
    }
);

export const changePlace = createAsyncThunk(
    'reconstruction/changePlace',
    async ({ reconstructionId, updatedReconstruction }: { reconstructionId: string; updatedReconstruction: Reconstruction }, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsUpdate(reconstructionId, updatedReconstruction);
            return response.data
        } catch {
            return rejectWithValue('Не удалось изменить место осуществления работ')
        }
    }
);

export const changeSpace = createAsyncThunk(
    'reconstruction/changeSpace',
    async ({ reconstructionId, workId, NewSpace }: { reconstructionId: string; workId: string, NewSpace:{ space: number } }, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsSpaceUpdate(reconstructionId, workId, NewSpace);
            return response.data
        } catch {
            return rejectWithValue('Не удалось изменить объем работы')
        }
    }
)

export const deleteReconstruction = createAsyncThunk(
    'reconstruction/deleteReconstruction',
    async (reconstructionId: string, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsDelete(reconstructionId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось удалить заявку на реконструкцию')
        }
    }
);

export const submitReconstruction = createAsyncThunk(
    'reconstruction/submitReconstruction',
    async (reconstructionId: string, { rejectWithValue }) => {
        try {
            const response = await api.reconstructions.reconstructionsCreateUpdate(reconstructionId);
            return response.data
        } catch {
            return rejectWithValue('Не удалось сформировать заявку на реконструкцию')
        }
    }
);

const reconstructionSlice = createSlice({
    name: 'reconstruction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReconstruction.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchReconstruction.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.works = data.works;
                state.data.reconstruction = data.reconstruction;

                state.error = false
                state.loading = false
            })
            .addCase(fetchReconstruction.rejected, (state) => {
                state.error = true
                state.loading = false
            })
            .addCase(changeSpace.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.works = data.works; 
            })
            .addCase(changeSpace.rejected, (state) => {
                state.error = true;
            })
            .addCase(removeWork.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.works = data.works;
            })
            .addCase(removeWork.rejected, (state) => {
                state.error = true
            })

            .addCase(changePlace.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.reconstruction = data;
            })
            .addCase(changePlace.rejected, (state) => {
                state.error = true
            })

            .addCase(deleteReconstruction.fulfilled, (state) => {
                state.data.works = [];
                state.data.reconstruction = null;
            })
            .addCase(deleteReconstruction.rejected, (state) => {
                state.error = true
            })

            .addCase(submitReconstruction.fulfilled, (state) => {
                state.data.works = [];
                state.data.reconstruction = null;
            })
            .addCase(submitReconstruction.rejected, (state) => {
                state.error = true
            })
    }
});

export default reconstructionSlice.reducer;