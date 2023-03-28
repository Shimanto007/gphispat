import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get, post, postFile} from "../../network/AxiosService";

const initialState = {
    loading: false,
    data: [],
    error: "",
    pageData: [],
    success: ''
};

export const fetchCareer = createAsyncThunk("career", (params) => {
    return get(params);
});
export const postCareerForm = createAsyncThunk("postCareerForm", (params) => {
    return postFile(params);
});
export const fetchPageData = createAsyncThunk("careerPage", (params) => {
    return get(params);
});
export const fetchBannerData = createAsyncThunk("careerBanner", (params) => {
    return get(params);
});


const careerSlice = createSlice({
    name: "career",
    initialState,
    reducers: {
        clear: (state) => {
            state.success = '';
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCareer.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
        });
        builder.addCase(fetchCareer.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        });
        builder.addCase(fetchCareer.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error;
        });


        //-- post
        builder.addCase(postCareerForm.pending, (state) => {
            state.loading = true;
            state.success = '';
            state.error = "";
        });
        builder.addCase(postCareerForm.fulfilled, (state, action) => {

            state.loading = false;
            state.success = action.payload;
            state.error = "";
        });
        builder.addCase(postCareerForm.rejected, (state, action) => {

            state.loading = false;
            state.success = '';
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

    }
});

export default careerSlice.reducer;
export const {clear} = careerSlice.actions;