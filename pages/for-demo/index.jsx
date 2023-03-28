import Post from "../../components/for-demo/Post";
import {useDispatch, useSelector} from "react-redux";
import {ApiServices} from "../api/network/ApiServices";
import {fetchPosts} from "../api/redux/for-demo";
import {useEffect} from "react";
import {wrapper} from "../api/store";
import {fetchData} from "../api/redux/about/background";
import {ApiParamKey} from "../api/network/ApiParamKey";

const Home = () => {

    const dispatch = useDispatch()
    const getPost = useSelector(state => state.postReducer)
    let api_services = ApiServices.POSTS


    useEffect(() => {

        // let param = {
        //     [ApiParamKey.type]: 'type',
        //     [ApiParamKey.location]: 'location'
        // }
        // let headers = {
        //     auth: '2JSU0A013FASDFI'
        // }
        // dispatch(fetchPosts([api_services, param, headers]))


    }, [])

    return (
        <>
            <Post getPost={getPost}/>
        </>
    )


}


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '8',
            [ApiParamKey.get_section]: 'true'
        }
        await store.dispatch(fetchData([api_services, param]))
    })


export default Home;



