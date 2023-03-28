import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/smarter_future/energyBanner.jpg";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import TextWithImage from "../../components/TextWithImage";
import smart from "../../public/images/dynamic/about/energy_smart_pic.jpg";
import TextList from "../../components/TextList";
import Title from "../../components/Title";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/smarterFuture/energy-consumption";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {motion} from "framer-motion";
import {PageAnimation} from "../../components/PageAnimation";
import {ParallaxBanner, ParallaxBannerLayer} from "react-scroll-parallax";
import {Img} from "../../components/Img";
import ReactHtmlParser from "react-html-parser";
import {body_ms16} from "../../styles/globalStyleVars";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = (props) => {

    const getData = useSelector(state => state.energyReducer)

    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "energy-banner");
    const bannerImageSrc = bannerSec?.images?.list[0]?.full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannerDesc = bannerSec?.page_data?.description;
    const bannertitle = bannerSec?.page_data?.subtitle;


    const integrationSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "the-integration");
    const integrationshortdes = integrationSec?.page_data?.short_desc;
    const integrationpostdes = integrationSec?.posts?.list[0]?.data?.description;
    const integrationpostimage = integrationSec?.posts?.list[0]?.images[0]?.full_path;

    const zeroSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "use-of-zero");
    const zerodes = zeroSec?.page_data?.description;
    const zeroshortdesc = zeroSec?.page_data?.short_desc;
    const zerotitle = zeroSec?.page_data?.subtitle;

    const factorysec = getData?.data?.sections?.find(f => f?.page_data?.slug === "smart-factory");
    const factorydes = factorysec?.page_data?.description;
    const factoryshortdesc = factorysec?.page_data?.short_desc;
    const factorytitle = factorysec?.page_data?.subtitle;

    const posts = factorysec?.posts?.list[0];
    const factorypostTitle = posts?.data?.subtitle;
    const factorypostDesc = posts?.data?.description;
    const seo = getData?.data;

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '61',
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
                    title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Energy Consumption Milestone & Lower Carbon Footprint'} | GPH Ispat`}
                    description={seo?.page_data?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <div className="InnerBanner">
                    <ParallaxBanner id="hero-banner"
                                    className="InnerBanner__parallax"

                    >
                        <ParallaxBannerLayer
                            expanded={false}
                            translateY={[0, 50]}
                            shouldAlwaysCompleteAnimation={true}
                            shouldDisableScalingTranslations={true}

                        >
                            <Img src={bannerImageSrc} alt=""  />
                            <Container >
                                <Row >
                                    <Col md={12}>
                                        <h1>{ReactHtmlParser(bannertitle)}</h1>

                                        <p className="subtitle">{ReactHtmlParser(bannershortdesc)}</p>

                                        <p>{ReactHtmlParser(bannerDesc)}</p>

                                    </Col>
                                </Row>
                            </Container>
                        </ParallaxBannerLayer>

                    </ParallaxBanner>

                </div>


                <section className="pt-150 pb-150 first_section">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle text={integrationshortdes}/>
                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage background="#E9E9E9" text_one={integrationpostdes} img={integrationpostimage}/>


                </section>
                <section className="pb-150 pt-150 second_section">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Title margin="0 0 60px" text={zerotitle}/>
                                <SubTitle text={zeroshortdesc}/>

                            </Col>
                            <TextList text={zerodes}/>

                        </Row>
                    </Container>
                </section>
                <section className="third_section pb-150 pt-150">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Title margin="0 0 60px" text={factorytitle}/>
                                <SubTitle text={factoryshortdesc}/>

                            </Col>
                            <TextList text={factorydes}/>
                            <Col md={12}>
                                <SubTitle margin="60px 0" text={factorypostTitle}/>

                            </Col>
                            <TextList text={factorypostDesc}/>
                        </Row>
                    </Container>
                </section>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .InnerBanner{
    position: relative;

    .InnerBanner__parallax {
      padding-top: 70vh;
      position: relative;
      @media (min-width: 1550px) {
        padding-top: 60vh;
      }
      @media (max-width: 767px) {
        //padding-top: 0;
        padding-top: calc(450 / 414 * 100%);
      }
    }

    .container {
      position: absolute;
      //height: 100%;
      //top: 0;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 60px;
      z-index: 2;
    }

    h1 {
      left: 15px;
      color: #ffffff;
      z-index: 2;
      margin: 0 0 20px;
      ${body_ms16}
      span {
        font-weight: 600;
        color: #ffffff;
      }
    }

    .subtitle {
      font-size: 60px;
      font-weight: 600;
      line-height: 65px;
      margin: 0 0 20px;
      text-transform: uppercase;

      @media (min-width: 1500px) {
        font-size: 80px;
        line-height: 80px;
      }
      @media (max-width: 767px) {
        font-size: 36px;
        line-height: 40px;
        display: block;
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      margin: 0;
      color: #ffffff;
      @media (max-width: 767px) {
        display: none;
      }
    }

  }
  
  
  .first_section{
    background: #E9E9E9;
    p{
      font-weight: 500;
    }
    .about_image_with_text{
      margin: 0;
    }
  }
  .list{
    margin: 40px 0 0;
  }
  .second_section{
    background: #F9F9F9;
  }
  .plain_text{
    margin: 0;
    p{
      &:last-child{
        margin: 0;
      }
    }
  }
  .third_section{
    background: #E9E9E9;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '61',
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
