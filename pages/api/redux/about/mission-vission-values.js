import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get} from "../../network/AxiosService";

const initialState = {
    loading: false,
    data: [],
    error: "",
};

export const fetchData = createAsyncThunk("mission-vision", (params) => {
    return get(params);
});


const dataSlice = createSlice({
    name: "mission-vision",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error;
        });

    }
});

export default dataSlice.reducer;
