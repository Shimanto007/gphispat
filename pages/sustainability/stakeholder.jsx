import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/about/performanceBanner.jpg";
import susleft from "../../public/images/dynamic/about/stackholder.jpg";

import {Col, Container, Row} from "react-bootstrap";
import TextWithImage from "../../components/TextWithImage";
import SubTitle from "../../components/SubTitle";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/sustainability/ourStakeholders";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";


gsap.registerPlugin(ScrollTrigger);


const MyComponent = (props) => {

    const getData = useSelector(state => state.stakeholderReducer)

    const dispatch = useDispatch()
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '74',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "stakeholder-banner");
    const bannerImageSrc = bannerSec?.images?.list[0]?.full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannertitle = bannerSec?.page_data?.subtitle;
    const bannerDescription = bannerSec?.page_data?.description;


    const firstSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "stakeholder-details");
    const firstTitle = firstSec?.page_data?.subtitle;
    const firstDesc = firstSec?.page_data?.description;
    const firstImage = firstSec?.images?.list[0]?.full_path;
    const seo = getData?.data;

    // animation
    ScrollTrigger.refresh()
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
                    title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Our Stakeholder Engagement'} | GPH Ispat`}
                    description={seo?.page_data?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannershortdesc} img={bannerImageSrc} subtitle={bannertitle} des={bannerDescription}/>
                <div className="section_first pt-150 pb-150">

                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle text={firstTitle}/>


                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage text_one={firstDesc} img={firstImage}/>

                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #E9E9E9;
    .about_image_with_text{
      margin: 0 0 120px;
      &:last-child{
        margin: 0;
      }
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
                    [ApiParamKey.page_id]: '74',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "stakeholder",
                },
            };
        }
);


export default MyComponent;
