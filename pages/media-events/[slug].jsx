import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import Button from "../../components/Button";
import {body_ms18, gradientColor, title_ms30} from "../../styles/globalStyleVars";
import InnerBanner from "../../components/InnerBanner";
import media_details from "../../public/images/dynamic/about/media_details.jpg"
import {Img} from "../../components/Img";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/mediaEvents/newsEvents/detail";
import {fetchDatas} from "../api/redux/mediaEvents/pressRelease/detail";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import {NextSeo} from "next-seo";
import press from "../../components/Press";
import {motion} from "framer-motion";
import {PageAnimation} from "../../components/PageAnimation";
import {Loader} from "../../components/loader";

const MyComponent = (props) => {
    const router = useRouter();
    const dispatch = useDispatch()

    const press = router?.query?.press;

    const newsPageData = useSelector(state => state.newsEventsDetailReducer);
    const bannerImage = newsPageData?.data?.images?.list?.find(f => f?.is_banner === 'on');
    const seoData = newsPageData?.data?.page_data;

    let [shareUrl, setShareUrl] = useState('')

    let shareButtonClickM = useRef()
    let shareButtonContentM = useRef()


    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_slug]: router?.query.slug,
            }
            let api_services = ApiServices.GET_PAGE_BY_PAGE_SLUG;
            dispatch(fetchData([api_services, param]))
            dispatch(fetchDatas([api_services, param]))

        }
    }, [props.isServer, router])


    useEffect(() => {
        setShareUrl(window.location.href)
    }, [shareUrl])

    useEffect(() => {
        shareButtonClickM.current.addEventListener('click', () => {
            shareButtonContentM.current.classList.toggle('open')
        })

        window.addEventListener('click', (e) => {
            if (shareButtonContentM?.current?.classList.contains('open')) {
                if (!e.target.matches('.social-vertical, .social-vertical img')) {
                    shareButtonContentM?.current.classList.remove('open')
                }
            }

        })


    }, [shareButtonContentM])

    return (
        <>
            <StyledComponent>
                <NextSeo
                    title={seoData?.meta_key !== '' ? seoData?.meta_key + ' | GPH Ispat Limited' : seoData?.title + ' | GPH Ispat Limited'}
                    description={seoData?.meta_description !== '' ? seoData?.meta_description : ''}
                    canonical={router.pathname}
                    openGraph={{
                        url: router.pathname,
                        title: seoData?.meta_description !== '' ? seoData?.meta_description : seoData?.title,
                        description: seoData?.meta_description !== '' ? seoData?.meta_description : '',
                        type: 'website',
                        images: [
                            {
                                url: "",
                                width: 1280,
                                height: 720,
                                alt: 'GPH Ispat Limited',
                                type: 'image/jpeg',
                            }
                        ],
                        site_name: 'GPH Ispat Limited',
                    }}

                />
                {newsPageData?.loading && <Loader/>}

                <Container>
                    <Row>
                        <Col md={12} className="">
                            <div className="gph_no_icon_btn media_head">
                                <div>
                                    {
                                        press === 'true' ?
                                            <Button src={'/media-events/press-release'} text="Back to Press"
                                            />
                                            : <Button src={'/media-events/news-events'} text="Back to News"
                                            />

                                    }
                                </div>
                                <p>{moment(newsPageData?.data?.page_data?.year, 'DD/MM/YYYY').format('DD MMMM YYYY')}</p>
                                <h3>{ReactHtmlParser(newsPageData?.data?.page_data?.subtitle)}</h3>
                                <div className="banner_image">
                                    <Img src={bannerImage?.full_path}/>
                                </div>
                            </div>
                            <div className="media_content">
                                <h3>{ReactHtmlParser(newsPageData?.data?.page_data?.short_desc)}</h3>
                                {ReactHtmlParser(newsPageData?.data?.page_data?.description)}
                            </div>
                        </Col>

                        <Col md={12}>
                            <div className="social-vertical" ref={shareButtonClickM}>
                                <p>Share now:</p>
                                <div className="social-lists" ref={shareButtonContentM}>
                                    <FacebookShareButton url={shareUrl}><FacebookIcon size={32}
                                                                                      round={true}/></FacebookShareButton>
                                    <LinkedinShareButton url={shareUrl}><LinkedinIcon size={32}
                                                                                      round={true}/></LinkedinShareButton>
                                    <TwitterShareButton url={shareUrl}><TwitterIcon size={32}
                                                                                    round={true}/></TwitterShareButton>

                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </StyledComponent>
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, query}) => {

        let param = {
            [ApiParamKey.page_slug]: query.slug,
        }
        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            let api_services = ApiServices.GET_PAGE_BY_PAGE_SLUG;

            if (press) {
                await store.dispatch(fetchData([api_services, param]))
            } else {
                await store.dispatch(fetchDatas([api_services, param]))

            }

        }
        return {
            props: {
                isServer,
                title: "about",
            },
        };
    }
)

const StyledComponent = styled.section`
  background: #F9F9F9;
  padding: 190px 0 100px;

  .gph_no_icon_btn {
    .dc-btn {
      svg {
        display: none;
      }

      a {
        gap: 0;
        justify-content: center;
        border-color: #222222;
      }
    }
  }

  h3 {
    ${title_ms30};
    color: #222222;
    font-weight: 500;
    margin: 0 0 60px;
    @media (max-width: 767px) {
      margin: 0 0 40px;

    }
  }

  p {
    ${body_ms18};
    font-weight: 500;
    color: #222222;
  }

  .media_head {
    p {
      font-size: 12px;
      line-height: 18px;
      font-weight: 500;
      color: #FB030C;
      margin: 40px 0 20px;

    }

    .banner_image {
      position: relative;
      padding-top: calc(550 / 1170 * 100%);
      margin-bottom: 60px;
    }
  }

  .social-vertical {
    display: flex;
    margin: 60px 0 0;

    p {
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      margin: 0 10px 0 0;
    }

    .social-lists {
      button {
        margin-right: 15px;
        position: relative;

        svg {
          position: relative;
          z-index: 2;

          circle {
            fill: transparent;
          }

          path {
            fill: #222222;
            transition: 0.7s all ease;
            transition-delay: 0.2s;
          }
        }

        &:last-child {
          margin: 0;
        }


        &:after {
          content: '';
          position: absolute;
          height: 0;
          width: 0;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          background-image: ${gradientColor};
          transition: all .5s ease;
          border-radius: 19px;
        }

        &:hover {
          &:after {
            height: 100%;
            width: 100%;
          }

          svg {
            position: relative;
            z-index: 2;

            path {
              fill: #ffffff;
            }
          }
        }
      }
    }
  }
`;

export default MyComponent;
