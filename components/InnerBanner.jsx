import {Img} from "./Img";
import React from "react";
import styled from "styled-components";
import {body_ms16} from "../styles/globalStyleVars";
import {Container, Row, Col} from "react-bootstrap";
import {ParallaxBanner, ParallaxBannerLayer, useParallax} from "react-scroll-parallax";
import ReactHtmlParser from "react-html-parser";

const InnerBanner = ({title, img, subtitle, des}) => {

    return (
        <StyledInnerBanner className="InnerBanner">


            <ParallaxBanner id="hero-banner"
                            className="InnerBanner__parallax"

            >
                <ParallaxBannerLayer
                    expanded={false}
                    translateY={[0, 50]}
                    shouldAlwaysCompleteAnimation={true}
                    shouldDisableScalingTranslations={true}

                >
                    <Img src={img} alt=""/>
                    <Container>
                        <Row>
                            <Col md={8}>
                                <h1>{ReactHtmlParser(title)}</h1>

                                <p className="subtitle">{ReactHtmlParser(subtitle)}</p>

                                <p>{ReactHtmlParser(des)}</p>

                            </Col>
                        </Row>
                    </Container>
                </ParallaxBannerLayer>

            </ParallaxBanner>
        </StyledInnerBanner>
    );
};

const StyledInnerBanner = styled.section`
  position: relative;


  .global-image:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    z-index: 1;

  }

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
    z-index: 3;
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
    font-size: 50px;
    font-weight: 600;
    line-height: 65px;
    margin: 0 0 20px;
    text-transform: uppercase;

    @media (min-width: 1500px) {
      font-size: 70px;
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


`;

export default InnerBanner;
