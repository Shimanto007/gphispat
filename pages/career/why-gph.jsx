import React, {useEffect} from 'react';
import styled from "styled-components";
import TextWithImage from "../../components/TextWithImage";
import InnerBanner from "../../components/InnerBanner";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/career/why-gph";
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

    const getData = useSelector(state => state.whygphReducer)

    // data refactor

    //banner section
    const bannerData = getData?.data?.sections?.find(f => f?.page_data?.slug === "why-banner");

    const bannerImageSrc = bannerData?.images?.list[0]?.full_path;
    const bannerTitle = bannerData?.page_data?.short_desc;
    const bannerSubtitle = bannerData?.page_data?.subtitle;
    const bannerDescription = bannerData?.page_data?.description;
    // post section

    const postData = getData?.data?.sections?.find(f => f?.page_data?.slug === "why-posts");

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '22',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
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

            <StyledComponent className="why_gph_career ">

                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key !== '' ? getData?.data?.page_data?.meta_key : 'why-gph'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}

                <InnerBanner title={bannerTitle} img={bannerImageSrc}
                             subtitle={bannerSubtitle} des={bannerDescription}/>

                <div className="section_first pt-150 pb-150">
                    {
                        postData?.posts?.list?.map((data, index) => {
                            if (index % 2 == 0) {
                                return (
                                    <TextWithImage background={data?.data?.background} key={data?.data?.id}
                                                   img={data?.images[0].full_path}
                                                   title={data?.data?.title}
                                                   text_one={data?.data?.description}/>
                                )
                            } else {
                                return (
                                    <TextWithImage reverse rnd background={data?.data?.background} key={data?.data?.id}
                                                   img={data?.images[0].full_path}
                                                   title={data?.data?.title}
                                                   text_one={data?.data?.description}/>
                                )
                            }
                        })}
                </div>

            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  .section_first {
    background: #E9E9E9;

    .about_image_with_text {
      margin-bottom: 120px;

      .right_col_image_wrapper {
        padding-top: calc(500 / 470 * 100%) !important;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '22',
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
