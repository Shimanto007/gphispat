import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextWithImage from "../../components/TextWithImage";
import Title from "../../components/Title";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/product/service";
import {NextSeo} from "next-seo";
import {useDispatch, useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {body_ms16} from "../../styles/globalStyleVars";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = (props) => {
    const getData = useSelector(state => state.serviceReducer)
    const dispatch = useDispatch()
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '105',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    // data refactor

    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "product-service-banner");
    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;
// technical-support
    const technicalData = getData?.data?.sections?.find(f => f?.page_data?.slug === "technical-support");
    const technicalSubtitle = technicalData?.page_data?.subtitle;
    const technicalShortDes = technicalData?.page_data?.short_desc;
    const technicalDescription = technicalData?.page_data?.description;
//quality-tests
    const qualityTestData = getData?.data?.sections?.find(f => f?.page_data?.slug === "quality-tests");
    const qualityTesttitle = qualityTestData?.page_data?.subtitle;
    const qualityTestShortDes = qualityTestData?.page_data?.short_desc;


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
            <StyledComponent>
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key !== '' ? getData?.data?.page_data?.meta_key : 'Product-Service'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannerTitle} img={bannerImageSrc} subtitle={bannerSubtitle} des={bannerDescription}/>
                <div className="section_first pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Title margin="0 0 40px" col={12} text={technicalSubtitle}/>
                                <SubTitle text={technicalShortDes}/>

                            </Col>
                            <Col md={9} className='fade-up'>
                                {ReactHtmlParser(technicalDescription)}

                            </Col>
                        </Row>
                    </Container>

                </div>
                <div className="section_second pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Title margin="0 0 40px" col={12} text={qualityTesttitle}/>
                                <SubTitle text={qualityTestShortDes}/>
                            </Col>
                        </Row>
                    </Container>

                    {
                        qualityTestData && qualityTestData?.posts?.list.length > 0 && qualityTestData?.posts?.list?.map((data, index) => {
                                if (index % 2 != 0) {
                                    return (

                                        <TextWithImage popup_data={qualityTestData?.posts?.list?.[index]} reverse rnd background={data?.data?.background}
                                                       img={data?.images[0].full_path} title={data?.data?.title}
                                                       text_one={data?.data?.description}
                                                       key={data?.data?.id}

                                        />
                                    )
                                } else {
                                    return (
                                        <TextWithImage popup_data={qualityTestData?.posts?.list?.[index]} background={data?.data?.background}
                                                       img={data?.images[0].full_path} title={data?.data?.title}
                                                       text_one={data?.data?.description}
                                                       key={data?.data?.id}

                                        />


                                    )
                                }
                            }
                        )}
                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #FFFFFF;
  }

  .about_image_with_text {
    margin: 0 0 120px;
    //&:nth-of-type(odd){
    //  .container{
    //    .row{
    //      flex-direction: column-reverse;
    //      .right_col{
    //        margin: 0;
    //        flex: 0 0 41.666667%;
    //        max-width: 41.666667%;
    //      }
    //      .left_col{
    //        margin-left: 8.333333%;
    //        flex: 0 0 41.666667%;
    //        max-width: 41.666667%;
    //      }
    //    }
    //  }
    ////}
    &:last-child{
      margin: 0;
    }
  }

  .section_second {
    background: #E9E9E9;
  }

  .right_col_image_wrapper {
    padding-top: calc(500 / 470 * 100%) !important;
    @media (max-width: 1200px) and (min-width: 768px) {
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
                    [ApiParamKey.page_id]: '105',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "product-services",
                },
            };
        }
);


export default MyComponent;
