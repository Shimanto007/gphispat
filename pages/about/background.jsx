import React, {useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from 'react-bootstrap';
import TextWithImage from "../../components/TextWithImage";
import SubTitle from "../../components/SubTitle";
import ImageOne from "../../public/images/dynamic/about/image_one.jpg";
import Imagetwo from "../../public/images/dynamic/about/image_two.png";
import InnerBanner from "../../components/InnerBanner";
import BannerImage from "../../public/images/dynamic/about/banner.jpg";
import TimelineSlider from "../../components/about/TimelineSlider";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import backgroundReducer, {fetchData} from "../api/redux/about/background";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {useDispatch, useSelector} from "react-redux";
import {body_ms18} from "../../styles/globalStyleVars";
import {NextSeo} from "next-seo";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from 'framer-motion';
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = ({bgColor},props) => {
    // animation
    ScrollTrigger.refresh()
    const dispatch = useDispatch()
    const getData = useSelector(state => state.backgroundReducer)


    // data refactor
    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "background-banner");

    const description = getData?.data?.sections?.find(f => f?.page_data?.slug === "background-description");

    const text_one = description?.posts?.list?.find(f => f?.data?.id === 3);
    const text_two = description?.posts?.list?.find(f => f?.data?.id === 10);
    const text_three = description?.posts?.list?.find(f => f?.data?.id === 11);

    const timelineData = getData?.data?.sections?.find(f => f?.page_data?.slug === "years-timeline");
    const timeline = timelineData?.posts?.list;

    const router = useRouter();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '8',
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


            <StyledComponent bgColor={bgColor} className="about_background ">
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Background'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
                <div className="wrapper pt-150 pb-150">
                    <Container>
                        <Row>
                            <Col md={12} className={'fade-up'}>
                                <SubTitle col={12} text={description?.page_data?.short_desc}/>
                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage background="#E9E9E9" BgHeight={6} img={text_one?.images[0]?.full_path}
                                   text_one={text_one?.data?.description
                                   }/>
                    <TextWithImage background="#E9E9E9" img={text_two?.images[0]?.full_path}
                                   text_one={text_two?.data?.description} reverse/>
                    <TextWithImage background="#E9E9E9" variation={'one'} text_one={text_three?.data?.description}
                                   text_two={description?.page_data?.short_desc}/>
                </div>
                <TimelineSlider timeline={timeline}/>
            </StyledComponent>
        </>


    );
};

const StyledComponent = styled.section`
  background: ${props => props.bgColor || '#E9E9E9'};
  @media (min-width: 1500px) {
    .flex-row-reverse .right_col .right_col_image_wrapper {
      padding-top: 40% !important;
    }
  }
`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {

        let param = {
            [ApiParamKey.page_id]: '8',
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













