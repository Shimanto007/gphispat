import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import SubTitle from "../../components/SubTitle";
import ListWithGrid from "../../components/ListWithGrid";
import {body_ms16, gradientColor} from "../../styles/globalStyleVars";
import Button from "../../components/Button";
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
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import ReactHtmlParser from "react-html-parser";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/career/detail";
import {Loader} from "../../components/loader";

const MyComponent = (props) => {
    const getData = useSelector(state => state.careerDetailReducer)


    const seoData = getData?.data?.page_data;

    const router = useRouter();
    const dispatch = useDispatch();
    const {query} = router;


    const joblists = getData?.data?.sections?.find(f => f?.page_data?.slug === "jobs");
    const selectedJobDetail = joblists?.posts?.list?.find(f => f?.data?.slug == query?.job);
    // social
    let [shareUrl, setShareUrl] = useState('')

    let shareButtonClickM = useRef()
    let shareButtonContentM = useRef()

    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_slug]: router?.query?.job,
            }
            let api_services = ApiServices.GET_PAGE_BY_PAGE_SLUG;
            dispatch(fetchData([api_services, param]))

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

            <StyledComponent className="">
                {getData?.loading && <Loader/>}

                <Container>
                    <Row>
                        <Col md={12}>
                            <SubTitle text="Senior Officer - Trade Sales"/>
                            {ReactHtmlParser(getData?.data?.page_data?.description)}
                            <Button text="Apply Online" src={`/career/apply?job=${query?.job}`}/>
                        </Col>
                        <Col md={12}>
                            <div className="social-vertical social" ref={shareButtonClickM}>
                                <p>Share now:</p>
                                <div className="social-lists" ref={shareButtonContentM}>
                                    <FacebookShareButton url={shareUrl}><FacebookIcon size={32}
                                                                                      round={true}/></FacebookShareButton>
                                    <LinkedinShareButton url={shareUrl}><LinkedinIcon size={32}
                                                                                      round={true}/></LinkedinShareButton>
                                    <TwitterShareButton url={shareUrl}><TwitterIcon size={32}
                                                                                    round={true}/></TwitterShareButton>
                                    <EmailShareButton url={shareUrl}><EmailIcon size={32}
                                                                                round={true}></EmailIcon></EmailShareButton>
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
            [ApiParamKey.page_slug]: query.job,
        }
        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            let api_services = ApiServices.GET_PAGE_BY_PAGE_SLUG;
            await store.dispatch(fetchData([api_services, param]))
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
  padding: 190px 0 100px;
  background: #FFFFFF;

  .social {
    margin-top: 64px;
  }

  .subtitle {
    p {
      margin: 0;
    }
  }

  h4 {
    color: rgba(34, 34, 34, 0.5);
    line-height: 30px;
    font-weight: 600;
    margin: ${props => props.title_margin || '0 0 25px'};
    font-size: 20px;
    text-transform: uppercase;
  }

  p {
    margin: 0 0 40px;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -15px 40px;

    li {
      //flex: 0 0 33.333333%;
      padding: 0 15px;
      margin-bottom: 20px;

      .wrapper {
        border-bottom: 1px solid rgba(34, 34, 34, 0.3);
        padding-bottom: 15px;
        height: 100%;

        h4 {
          margin: 0 0 10px;
          font-weight: 500;
          color: #222222;
          ${body_ms16}
        }
      }

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

  @media (max-width: 767px) {
    ul {
      li {
        flex: 0 0 100%;

        &:last-child {
          margin: 0;
        }
      }
    }
  }
`;

export default MyComponent;
