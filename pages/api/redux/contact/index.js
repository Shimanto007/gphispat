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

export const fetchContact = createAsyncThunk("home", (params) => {
    return get(params);
});

export const postForm = createAsyncThunk("postForm", (params) => {
    return post(params);
});


const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        clear: (state) => {
            state.success = '';
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContact.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
        });
        builder.addCase(fetchContact.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        });
        builder.addCase(fetchContact.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error;
        });


        //-- post
        builder.addCase(postForm.pending, (state) => {
            state.loading = true;
            state.success = [];
            state.error = "";
        });
        builder.addCase(postForm.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.msg;
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