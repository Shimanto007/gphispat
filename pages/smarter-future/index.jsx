import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/about/smart_fitness.jpg";
import smart from "../../public/images/dynamic/about/smart.jpg";
import SubTitle from "../../components/SubTitle";
import {Col, Container, Row} from "react-bootstrap";
import TextWithImage from "../../components/TextWithImage";
import TextList from "../../components/TextList";
import Title from "../../components/Title";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {fetchData} from "../api/redux/smarterFuture/smarterFuture";
import {ApiParamKey} from "../api/network/ApiParamKey";
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

    const getData = useSelector(state => state.smartFutureReducer)

    // data refactor
    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "smarter-future-banner");
    const bannerImageSrc = bannerImage?.images?.list[0].full_path;
    const bannershortdesc = bannerImage?.page_data?.short_desc;
    const bannertitle = bannerImage?.page_data?.subtitle;
    const bannerdesc = bannerImage?.page_data?.description;


    const governmentsec = getData?.data?.sections?.find(f => f?.page_data?.slug === "both-the-government");
    const governshortdesc = governmentsec?.page_data?.short_desc;
    const governdescription = governmentsec?.page_data?.description;

    const posts = governmentsec?.posts?.list[0];
    const postsdesc = posts?.data.description;
    const postsimage = posts?.images[0]?.full_path;


    const digitalsec = getData?.data?.sections?.find(f => f?.page_data?.slug === "digital-transformation");
    const digitaltitle = digitalsec?.page_data?.subtitle;
    const digitalshortdes = digitalsec?.page_data?.short_desc;
    const digitaldesc = digitalsec?.page_data?.description;
    const seo = getData?.data;


    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '21',
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
                    title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Smarter Future'} | GPH Ispat`}
                    description={seo?.page_data?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannertitle} img={bannerImageSrc} subtitle={bannershortdesc} des={bannerdesc}/>
                <section className="pt-150 pb-150 first_section">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle text={governshortdesc}/>
                            </Col>
                        </Row>
                    </Container>
                    <TextWithImage background="#E9E9E9" text_one={postsdesc} img={postsimage}/>
                    <Container>
                        <Row>
                            <TextList text={governdescription}/>
                        </Row>
                    </Container>

                </section>
                <section className="pb-150 pt-150 second_section">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Title margin="0 0 60px" text={digitaltitle}/>
                                <SubTitle
                                    text={digitalshortdes}/>

                            </Col>
                            <TextList text={digitaldesc}/>

                        </Row>
                    </Container>
                </section>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .first_section {
    background: #E9E9E9;

    p {
      font-weight: 500;
    }

    .about_image_with_text {

    }
  }
  
  .right_col_image_wrapper{
    padding-top: calc(600 / 530 * 100%);
  }

  .second_section {
    background: #F9F9F9;
  }

  .plain_text {
    margin: 0;

    p {
      &:last-child {
        margin: 0;
      }
    }
  }
`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '21',
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
