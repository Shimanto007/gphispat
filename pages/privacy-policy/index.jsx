import React, {useEffect} from 'react';
import styled from "styled-components";
import InnerBanner from "../../components/InnerBanner";
import NewsEvents from "../../components/media-events/NewsEvents";
import BannerImage from "../../public/images/dynamic/career/available-jobs.jpg";
import {motion} from "framer-motion";
import {PageAnimation} from "../../components/PageAnimation";
import {ParallaxProvider} from "react-scroll-parallax";
import VideoList from "../../components/media-events/VideoList";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../../components/Title";
import ReactHtmlParser from "react-html-parser";
import {useDispatch, useSelector} from "react-redux";
import {text, title_ms30} from "../../styles/globalStyleVars";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {fetchData} from "../api/redux/privacy-policy/index";
import title from "../../components/Title";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";

const MyComponent = (props) => {
    const getData = useSelector(state => state.privacyPolicyReducer)


    const dispatch = useDispatch()
    const router = useRouter();


    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '252',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])



    return (
        <>

            <StyledComponent>
                {getData?.loading && <Loader/>}
                <InnerBanner img={getData?.data?.images?.list?.[0]?.full_path}
                             subtitle={getData?.data?.page_data?.subtitle}/>
                <Container>
                    <Row>
                        <Col md={12} className="">
                            <div className="privacy_content">
                                {/*<h3>{ReactHtmlParser(newsPageData?.data?.page_data?.short_desc)}</h3>*/}
                                {ReactHtmlParser(getData?.data?.page_data?.description)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  

  .media_head {
    p {
      font-size: 12px;
      line-height: 18px;
      font-weight: 500;
      color: #FB030C;
      margin: 40px 0 20px;
    }


  }
  .privacy_content{
    h3{
      margin: 0px;
      color: ${text};
      font-weight: 600;
      font-size: 30px;
      position: relative;
      width: 100%;
      font-family: ${title};
      text-transform: uppercase;
      margin-bottom: 30px;
    }
    b {
      font-size: 18px;
      font-weight: 500;
      line-height: 30px;
    }
    span {
      a{
        color: #FB030C !important;
        //font-size: 18px;
        //font-weight: 500;
        //line-height: 30px;
      }      
    }
    padding-top: 100px;
    @media (max-width: 767px) {
      padding-top: 80px;
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let api_services = ApiServices.SECTIONS;
        let param = {
            [ApiParamKey.page_id]: '252',
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
