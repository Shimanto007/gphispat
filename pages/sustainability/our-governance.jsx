import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import imagebanner from "../../public/images/dynamic/sustainability/governanceBanner.jpg";
import {Col, Container, Row} from "react-bootstrap";
import govern from "../../public/images/dynamic/governance_gph.jpg";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/sustainability/ourGovernance";
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

    const getData = useSelector(state => state.governancesustainabilityReducer)

    const dispatch = useDispatch()
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '59',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    const bannerSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "governance-banner");
    const bannerImageSrc = bannerSec?.images?.list[0].full_path;
    const bannershortdesc = bannerSec?.page_data?.short_desc;
    const bannerdesc = bannerSec?.page_data?.description;
    const bannertitle = bannerSec?.page_data?.subtitle;

    const detailsSec = getData?.data?.sections?.find(f => f?.page_data?.slug === "governance-details");
    const detailsImage = detailsSec?.images?.list[0].full_path;
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
                    title={`${seo?.page_data?.meta_key !== '' ? seo?.page_data?.meta_key : 'Our Governance'} | GPH Ispat`}
                    description={seo?.page_data?.meta_description !== '' ? seo?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannershortdesc} img={bannerImageSrc} subtitle={bannertitle} des={bannerdesc}/>
                <div className="first_section ">
                    <Container fluid className={'p-0 pt-150 pb-150'}>
                        <Row>
                            <Col md={12} className='fade-up'>
                                <img src={detailsImage} alt=""/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  
  .first_section{
    background: linear-gradient(90deg, rgba(233,233,233,1) 0%, rgba(255,255,255,1) 50%, rgba(233,233,233,1) 100%);
    img{
      height: 100%;
      width: 100%;
    }
  }

`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req}) => {
            const isServer = !req.url.startsWith("/_next");

            if (isServer) {
                let param = {
                    [ApiParamKey.page_id]: '59',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "our-governance",
                },
            };
        }
);
export default MyComponent;
