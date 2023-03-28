import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get} from "../../../network/AxiosService";
// import {fetchPosts} from "../../thunk/home";

const initialState = {
    loading: false,
    dataBanner: [],
    data: [],
    error: "",
};

export const fetchData = createAsyncThunk("newsEventsDetail", (params) => {
    return get(params);
});
export const fetchBannerData = createAsyncThunk("newsEventsDetailBanner", (params) => {
    return get(params);
});


const dataSlice = createSlice({
    name: "newsEventsDetail",
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
        builder.addCase(fetchBannerData.pending, (state) => {
            state.loading = true;
            state.dataBanner = [];
            state.error = "";
        });
        builder.addCase(fetchBannerData.fulfilled, (state, action) => {
            state.loading = false;
            state.dataBanner = action.payload;
            state.error = "";
        });
        builder.addCase(fetchBannerData.rejected, (state, action) => {
            state.loading = false;
            state.dataBanner = [];
            state.error = action.error;
        });

    }
});

export default dataSlice.reducer;
