import React, {useEffect} from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {ParallaxProvider} from "react-scroll-parallax";
import ContactAddress from "../../components/contact/ContactAddress";
import InnerBanner from "../../components/InnerBanner";
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from "../../public/images/dynamic/about/banner.jpg";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {fetchContact} from "../api/redux/contact/index";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {Loader} from "../../components/loader";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";
import {fetchData} from "../api/redux/about/advisory-panel";
import {useRouter} from "next/router";

gsap.registerPlugin(ScrollTrigger);


const ContactPage = (props) => {
    const getData = useSelector(state => state.contactReducer)

    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "contact-banner");
    const contactTopInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "contact-top");
    const contactBottomInfo = getData?.data?.sections?.find(f => f?.page_data?.slug === "contact-bottom");

    const dispatch = useDispatch()
    const router = useRouter();


    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '131',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchContact([api_services, param]))
        }
    }, [props.isServer, router])


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

            <NextSeo
                title={`${getData?.data?.page_data?.meta_key !== '' ? getData?.data?.page_data?.meta_key : 'Contact Us'} | GPH Ispat`}
                description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
            />
            <StyledComponent>
                {getData.loading && <Loader/>}
                <ParallaxProvider>
                    <ToastContainer position="top-right" autoClose={4000} closeOnClick hideProgressBar={true}/>
                    <InnerBanner title={bannerImage?.page_data?.short_desc}
                                 img={bannerImage?.images?.list[0]?.full_path}
                                 subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
                    <ContactAddress contactTopInfo={contactTopInfo} contactBottomInfo={contactBottomInfo}/>
                </ParallaxProvider>
            </StyledComponent>
        </>
    );
};
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '131',
            [ApiParamKey.get_section]: 'true'
        }
        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            let api_services = ApiServices.SECTIONS;
            await store.dispatch(fetchContact([api_services, param]))
        }
        return {
            props: {
                isServer,
                title: "about",
            },
        };
    })


const StyledComponent = styled.section`

    .addressBox{
      .title{
        margin: 0 0 20px;
      }
    }
`;

export default ContactPage;
