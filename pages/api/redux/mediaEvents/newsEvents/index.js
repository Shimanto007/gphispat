import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get} from "../../../network/AxiosService";
// import {fetchPosts} from "../../thunk/home";

const initialState = {
    loading: false,
    dataBanner: [],
    data: [],
    pageData: [],
    totalData:[],
    error: "",
    selectedYear:''
};

export const fetchPageData = createAsyncThunk("newsEventsPage", (params) => {
    return get(params);
});
export const fetchData = createAsyncThunk("newsEvents", (params) => {
    return get(params);
});
export const fetchTotalData = createAsyncThunk("newsEventsTotalData", (params) => {
    return get(params);
});
export const fetchBannerData = createAsyncThunk("newsEventsBanner", (params) => {
    return get(params);
});


const dataSlice = createSlice({
    name: "newsEvents",
    initialState,
    // reducers:{
    //     selected:(state)=>{
    //       state.selectedYear
    //     },
    //     clearSelected:(state,action)=>{
    //         state.selectedYear==''
    //     }
    // },
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
        builder.addCase(fetchPageData.pending, (state) => {
            state.loading = true;
            state.pageData = [];
            state.error = "";
        });
        builder.addCase(fetchPageData.fulfilled, (state, action) => {
            state.loading = false;
            state.pageData = action.payload;
            state.error = "";
        });
        builder.addCase(fetchPageData.rejected, (state, action) => {
            state.loading = false;
            state.pageData = [];
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
        builder.addCase(fetchTotalData.pending, (state) => {
            state.loading = true;
            state.totalData = [];
            state.error = "";
        });
        builder.addCase(fetchTotalData.fulfilled, (state, action) => {
            state.loading = false;
            state.totalData = action.payload;
            state.error = "";
        });
        builder.addCase(fetchTotalData.rejected, (state, action) => {
            state.loading = false;
            state.totalData = [];
            state.error = action.error;
        });

    }
});

export default dataSlice.reducer;
// export const {selected,clearSelected} =dataSlice.actions;
