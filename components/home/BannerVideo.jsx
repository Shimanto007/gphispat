import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Poster from '../../public/images/static/video-poster.jpg'
import {hover} from "../../styles/globalStyleVars";
import htmlparser from "react-html-parser";
import Slider from "react-slick";
import {Img} from "../Img";

const MyComponent = ({data}) => {

    const settings = {
        arrows: false,
        dots: false,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 900,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        navigation: false
    };
    return (
        <StyledComponent className='banner-video'>
            {
                data?.images?.list && data?.images?.list?.length > 0 &&
                data?.images?.list?.map((element) => {
                    return (
                        <video loop autoPlay muted poster={element?.is_thumb == 'on' ? element?.full_path : ''}>
                            <source src={element?.full_path} type="video/mp4"/>
                            <source src={element?.full_path} type="video/ogg"/>
                        </video>
                    );
                })}
            <Container>
                <Row>
                    <Col sm={8}>

                        <div className="slider-wrapper">
                            <Slider {...settings}>
                                {data?.posts?.list?.length > 0 &&
                                    data?.posts?.list?.map((item) => (
                                        <h1 key={item?.data?.id}>
                                            {htmlparser(item?.data?.description)}
                                        </h1>
                                    ))}
                            </Slider>
                        </div>

                        <div className="scroll">
                            <a href="#to-here">
                                <span className='circle hover'><svg xmlns="http://www.w3.org/2000/svg" width="9.414"
                                                                    height="13.207"
                                                                    viewBox="0 0 9.414 13.207">
                                    <g id="Group_1235" data-name="Group 1235"
                                       transform="translate(712.207 -337) rotate(90)">
                                        <g id="Group_1234" data-name="Group 1234" transform="translate(337.5 703.5)">
                                            <line id="Line_3" data-name="Line 3" x2="12" transform="translate(0 4)"
                                                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1"/>
                                            <line id="Line_4" data-name="Line 4" x1="4" y1="4" transform="translate(8)"
                                                  fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1"/>
                                            <line id="Line_5" data-name="Line 5" x1="4" y2="4"
                                                  transform="translate(8 4)" fill="none" stroke="#fff"
                                                  stroke-linecap="round" stroke-width="1"/>
                                        </g>
                                    </g>
                                </svg></span>
                                <span className='text'>Scroll down to explore</span>
                            </a>


                        </div>

                    </Col>
                </Row>
            </Container>


        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  height: 100vh;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.50);
    mix-blend-mode: overlay;
  }

  svg {
    position: relative;
    z-index: 2;
    cursor: pointer;

    tspan {
      font-size: 14px;
      line-height: 17px;
      font-weight: 300;
    }
  }

  video {
    object-fit: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
  }


  .container {
    position: relative;
    z-index: 6;
    height: 100vh;

    .row, .col-sm-8 {
      height: 100vh;
    }

    .slider-wrapper{
      position: absolute;
      left: 15px;
      right: 15px;
      bottom: 200px;
      h1 {
        font-size: 60px;
        line-height: 60px;
        font-weight: 300;
        color: #ffffff;
        text-transform: uppercase;

        b {
          font-weight: bold;
        }

        span {
          display: inline-block;

          &::first-letter {
            color: red;
          }
        }
      }
    }

    .scroll {
      position: absolute;
      bottom: 30px;
      left: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 300;

        .hover {
          transition: 0.7s all ease;
        }

        &:hover {
          .hover {
            border: 1px solid #FB030C;

            &:after {
              height: 100%;
              width: 100%;
              opacity: 1;
            }
          }
        }

        .circle {
          height: 40px;
          width: 40px;
          border-radius: 50%;
          border: 1px solid #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .text {
          padding-left: 15px;
          color: #ffffff;
        }
      }


    }

  }


  @media (min-width: 1550px) {
    .container h1 {
      font-size: 80px;
      line-height: 80px;
    }
  }

  @media (max-width: 991px) {
    .container {
      .col-sm-8 {
        min-width: 100%;

        h1 {
          font-size: 80px;
          line-height: 80px;
        }
      }

    }
  }

  @media (max-width: 767px) {
    .container {
      .col-sm-8 {
        min-width: 100%;

        h1 {
          font-size: 32px;
          line-height: 32px;
        }
      }

    }
  }


`;

export default MyComponent;
