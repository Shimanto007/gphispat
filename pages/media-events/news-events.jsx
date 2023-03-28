import React, {useEffect, useState} from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';
import InnerBanner from "../../components/InnerBanner";
import styled from "styled-components";
import NewsEvents from "../../components/media-events/NewsEvents";
import BannerImage from "../../public/images/dynamic/news&events/newsbanner.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {
    clearSelected,
    fetchBannerData,
    fetchData,
    fetchPageData,
    fetchTotalData
} from "../api/redux/mediaEvents/newsEvents";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";
import {PageAnimation} from "../../components/PageAnimation";
import {current} from "@reduxjs/toolkit"
import Router from 'next/router'
import {Loader} from "../../components/loader";

const NewsComponent = ({param},props) => {

    const [selectedYear, setSelectedYear] = useState('')
    const [loading, setLoading] = useState(false)


    const router = useRouter();


    useEffect(() => {

        if (!props.isServer) {

            let api_services_banner = ApiServices.SECTIONS;
            let param_banner = {
                [ApiParamKey.page_id]: 5,
                [ApiParamKey.get_section]: true,
            }
            let api_services_page = ApiServices.GET_PAGE_BY_ID;
            let param_page_data = {
                [ApiParamKey.page_id]: 5,
            }
            let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
            let param = {
                [ApiParamKey.parent_id]: 5,
                [ApiParamKey.page_no]: query?.page ? query?.page : 1,
                [ApiParamKey.per_page]: 6
            }
            let params = {
                [ApiParamKey.parent_id]: 5,
                [ApiParamKey.page_no]: 1,
            }
            dispatch(fetchData([api_services, param]))
            dispatch(fetchTotalData([api_services, params]))
            dispatch(fetchPageData([api_services_page, param_page_data]))
            dispatch(fetchBannerData([api_services_banner, param_banner]))
        }
    }, [props.isServer, router])

    useEffect(() => {
        if (selectedYear) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }, [selectedYear])


    const dispatch = useDispatch();


    const newsPageData = useSelector(state => state.newsEventsReducer);

    const bannerData = newsPageData?.dataBanner?.sections?.[0];
    const newsList = newsPageData?.data;
    const seoData = newsPageData?.pageData?.page_data;
    const {query} = router;

    useEffect(() => {
        let getAllList = document.querySelectorAll('.pagination li a');
        let getLi = getAllList[`${query?.page}`];
        getLi?.classList?.add('active');
    }, [])

    const handlePaginate = (pageNumber) => {
        // window.scrollTo(0,500 );

        setLoading(true);
        setSelectedYear('');
        Router.push(`?page=${pageNumber}`);

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
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    const handlePaginatePrev = (pageNumber) => {
        window.scrollTo(0, 500);
        setSelectedYear('');
        setLoading(true);
        Router.push(`?page=${parseInt(pageNumber) - 1}`);


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
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }
    const handlePaginateNext = (pageNumber) => {
        setLoading(true);

        setSelectedYear('');
        Router.push(`?page=${parseInt(pageNumber) + 1}`);

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
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }


    return (
        <>
            {/*<motion.div key={`1so24`} className="page-loader" exit="exit" animate="anim"*/}
            {/*            variants={PageAnimation}*/}
            {/*            initial="init">*/}
            {/*</motion.div>*/}
            <StyledComponent>
                <NextSeo
                    title={`${newsPageData?.dataBanner?.page_data?.subtitle != '' ? newsPageData?.dataBanner?.page_data?.subtitle : 'News & Events'} | GPH Ispat`}
                    description={newsPageData?.dataBanner?.page_data?.meta_description != '' ? newsPageData?.dataBanner?.page_data?.meta_description : ''}
                />
                {newsPageData?.loading && <Loader/>}


                <ParallaxProvider>
                    <InnerBanner title={bannerData?.page_data?.short_desc} img={bannerData?.images?.list?.[0].full_path}
                                 subtitle={bannerData?.page_data?.subtitle}
                                 des={bannerData?.page_data?.description}/>
                    <NewsEvents data={newsList}
                                totalData={newsPageData?.totalData?.count}
                                postPerPage={param?.per_page}
                                paginate={handlePaginate}
                                paginatePrev={handlePaginatePrev}
                                paginateNext={handlePaginateNext}
                                setSelectedYear={setSelectedYear}
                                selectedYear={selectedYear}
                                loading={loading}

                    />
                </ParallaxProvider>

            </StyledComponent>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({query,req}) => {

        let param_banner = {
            [ApiParamKey.page_id]: 5,
            [ApiParamKey.get_section]: true,
        }
        let param_page_data = {
            [ApiParamKey.page_id]: 5,
        }
        let param = {
            [ApiParamKey.parent_id]: 5,
            [ApiParamKey.page_no]: query?.page ? query?.page : 1,
            [ApiParamKey.per_page]: 6
        }
        let params = {
            [ApiParamKey.parent_id]: 5,
            [ApiParamKey.page_no]: 1,
        }

        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            let api_services_banner = ApiServices.SECTIONS;
            await store.dispatch(fetchBannerData([api_services_banner, param_banner]))

            let api_services_page = ApiServices.GET_PAGE_BY_ID;
            await store.dispatch(fetchPageData([api_services_page, param_page_data]))

            let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;

            await store.dispatch(fetchData([api_services, param]))
            await store.dispatch(fetchTotalData([api_services, params]))
        }
        return {
            props: {
                isServer,
                title: "about",
                param
            },
        };


    })
const StyledComponent = styled.section`

`;

export default NewsComponent;
