import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextWithImage from "../../components/TextWithImage";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/career/hr-policy";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {motion} from "framer-motion";
import {PageAnimation} from "../../components/PageAnimation";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);

const MyComponent = (props) => {

    const getData = useSelector(state => state.hrpolicyReducer)

    // data refactor


    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "hr-banner");

    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;

    // first section
    const firstSectionData = getData?.data?.sections?.find(f => f?.page_data?.slug === "first-section");
    const firstSectionImage = firstSectionData?.images?.list[0]?.full_path;
    const firstSectionSubtitle = firstSectionData?.page_data?.subtitle;
    const firstSectionDescription = firstSectionData?.page_data?.description;


    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '29',
                [ApiParamKey.get_section]: 'true'
            }

            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])


    // animation
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
                    title={`${getData?.data?.page_data?.meta_key !== '' ? getData?.data?.page_data?.meta_key : 'hr-policy'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannerTitle} img={bannerImageSrc}
                             subtitle={bannerSubtitle} des={bannerDescription}/>

                <div className="first_section pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle
                                    text={firstSectionSubtitle}/>
                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage background="#E9E9E9" img={firstSectionImage}
                                   text_one={firstSectionDescription}/>

                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .first_section {
    background: #E9E9E9;

    .about_image_with_text {
      margin: 0;
      ul.list{
        li{
          &:last-child{
            margin: 0;
          }
        }
        &:last-child{
          margin: 0;
        }
      }
    }
    .right_col_image_wrapper{
      padding-top: calc(500 / 470 * 100%);
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '29',
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
// fsfjlsf
//
export default MyComponent;
