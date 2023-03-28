import React, {useEffect} from 'react';
import styled from "styled-components";
import ListWithGrid from "../../components/ListWithGrid";
import ListWithImage from "../../components/about/ListWithImage";
import ImageOne from "../../public/images/dynamic/about/image_one.jpg";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/corporateInfo.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import corporateinfoReducer, {fetchData} from "../api/redux/about/corporate-info";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
import {motion} from 'framer-motion';
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = (props) => {
    let maintitle = "About us";
    let sub = "Company profile";
    let desbanner = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. ";

    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '28',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])


    // animation
    ScrollTrigger.refresh()
    const getData = useSelector(state => state.corporateinfoReducer)

    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "about-corporate-information-banner");
    const historyInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "corporate-history");
    const filteredBodInfo = getData?.data?.sections?.filter(f => f?.page_data?.slug != "corporate-history" && f?.page_data?.slug != "about-corporate-information-banner");

    const historyInfoDetail = historyInfo?.posts?.list[0];

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

                <StyledComponent className="corporate_info">
                    <NextSeo
                        title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Corporate Information'} | GPH Ispat`}
                        description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                    />
                    {getData?.loading && <Loader/>}


                    <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                                 subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
                    <div className="pt-150 pb-150">
                        <ListWithImage info={historyInfoDetail}/>
                        {
                            filteredBodInfo && filteredBodInfo?.length > 0 &&
                            filteredBodInfo?.map((element) => {
                                return (
                                    <ListWithGrid margin="60px 0 0 0" directorList={element} key={element?.data?.id}/>
                                );
                            })
                        }

                    </div>

                </StyledComponent>

        </>

    );
};

const StyledComponent = styled.section`
  background: #F9F9F9;
  ul {
    flex-flow: wrap !important;
    .wrapper{
      height: 100%;
    }
    li{
      height: auto;
      margin-bottom: 20px !important;
    }
  }
  @media(max-width: 767px){
    .list_with_grid_section{
      margin: 40px 0 0;
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '28',
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
