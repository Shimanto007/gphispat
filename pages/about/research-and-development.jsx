import React, {useEffect} from 'react';
import styled from "styled-components";
import TextWithImage from "../../components/TextWithImage";
import ImageOne from "../../public/images/dynamic/about/rndabout.jpg";
import {Container, Row, Col} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextList from "../../components/TextList";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/researchBanner.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import researchdevelopmentReducer, {fetchData} from "../api/redux/about/research-and-development";
import {useDispatch, useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";
import {Img} from "../../components/Img";
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

    ScrollTrigger.refresh()
    const getData = useSelector(state => state.researchdevelopmentReducer)


    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "about-research-development-banner");
    const description = getData?.data?.sections?.find(f => f?.page_data?.slug === "description");
    const textImageList = getData?.data?.sections?.find(f => f?.page_data?.slug === "text-image");

    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '51',
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

            <StyledComponent className="resources_and_dev">
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Research & Development'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>

                <div className="section_first pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle col={12} text={description?.page_data?.short_desc}/>
                            </Col>
                            <TextList text={ReactHtmlParser(description?.page_data?.description)}/>

                        </Row>
                    </Container>

                    {
                        textImageList?.posts?.list && textImageList?.posts?.list?.length>0 &&
                        textImageList?.posts?.list.map((element,index) =>{
                            if(index % 2 == 0){
                                return (
                                    <TextWithImage link popup_data={textImageList?.posts?.list?.[index]}  title={element?.data?.subtitle} background="#E9E9E9" BgHeight={6} img={element?.images[0]?.full_path} text_one={element?.data?.description}/>
                                ) ;
                            }else{
                                return (
                                    <TextWithImage link rnd reverse  popup_data={textImageList?.posts?.list?.[index]} title={element?.data?.subtitle} background="#E9E9E9" BgHeight={6} img={element?.images[0]?.full_path} text_one={element?.data?.description}/>
                                ) ;
                            }
                        })}


                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first{
    background: #E9E9E9;
    .right_col_image_wrapper{
      padding-top: calc(500 / 470 * 100%);
    }
    .flex-row-reverse .right_col .right_col_image_wrapper{
      padding-top: calc(500 / 470 * 100%);

    }
    
    .about_image_with_text{
      margin: 0 0 120px 0;
      p {
        display: -webkit-box;
        -webkit-line-clamp: 9;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @media(min-width: 1550px){
          -webkit-line-clamp: 14;

        }
      }
      &:last-child{
        margin: 0;
      }
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '51',
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
