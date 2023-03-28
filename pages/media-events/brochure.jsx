import React, {useEffect} from 'react';
import styled from "styled-components";
import {ParallaxProvider} from "react-scroll-parallax";
import InnerBanner from "../../components/InnerBanner";
import NewsEvents from "../../components/media-events/NewsEvents";
import BrochureList from "../../components/media-events/BrochureList";
import BannerImage from "../../public/images/dynamic/news&events/brochureBanner.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/mediaEvents/gphBrochure";
import {useDispatch, useSelector} from "react-redux";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {fetchContact} from "../api/redux/contact";
import {Loader} from "../../components/loader";

const MyComponent = (props) => {
    const dispatch = useDispatch()
    const getData = useSelector(state => state.brochureReducer)

    // data refactor


    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "gph-brochure-banner");
    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;

    const getDownloadSectionData = getData?.data?.sections?.find(f => f?.page_data?.slug === "brochure-downloads");

    const router = useRouter();


    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '149',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    return (
        <>

            <StyledComponent>
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Brochure'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <ParallaxProvider>
                    <InnerBanner title={bannerTitle} img={bannerImageSrc} subtitle={bannerSubtitle}
                                 des={bannerDescription}/>
                    <BrochureList data={getDownloadSectionData}/>
                </ParallaxProvider>

            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`

`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '149',
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

export default MyComponent;
