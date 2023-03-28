import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get} from "../../network/AxiosService";
// import {fetchPosts} from "../../thunk/home";

const initialState = {
    loading: false,
    data: [],
    error: "",
    detail: []
};

export const fetchData = createAsyncThunk("product", (params) => {
    return get(params);
});

export const fetchDetailData = createAsyncThunk("product/detail", (params) => {
    return get(params);
});

//
const dataSlice = createSlice({
    name: "product-detail",
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
        builder.addCase(fetchDetailData.pending, (state) => {
            state.loading = true;
            state.detail = [];
            state.error = "";
        });
        builder.addCase(fetchDetailData.fulfilled, (state, action) => {
            state.loading = false;
            state.detail = action.payload;
            state.error = "";
        });
        builder.addCase(fetchDetailData.rejected, (state, action) => {
            state.loading = false;
            state.detail = [];
            state.error = action.error;
        });

    }
});

export default dataSlice.reducer;
