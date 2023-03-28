import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/about/performanceBanner.jpg";
import susleft from "../../public/images/dynamic/about/stackholder.jpg";

import {Col, Container, Row} from "react-bootstrap";
import TextWithImage from "../../components/TextWithImage";
import SubTitle from "../../components/SubTitle";
import TextList from "../../components/TextList";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/sustainability/economicSustainability";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";


gsap.registerPlugin(ScrollTrigger);


const MyComponent = (props) => {
    // animation
    ScrollTrigger.refresh()

    const dispatch = useDispatch()
    const getData = useSelector(state => state.economicSustainability)
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '87',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])



    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "economic-sustainability-banner");
    const bannerImageSrc = bannerSec?.images?.list[0].full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannerDesc = bannerSec?.page_data?.description;
    const bannertitle = bannerSec?.page_data?.subtitle;


    const economicSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "economic-sustainability-details");
    const economicshortdesc = economicSec?.page_data?.short_desc;
    const economictitle = economicSec?.page_data?.subtitle;
    const economicdesc = economicSec?.page_data?.description;
    const seo = getData?.data;


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

            <StyledComponent>
                <NextSeo
                    title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Economic Sustainability'} | GPH Ispat`}
                    description={seo?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}
                <InnerBanner title={bannershortdesc} img={bannerImageSrc} subtitle={bannertitle} des={bannerDesc}/>
                <div className="section_first pt-150 pb-150">

                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle text={economictitle}/>


                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage text_one={economicdesc} />
                    <Container>
                        <Row>
                            <TextList text={economicshortdesc}/>

                        </Row>
                    </Container>
                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #E9E9E9;
   .plain_text{
     margin: 0;
   }
  }
  .right_col_image_wrapper{
    padding-top: calc(600 / 530 * 100%) !important;
    @media(max-width: 1200px) and (min-width: 768px){
      height: 100%;
    }
  }
`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req}) => {
            const isServer = !req.url.startsWith("/_next");

            if (isServer) {
                let param = {
                    [ApiParamKey.page_id]: '87',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "economic",
                },
            };
        }
);



export default MyComponent;
