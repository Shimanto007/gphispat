import React, {useEffect} from 'react';
import styled from "styled-components";
import ListWithLogo from "../../components/about/ListWithLogo";
import MissionVision from "../../components/about/MissionVision";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/default_banner.jpg";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import sisterconcernReducer, {fetchData} from "../api/redux/about/sister-concern";
import {wrapper} from "../api/store";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import ListWithGrid from "../../components/ListWithGrid";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = (props) => {

    ScrollTrigger.refresh()
    const getData = useSelector(state => state.sisterconcernReducer)


    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "about-sister-concern-banner");
    const concernImageData = getData?.data?.sections?.find(f => f?.page_data?.slug === "group-concern");
    const concernImages = concernImageData?.images.list;

    const ventureImageData = getData?.data?.sections?.find(f => f?.page_data?.slug === "joint-venture-concern");
    const ventureImages = ventureImageData?.images.list;

    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '44',
                [ApiParamKey.get_section]: 'true'
            }

            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])


    // animation
    useEffect(() => {
        let allAnim = document.querySelectorAll('.fade-up');

        allAnim.forEach((el, index) => {
            gsap.fromTo(el, {
                autoAlpha: 0,
                y: 50,
                ease: "none",
            }, {
                y: 0,
                autoAlpha: 1,
                ease: "power2",
                duration: 1,
                scrollTrigger: {
                    id: `${index + 1}`,
                    trigger: el,
                    // start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                }
            })
        })
    }, [getData])
    return (
        <>
            {/*<motion.div key={`1so10`} className="page-loader" exit="exit" animate="anim"*/}
            {/*            variants={PageAnimation}*/}
            {/*            initial="init">*/}
            {/*</motion.div>*/}
            <StyledComponent>
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Sister Concern Of GPH Group'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}


                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>

                <ListWithLogo background="#FFFFFF" title={concernImageData?.page_data?.subtitle} col={4}
                              images={concernImages}/>
                {
                    ventureImages && ventureImages?.length > 0 ?
                        <ListWithLogo background="#F9F9F9" title={ventureImageData?.page_data?.subtitle} col={4}
                                      images={ventureImages}/> : ''
                }

            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`

`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '44',
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
