import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextWithImage from "../../components/TextWithImage";
import ListWithGrid from "../../components/ListWithGrid";
import Popup from "../../components/Popup";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/product/quality-service";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
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

    const getData = useSelector(state => state.qualityServiceReducer)
    const dispatch = useDispatch()
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '110',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])
    // data refactor

    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "quality-services-banner");
    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;
//Quality test
    const qualityTestData = getData?.data?.sections?.find(f => f?.page_data?.slug === "quality-test");

    const qualityTestSubtitle = qualityTestData?.page_data?.subtitle;
//gph lab
    const labData = getData?.data?.sections?.find(f => f?.page_data?.slug === "lab");

    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    title={`${getData?.data?.page_data?.meta_key !== '' ? getData?.data?.page_data?.meta_key : 'Quality-Service'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannerTitle} img={bannerImageSrc} subtitle={bannerSubtitle}
                             des={bannerDescription}/>
                <div className="section_first pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle text={qualityTestSubtitle}/>
                            </Col>
                        </Row>
                    </Container>

                    <ListWithGrid product_details getQualityTestData={qualityTestData}/>

                </div>
                {
                    labData && labData?.posts?.list.length > 0 && labData?.posts?.list?.map((data, index) => {
                        let pdf = data?.images?.find(f => f?.ext === "pdf");
                        let img = data?.images?.find(f => f?.ext === "jpg");
                        if (index % 2 != 0) {
                            return (

                                <div className="section_second ">
                                    <TextWithImage popup_data={labData?.posts?.list?.[index]} reverse rnd double_link
                                                   background={data?.data?.background_section_post}
                                                   pdf={pdf?.full_path}
                                                   img={img?.full_path}
                                                   title={data?.data?.title}
                                                   text_one={data?.data?.description}
                                                   key={data?.data?.id}
                                                   qualityTestData={qualityTestData}

                                    />

                                </div>
                            )
                        } else {
                            return (
                                (

                                    <div className="section_second ">
                                        <TextWithImage popup_data={labData?.posts?.list?.[index]} double_link
                                                       background={data?.data?.background_section_post}
                                                       pdf={pdf?.full_path}
                                                       img={img?.full_path}
                                                       title={data?.data?.title}
                                                       text_one={data?.data?.description}
                                                       key={data?.data?.id}

                                        />

                                    </div>
                                )
                            )
                        }
                    })}

                <Popup show={show} handleClose={handleClose}/>

            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_third {
    background: #DDDDDD;
  }

  .section_first {
    background: #E9E9E9;

    h3 {
      margin: 0 0 40px;
    }


  }

  .about_image_with_text {
    margin: 0;
    padding: 150px 0;
    @media (max-width: 767px) {
      padding: 80px 0;
    }

    p {
      display: -webkit-box;
      -webkit-line-clamp: 11;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media (min-width: 1550px) {
        -webkit-line-clamp: 14;

      }
    }

  }

  .section_second {
    background: #F9F9F9;

    &:nth-of-type(even) {
      background: #FFFFFF;

    }
  }

  .right_col_image_wrapper {
    padding-top: calc(500 / 470 * 100%) !important;
    @media (max-width: 1200px) and (min-width: 768px) {
      height: 100%;
    }
  }

  .list {
    margin: 0 !important;
  }

  .grid_1 {
    &:last-child {
      margin-bottom: 0;
    }
  }

  .list_with_grid_section {
    li {
      height: auto;
    }

    .wrapper {
      min-height: 100%;
      @media (max-width: 767px) {
        min-height: unset;
      }

      p {
        font-weight: 600;
        font-size: ${body_ms16} !important;
      }
    }
  }
`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req}) => {
            const isServer = !req.url.startsWith("/_next");

            if (isServer) {
                let param = {
                    [ApiParamKey.page_id]: '110',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "quality-services",
                },
            };
        }
);

export default MyComponent;
