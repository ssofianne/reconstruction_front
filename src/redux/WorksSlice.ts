import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Work } from '../api/Api';

interface WorksStateData {
    works: Work[];
    draftReconstructionID: number | undefined;
    counterWorks: number;
}

interface WorksState {
    data: WorksStateData;
    loading: boolean;
    error: boolean;
}

const initialState: WorksState = {
    data: { works: [], draftReconstructionID: 0, counterWorks: 0 },
    loading: true,
    error: false
};

export const fetchWorks = createAsyncThunk(
    'works/fetchWorks',
    async (searchValue: string | undefined, { rejectWithValue }) => {
        try {
            const response = await api.works.worksList({ work_title: searchValue });
            return response.data
        } catch {
            return rejectWithValue('Не удалось получить список видов работ')
        }
    }
);

export const addWorkToDraft = createAsyncThunk(
    'works/addWorkToDraft',
    async (workId: number, { rejectWithValue }) => {
        try {
            const response = await api.reconstruction.reconstructionDraftCreate({work_id: workId});
            console.log('Response from addWorkToDraft:', response.data); 
            return response.data
        } catch {
            return rejectWithValue('Не удалось добавить работу в реконструкцию')
        }
    }
);

export const createWork = createAsyncThunk(
    'works/createWork',
    async (newWork: Work, { rejectWithValue }) => {
        try {
            const response = await api.works.worksCreate(newWork);
            return response.data
        } catch {
            return rejectWithValue('Не удалось добавить работу')
        }
    }
);

const worksSlice = createSlice({
    name: 'worksNoSearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.works = data.works;
                state.data.counterWorks = data.count_of_works;
                state.data.draftReconstructionID = data.draft_reconstruction_id;

                state.error = false
                state.loading = false
            })
            .addCase(fetchWorks.rejected, (state) => {
                state.error = true
                state.loading = false
            })

            .addCase(addWorkToDraft.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.counterWorks = data.count_of_works;
                state.data.draftReconstructionID = data.draft_reconstruction_id;
            })
            .addCase(addWorkToDraft.rejected, (state) => {
                state.error = true
            })

            .addCase(createWork.fulfilled, (state, action) => {
                const data = action.payload;
                state.data.works = [...state.data.works, data];
            })
            .addCase(createWork.rejected, (state) => {
                state.error = true
            })
    }
});

export default worksSlice.reducer;