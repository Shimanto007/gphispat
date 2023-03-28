import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextWithImage from "../../components/TextWithImage";
import TextWithImageProduct from "../../components/product/TextWithImageProduct";
import ImageOne from "../../public/images/dynamic/about/global_rearch.jpg";
import greenbg from "../../public/images/static/green.svg";
import pinkbg from "../../public/images/static/pinkbg.svg";
import yell from "../../public/images/static/yell.svg";
import blue from "../../public/images/static/blue.svg";
import gray from "../../public/images/static/gray.svg";
import why_us from "../../public/images/dynamic/why_banner.jpg";
import BoxWidthGrid from "../../components/BoxWidthGrid";
import Title from "../../components/Title";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/product/eaf";
import QuantumProduct from "../../components/product/QuantumProduct";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {body_ms18} from "../../styles/globalStyleVars";
import {motion} from "framer-motion";
import {PageAnimation} from "../../components/PageAnimation";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = (props) => {


    const getData = useSelector(state => state.eafReducer)
    const dispatch = useDispatch()
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '14',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    // data refactor

    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "product-quantam-banner");

    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;

    //gph-quantum-1stsection
    const firstSectionData = getData?.data?.sections?.find(f => f?.page_data?.slug === "gph-quantum-1stsection");

    // the-story
    const theStoryData = getData?.data?.sections?.find(f => f?.page_data?.slug === "the-story");
    const theStoryImage = theStoryData?.images?.list[0]?.full_path;
    const theStorySubtitle = theStoryData?.page_data?.subtitle;
    const theStoryDescription = theStoryData?.page_data?.description;

    // green-factory
    const greenFactoryData = getData?.data?.sections?.find(f => f?.page_data?.slug === "green-factory-posts");
    const greenFactorytitle = greenFactoryData?.page_data?.subtitle;
    const greenFactoryShortDesc = greenFactoryData?.page_data?.short_desc;

    //why-gph-best
    const whyBestData = getData?.data?.sections?.find(f => f?.page_data?.slug === "why-gph-best");
    const whyBestImage = whyBestData?.images?.list[0]?.full_path;
    const whyBestSubtitle = whyBestData?.page_data?.subtitle;

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
                    title={`${getData?.data?.page_data?.meta_key !== '' ? getData?.data?.page_data?.meta_key : 'Quantum-EAF'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}


                <InnerBanner title={bannerTitle} img={bannerImageSrc} subtitle={bannerSubtitle}
                             des={bannerDescription}/>

                <QuantumProduct getFirstSectionData={firstSectionData}/>

                <div className="section_first pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle col={12} text={theStorySubtitle}/>
                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage BgHeight={6} img={theStoryImage} text_one={theStoryDescription}/>

                </div>
                <div className="section_second pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Title margin="0 0 60px" text={greenFactorytitle}/>
                                <SubTitle
                                    text={greenFactoryShortDesc}/>

                            </Col>

                        </Row>
                    </Container>


                    {
                        greenFactoryData?.posts?.list?.map((data, index) => {
                            if (index % 2 == 0) {
                                return (
                                    <TextWithImageProduct key={data?.data?.id} paddingfull title={data?.data?.subtitle}
                                                          background={data?.data?.background_section_post}
                                                          BgHeight={6} img={data?.images[0]?.full_path}
                                                          text_one={data?.data?.short_desc}/>
                                )
                            } else {
                                return (
                                    <TextWithImageProduct reverse key={data?.data?.id} paddingfull
                                                          title={data?.data?.subtitle}
                                                          background={data?.data?.background_section_post}
                                                          BgHeight={6} img={data?.images[0]?.full_path}
                                                          text_one={data?.data?.short_desc}/>
                                )
                            }
                        })}
                </div>

                <BoxWidthGrid bg_img={whyBestImage} text={whyBestSubtitle}
                              whyPostData={whyBestData}

                />

            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #E9E9E9;
  }

  .about_image_with_text {
    margin: 0;
    position: relative;

  }
  .quantum__content__icon{
    h4{
      font-size: 18px !important;
      line-height: 24px !important;
      @media(min-width:  1500px){
        font-size: 20px !important;
        line-height: 30px !important;
      }
    }
  }
  .section_second {
    background: #FFFFFF;
    .about_image_with_text {
      margin: 0;
      position: relative;

      &:nth-of-type(2){
        .left_col{
          &:after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background-image: url(${pinkbg});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            filter: blur(50px);
          }
          h2,p{
            position: relative;
            z-index: 2;
          }
        }
      }
      &:nth-of-type(3){
        .left_col{
          &:after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background-image: url(${yell});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            filter: blur(50px);
          }
          h2,p{
            position: relative;
            z-index: 2;
          }
        }
      }
      &:nth-of-type(4){
        .left_col{
          &:after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background-image: url(${blue});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            filter: blur(50px);
          }
          h2,p{
            position: relative;
            z-index: 2;
          }
        }
      }
      &:nth-of-type(5){
        .left_col{
          &:after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background-image: url(${greenbg});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            filter: blur(50px);
          }
          h2,p{
            position: relative;
            z-index: 2;
          }
        }
      }
      &:nth-of-type(6){
        .left_col{
          &:after{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background-image: url(${gray});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            filter: blur(50px);
          }
          h2,p{
            position: relative;
            z-index: 2;
          }
        }
      }

     
    }
  }

  .right_col_image_wrapper {
    padding-top: calc(500 / 470 * 100%) !important;
    @media (max-width: 1200px) and (min-width: 768px) {
      height: 100%;
    }
  }
  @media(max-width: 767px){
    .quantum__content__icon div{
      max-width: 100% !important;
    }
  }
`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req}) => {
            const isServer = !req.url.startsWith("/_next");

            if (isServer) {
                let param = {
                    [ApiParamKey.page_id]: '14',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "quantum-eaf",
                },
            };
        }
);

export default MyComponent;
