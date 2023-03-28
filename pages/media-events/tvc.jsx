import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import {LightgalleryProvider} from "react-lightgallery";
import PressRelease from "../../components/media-events/PressRelease";
import {ParallaxProvider} from "react-scroll-parallax";
import VideoList from "../../components/media-events/VideoList";
import BannerImage from "../../public/images/dynamic/tvc/tvcBanner.jpg";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/mediaEvents/tvc/index";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";
import Router, {useRouter} from 'next/router'
import {Loader} from "../../components/loader";


const MyComponent = (props) => {

    const getData = useSelector(state => state.tvcReducer)

    const [selectedYear, setSelectedYear] = useState('')
    const [loading, setLoading] = useState(false)


    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "tvc-banner");
    const tvcVideoList = getData?.data?.sections?.find(f => f?.page_data?.slug === "tvc-videos");

    useEffect(() => {
        let header = document.getElementsByClassName("page-item");

        // let btns = header.getElementsByClassName("btn");
    }, [])

    const router = useRouter();
    const dispatch=useDispatch();
    const {query} = router


    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '152',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])
    //
    //
    // Current Post
    const indexOfLastPost = (query?.page || 1) * 6;
    const indexOfFirstPost = indexOfLastPost - 6;
    const currentPosts = tvcVideoList?.posts?.list?.slice(indexOfFirstPost, indexOfLastPost)

    useEffect(() => {
        let getAllList = document.querySelectorAll('.pagination li a');
        let getLi = getAllList[`${query?.page}`];
        getLi?.classList?.add('active');
    }, [])

    const handlePaginate = (pageNumber) => {
        // dispatch(clearSelected())
        setSelectedYear('');
        Router.push(`?page=${pageNumber}`);
        // clearValue();

        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000);

        let getAllList = document.querySelectorAll('.pagination li a');
        let getLi = getAllList[pageNumber];

        for (let j = 0; j < getAllList.length; j++) {
            getAllList[j].classList.remove('active');
            getLi?.classList?.add('active')
        }


        let getSelectedData = document.querySelectorAll('.find-retainer-filter__single-value');

        if (getSelectedData && getSelectedData[0]) {
            getSelectedData[0].textContent = ' '
        }
    }
    const handlePaginatePrev = (pageNumber) => {
        setSelectedYear('');
        Router.push(`?page=${parseInt(pageNumber) - 1}`);


        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000);


        let getAllList = document.querySelectorAll('.pagination li a');
        let getLi = getAllList[pageNumber - 1];

        for (let j = 0; j < getAllList.length; j++) {
            getAllList[j].classList.remove('active');
            getLi.classList.add('active')

        }


        let getSelectedData = document.querySelectorAll('.find-retainer-filter__single-value');

        if (getSelectedData && getSelectedData[0]) {
            getSelectedData[0].textContent = ' '
        }
    }
    const handlePaginateNext = (pageNumber) => {
        setSelectedYear('');
        Router.push(`?page=${parseInt(pageNumber) + 1}`);


        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000);


        let getAllList = document.querySelectorAll('.pagination li a');

        let getLi = getAllList[`${parseInt(pageNumber) + 1}`];

        for (let j = 0; j < getAllList.length; j++) {
            getAllList[j].classList.remove('active');
            getLi?.classList.add('active')

        }

        let getSelectedData = document.querySelectorAll('.find-retainer-filter__single-value');

        if (getSelectedData && getSelectedData[0]) {
            getSelectedData[0].textContent = ' '
        }
    }

    return (
        <>

            <StyledComponent>
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Television Commercial'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}
                <ParallaxProvider>
                    <InnerBanner title={bannerImage?.page_data?.short_desc}
                                 img={bannerImage?.images?.list[0]?.full_path}
                                 subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
                    <VideoList tvcVideoList={currentPosts}
                               totalData={tvcVideoList?.posts?.list?.length}
                               postPerPage={6}
                               paginate={handlePaginate}
                               paginatePrev={handlePaginatePrev}
                               paginateNext={handlePaginateNext}
                               selectedYear={selectedYear}
                               setSelectedYear={setSelectedYear}
                               loading={loading}
                               setLoading={setLoading}
                    />
                </ParallaxProvider>
            </StyledComponent>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '152',
            [ApiParamKey.get_section]: 'true'
        }

        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            let api_services = ApiServices.SECTIONS;
            await store.dispatch(fetchData([api_services, param]))
        }
        return {
            props: {
                isServer,
                title: "about",
            },
        };
    })

const StyledComponent = styled.section`

`;

export default MyComponent;
