import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Title from "../Title";
import Button from "../Button";
import {Img} from "../Img";
import Banner from '../../public/images/dynamic/home/sustain.jpg';
import {body_ms14, body_ms16, gradientColor, title_ms24} from "../../styles/globalStyleVars";
import DcLink from "../Link";
import img1 from '../../public/images/dynamic/home/sustain1.jpg';
import fixedbg from '../../public/images/static/shadow.svg';
import img2 from '../../public/images/dynamic/home/sustain2.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from "react-slick";
import ReactHtmlParser from "react-html-parser";
import quantumLogo from "../../public/images/static/quantum.png";
import quantumLogo_mobile from "../../public/images/dynamic/sustrain.jpg";

const MyComponent = ({data}) => {
    let containerRef = useRef();

    let [padding, setpadding] = useState('')
    // change the image src from here only for mobile
    let desktop_image = null;
    {
        data?.images?.list?.length > 0 && data?.images?.list?.map(item => (
            desktop_image = data?.images?.list[0]?.full_path
        ))
    }
    let [image, setImage] = useState(desktop_image)

    useEffect(() => {


        let Window_Width = window.innerWidth;

        if (Window_Width < 767) {
            setImage(quantumLogo_mobile)
        }
    }, []);



    useEffect(() => {
        setpadding(containerRef.current?.offsetLeft)

        window.addEventListener('resize', () => {
            setpadding(containerRef.current?.offsetLeft)

            document.querySelector('.slick-slide:first-child .sustainability-text-box__single__text').style.left = padding;

        })

    }, [])

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        speed: 900,
        autoplaySpeed: 5500,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,

                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <>
            <StyledComponent  className='sustainability-text pt-180 pb-100'>
                <Img src={image}/>
                <Container >
                    <Row>
                        <Col ref={containerRef} sm={5}>
                            <Title margin={'0 0 40px 0'} text={data?.page_data?.subtitle}/>
                            <p className={'fade-up'}>{data?.page_data?.short_desc}</p>
                            <Button margin={'40px 0 0 0'} text={'Explore'} src={'/sustainability'}/>
                        </Col>
                    </Row>
                </Container>
            </StyledComponent>

            <StyledTextBox padding={padding} className='sustainability-text-box'>
                <Container fluid className='p-0 fade-up'>
                    {/*<Row>*/}
                    {
                        data?.posts?.list && data?.posts?.list?.length > 0 &&
                        <Slick {...sliderSettings} >
                            {
                                data?.posts?.list?.map((item, index) => {
                                    if (index % 2 == 0) {
                                        return (
                                            <div key={item?.data?.id}>
                                                <div className="sustainability-text-box__single">
                                                    <Img src={item?.images?.[0]?.full_path}/>

                                                    <div className="sustainability-text-box__single__text">
                                                        <h4>{item?.data?.subtitle}</h4>
                                                        <p>{item?.data?.short_desc}</p>
                                                        <DcLink text={'Learn More'} color={'#FFF'}
                                                                link={'/sustainability/economic'}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={item?.data?.id}>
                                                <div className="sustainability-text-box__single gph-anim">
                                                    <div className="sustainability-text-box__single__text">
                                                        <h4>{item?.data?.subtitle}</h4>
                                                        <p>{item?.data?.short_desc}</p>
                                                        <DcLink text={'Learn More'} color={'#FFF'}
                                                                link={item?.images?.[0]?.short_title}/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </Slick>
                    }
                    {/*</Row>*/}
                </Container>
            </StyledTextBox>
        </>


    );
};

const StyledComponent = styled.section`
  position: relative;

  p {
    ${body_ms16};
    width: 80%;
  }

  @media (min-width: 1550px) {
    //padding-top: 50;
    padding-bottom: 200px !important;
    .global-image {
    }
  }

  @media (max-width: 991px) {
    .col-sm-5 {
      min-width: 60%;
    }

    p {
      width: 100%;
    }
  }

  @media (max-width: 767px) {
    .col-sm-5 {
      min-width: 100%;
    }
  }
`;

const StyledTextBox = styled.section`
  @keyframes backgroundfade {
    0% {
      background-position: 0%;
      opacity: 1;
    }
    50% {
      background-position: -20%;
      opacity: 0.8;
    }
    75% {
      background-position: -70%;
      opacity: 0.7;
    }
    to {
      background-position: 0%;
      opacity: 1;
    }
  }

  .slick-slide {
    position: relative;
    
    &:first-child{
      .sustainability-text-box__single__text{
        left: ${props => props.padding ? props.padding+15+'px' : ''};
      }
    }
  }

  .gph-anim.sustainability-text-box__single {
    background: ${gradientColor};
    transition: all .6s cubic-bezier(.5, .05, .1, .3);
    position: relative;

    &:after {
      content: "";
      transition: all .6s cubic-bezier(.5, .05, .1, .3);
      background-image: url(${fixedbg});
      animation: backgroundfade 6s cubic-bezier(.5, .5, .1, .3) infinite;
      background-size: cover;
      z-index: 1;
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 50%;
    }
  }

  overflow: hidden;
  margin: 0 0 -7px;

  .sustainability-text-box__single {
    padding-top: calc(450 / 468 * 100%);
    position: relative;
    overflow: hidden;

    img {
      transition: transform 1.4s ease;
      transform: scale(1.01);
    }

    &__text {
      position: absolute;
      top: 60px;
      left: 40px;
      bottom: 40px;
      right: 70px;
      z-index: 2;

      h4 {
        ${title_ms24};
        font-weight: 600;
        margin-bottom: 30px;
        color: #ffffff;
      }

      p {
        ${body_ms14};
        margin-bottom: 40px;
        color: #ffffff;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    &:hover {
      img {
        transform: scale(1.04);
      }
    }


  }


  //.slick-slider{
  //  margin: 0 0 -7px;
  //}
  @media (max-width: 1000px) {
    .sustainability-text-box__single__text {
      right: 40px;

      p {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  @media (max-width: 767px) {
    .sustainability-text-box__single__text {
      left: 30px;
      right: 30px;
    }
  }
  @media (max-width: 600px) {
    .slick-list {
      //margin: 0 100px 0 0px;
      //padding-right: 50px !important;
      margin-right: 30px;
      overflow: visible;
    }

    .sustainability-text-box__single__text {
      left: 15px;
      right: 20px;
    }
  }
`;

export default MyComponent;
