import React, {useEffect} from 'react';
import {ParallaxProvider} from "react-scroll-parallax";
import InnerBanner from "../../components/InnerBanner";
import JobList from "../../components/career/JobList";
import BannerImage from "../../public/images/dynamic/career/available-jobs.jpg";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {fetchCareer, fetchBannerData, fetchPageData} from "../api/redux/career/index";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {fetchData} from "../api/redux/career/why-gph";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);


const AvailableJobs = (props) => {


    const getData = useSelector(state => state.careerReducer)

    const jobs = getData?.data;

    const bannerData = getData?.dataBanner?.sections?.[0];
    const jobLists = getData?.data;


    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!props.isServer) {
            let api_services_banner = ApiServices.SECTIONS;
            let param_banner = {
                [ApiParamKey.page_id]: 34,
                [ApiParamKey.get_section]: true,
            }
            let api_services_page = ApiServices.GET_PAGE_BY_ID;
            let param_page_data = {
                [ApiParamKey.page_id]: 34,
            }
            let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
            let param = {
                [ApiParamKey.parent_id]: 34,
                [ApiParamKey.page_no]: 1,
                [ApiParamKey.per_page]: 5
            }
            dispatch(fetchCareer([api_services, param]))
            dispatch(fetchPageData([api_services_page, param_page_data]))
            dispatch(fetchBannerData([api_services_banner, param_banner]))
        }
    }, [props.isServer, router])



    ScrollTrigger.refresh()

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
            <NextSeo
                title={`${getData?.dataBanner?.page_data?.meta_key !== '' ? getData?.dataBanner?.page_data?.meta_key : 'Available Jobs'} | GPH Ispat`}
                description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
            />
            {getData?.loading && <Loader/>}

            <ParallaxProvider>
                <InnerBanner title={bannerData?.page_data?.short_desc} img={bannerData?.images?.list?.[0].full_path}
                             subtitle={bannerData?.page_data?.subtitle}
                             des={bannerData?.page_data?.description}/>
                <JobList data={jobLists}/>
            </ParallaxProvider>
        </>
    );
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let api_services_banner = ApiServices.SECTIONS;
        let param_banner = {
            [ApiParamKey.page_id]: 34,
            [ApiParamKey.get_section]: true,
        }
        let api_services_page = ApiServices.GET_PAGE_BY_ID;
        let param_page_data = {
            [ApiParamKey.page_id]: 34,
        }
        let api_services = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
        let param = {
            [ApiParamKey.parent_id]: 34,
            [ApiParamKey.page_no]: 1,
            [ApiParamKey.per_page]: 5
        }


        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            await store.dispatch(fetchCareer([api_services, param]))
            await store.dispatch(fetchPageData([api_services_page, param_page_data]))
            await store.dispatch(fetchBannerData([api_services_banner, param_banner]))
        }
        return {
            props: {
                isServer,
                title: "about",
            },
        };
    })


export default AvailableJobs;
