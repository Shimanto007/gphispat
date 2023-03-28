import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextList from "../../components/TextList";
import TextWithImage from "../../components/TextWithImage";
import ImageOne from "../../public/images/dynamic/about/global_rearch.jpg";
import Table from "../../components/Table";
import Box from "../../components/Box";
import {body_ms16, body_ms18, gradient} from "../../styles/globalStyleVars";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/globalsearcgBanner.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import globalreachReducer, {fetchData} from "../api/redux/about/global-reach";
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

    // animation
    ScrollTrigger.refresh()

    const getData = useSelector(state => state.globalreachReducer)

    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "about-global-reach-banner");
    const sectionInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "about-global-reach-description");
    const sectionInfoDetail = sectionInfo?.posts?.list[0];

    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '64',
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

            <StyledComponent>
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Global Reach'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}


                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>

                <div className="section_first pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle col={12} text={sectionInfo?.page_data?.short_desc}/>
                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage BgHeight={6} img={sectionInfoDetail?.images[0]?.full_path}
                                   text_one={sectionInfoDetail?.data?.description}/>

                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first{
    background: #E9E9E9;
  }
  .about_image_with_text{
    &:last-child{
      margin: 0;
    }
  }
  table{
    margin: 25px 0;
    th{
      
      padding: 0 ;
      color: white;
      font-weight: 500;
      text-align: center;
      width: 100%;
      padding: 0;
      display: table-row;
      ${body_ms18};
      ${gradient};
      td{
        border-right: 1px solid #E9E9E9;
        
        &:last-child{
          border-left: 0;
        }
      }
    }
    
    tr{
      &:nth-of-type(odd){
        background:#FFFFFF ;
      }
      &:nth-of-type(even){
        background: #F9F9F9;
      }
      td{
        border-right: 1px solid #E9E9E9;
        padding: 20px 0;
        text-align: center;
        ${body_ms16};
        font-weight: 400;
        &:last-child{
          border-left: 0;
        }
      }
    }
  }
  
  @media(max-width: 767px){
    table{
      display: block;
      overflow-x: scroll;
      
      td{
        min-width: 225px;
        padding: 20px;
      }
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '64',
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
