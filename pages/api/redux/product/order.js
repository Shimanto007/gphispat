import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {get, post} from "../../network/AxiosService";
import axios from "axios";

const initialState = {
    loading: false,
    data: [],
    error: "",
    success: ''
};

export const postForm = createAsyncThunk("order", (params) => {
    return post(params);
});


const contactSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clear: (state) => {
            state.success = '';
            state.error = ''
        }
    },
    extraReducers: (builder) => {

        //-- post
        builder.addCase(postForm.pending, (state) => {
            state.loading = true;
            state.success = [];
            state.error = "";
        });
        builder.addCase(postForm.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.message;
            state.error = "";
        });
        builder.addCase(postForm.rejected, (state, action) => {
            state.loading = false;
            state.success = '';
            state.error = action.error;
        });

    }
});

export default contactSlice.reducer;
export const {clear} = contactSlice.actions;