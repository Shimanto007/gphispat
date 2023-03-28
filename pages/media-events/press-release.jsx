import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {NextSeo} from 'next-seo'
import Router, {useRouter} from 'next/router'
import InnerBanner from "../../components/InnerBanner";
import PressRelease from "../../components/media-events/PressRelease";
import {ParallaxProvider} from "react-scroll-parallax";
import {LightgalleryProvider} from "react-lightgallery";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchDatas, fetchBannerData, fetchPageData, fetchTotalData} from "../api/redux/mediaEvents/pressRelease";
import {useDispatch, useSelector} from "react-redux";
import NewsEvents from "../../components/media-events/NewsEvents";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {fetchData} from "../api/redux/mediaEvents/gphBrochure";
import {Loader} from "../../components/loader";

const PressReleaseComponent = ({param},props) => {
    const [count, setCount] = useState(0);

    const [selectedYear, setSelectedYear] = useState('')
    const newsPageData = useSelector(state => state.pressReleaseReducer);
    const [loading, setLoading] = useState(false)


    const bannerData = newsPageData?.dataBanner?.sections?.[0];
    const newsList = newsPageData?.data;

    const seoData = newsPageData?.pageData?.page_data;
    const router = useRouter();
    const dispatch=useDispatch();
    const {query} = router;

    useEffect(() => {

        if (!props.isServer) {
            let api_services_banner = ApiServices.SECTIONS;
            let param_banner = {
                [ApiParamKey.page_id]: 121,
                [ApiParamKey.get_section]: true,
            }
            let api_services_page = ApiServices.GET_PAGE_BY_ID;
            let param_page_data = {
                [ApiParamKey.page_id]: 121,
            }
            let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
            let param = {
                [ApiParamKey.parent_id]: 121,
                [ApiParamKey.page_no]: query?.page ? query?.page : 1,
                [ApiParamKey.per_page]: 6
            }
            let params = {
                [ApiParamKey.parent_id]: 121,
                [ApiParamKey.page_no]: 1,
            }
            dispatch(fetchDatas([api_services, param]))
            dispatch(fetchTotalData([api_services, params]))
            dispatch(fetchBannerData([api_services_banner, param_banner]))
            dispatch(fetchPageData([api_services_page, param_page_data]))
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
    useEffect(() => {
        let getAllList = document.querySelectorAll('.pagination li a');
        let getLi = getAllList[`${query?.page}`];
        getLi?.classList?.add('active');
    }, [])

    const handlePaginate = (pageNumber) => {
        // dispatch(clearSelected())
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 2000);
        setSelectedYear('');
        Router.push(`?page=${pageNumber}`);
        // clearValue();

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
                    title={seoData?.meta_key !== '' ? seoData?.meta_key + ' | GPH Ispat Limited' : seoData?.title + ' | GPH Ispat Limited'}
                    description={seoData?.meta_description !== '' ? seoData?.meta_description : ''}
                    canonical={router.pathname}
                    openGraph={{
                        url: router.pathname,
                        title: seoData?.meta_description !== '' ? seoData?.meta_description : seoData?.title,
                        description: seoData?.meta_description !== '' ? seoData?.meta_description : '',
                        type: 'website',
                        images: [
                            {
                                url: bannerData?.full_path,
                                width: 1280,
                                height: 720,
                                alt: 'GPH Ispat Limited',
                                type: 'image/jpeg',
                            }
                        ],
                        site_name: 'GPH Ispat Limited',
                    }}
                    // facebook={{
                    //     appId: '3255355539451369888',
                    // }}
                    // twitter={{
                    //     handle: '@handle',
                    //     site: '@site',
                    //     cardType: 'summary_large_image',
                    // }}
                />
                {newsPageData?.loading && <Loader/>}
                <ParallaxProvider>
                    <InnerBanner title={bannerData?.page_data?.short_desc} img={bannerData?.images?.list?.[0].full_path}
                                 subtitle={bannerData?.page_data?.subtitle}
                                 des={bannerData?.page_data?.description}/>

                    <PressRelease
                        data={newsList}
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
        let api_services_banner = ApiServices.SECTIONS;
        let param_banner = {
            [ApiParamKey.page_id]: 121,
            [ApiParamKey.get_section]: true,
        }
        let api_services_page = ApiServices.GET_PAGE_BY_ID;
        let param_page_data = {
            [ApiParamKey.page_id]: 121,
        }
        let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
        let param = {
            [ApiParamKey.parent_id]: 121,
            [ApiParamKey.page_no]: query?.page ? query?.page : 1,
            [ApiParamKey.per_page]: 6
        }
        let params = {
            [ApiParamKey.parent_id]: 121,
            [ApiParamKey.page_no]: 1,
        }



        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            await store.dispatch(fetchDatas([api_services, param]))
            await store.dispatch(fetchTotalData([api_services, params]))
            await store.dispatch(fetchBannerData([api_services_banner, param_banner]))
            await store.dispatch(fetchPageData([api_services_page, param_page_data]))
        }
        return {
            props: {
                isServer,
                title: "about",
                param,
            },
        };
   })

const StyledComponent = styled.section`
  .lg-thumb-outer {
    display: none !important;
  }
`;


export default PressReleaseComponent;
