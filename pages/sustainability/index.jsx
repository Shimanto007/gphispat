import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/about/subbanner.jpg";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../../components/Title";
import SubTitle from "../../components/SubTitle";
import TextList from "../../components/TextList";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/sustainability/gphSustainability";
import {useDispatch, useSelector} from "react-redux";
import {NextSeo} from "next-seo";
import Link from "next/link";

// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import DcLink from "../../components/Link";
import Button from "../../components/Button";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = (props) => {

    const getData = useSelector(state => state.gphsustainabilityReducer)

    const dispatch = useDispatch()
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '54',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    const gphFile = getData?.data?.sections?.find(f => f?.page_data?.slug === "gph-details");
    const file = gphFile?.files?.list?.[0]?.full_path


    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "gph-banner");
    const bannerImageSrc = bannerSec?.images?.list[0].full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannertitle = bannerSec?.page_data?.subtitle;
    const bannerdesc = bannerSec?.page_data?.description;


    const gphdetailsec = getData?.data?.sections?.find(f => f?.page_data?.slug === "gph-details");
    const gphdetailtitle = gphdetailsec?.page_data?.subtitle;
    const gphdetaildesc = gphdetailsec?.page_data?.description;
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
                    title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'GPH Sustainability'} | GPH Ispat`}
                    description={seo?.page_data?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannershortdesc} img={bannerImageSrc} subtitle={bannertitle} des={bannerdesc}/>
                <section className="pb-150 pt-150 second_section">
                    <Container>
                        <Row>
                            <Col md={12}>
                                <SubTitle text={gphdetailtitle}/>
                            </Col>
                            <TextList text={gphdetaildesc}/>
                            <div className={'col-md-12 mt-50'}>
                                <Link href={`${file}`}>
                                    <DcLink target="_blank" link={`${file}`} text={'Download'}/>
                                </Link>
                            </div>
                        </Row>
                    </Container>
                </section>

            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .mt-50{
    margin-top: 50px;
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
    (store) =>
        async ({req}) => {
            const isServer = !req.url.startsWith("/_next");

            if (isServer) {
                let param = {
                    [ApiParamKey.page_id]: '54',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "sustainability",
                },
            };
        }
);
export default MyComponent;
