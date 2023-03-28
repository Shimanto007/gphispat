import React, {useEffect} from 'react';
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import postReducer, {fetchPostDetail} from "../api/redux/for-demo";
import {useSelector} from "react-redux";

const PostDetail = () => {

    let detailData = useSelector(state => state.postReducer)

    return (
        <div>
            <h1>{detailData?.detail?.id} <br/>{detailData?.detail?.title}</h1>
            <p>{detailData?.detail?.body}</p>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, query}) => {
        let api_services = ApiServices.POSTS
        await store.dispatch(fetchPostDetail([api_services + `/${query.id}`]))
    })

export default PostDetail;
