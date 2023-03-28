import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link';
import bgimg from '../../public/images/dynamic/about/timeline.jpg';
import {Img} from "../Img";
import {body_ms14, body_ms16, gradientColor, title_ms20} from "../../styles/globalStyleVars";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from "react-slick";
import ReactHtmlParser from "react-html-parser";

// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {useSelector} from "react-redux";

gsap.registerPlugin(ScrollTrigger);


const MyComponent = ({timeline}) => {
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    // animation
    ScrollTrigger.refresh()

    const homeData = useSelector(state => state.homeReducer);

    // animation
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
    }, [homeData])


    const sliderSettings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // autoplay: true,
        speed: 500,
        autoplaySpeed: 5500,
        pauseOnHover: false,
    };
    const dotSettings = {
        dots: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        // autoplay: true,
        speed: 1000,
        autoplaySpeed: 5500,
        pauseOnHover: false,
        focusOnSelect: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <StyledComponent className='timeline-slider fade-up'>
            <Img src={bgimg}/>

            <div className="container">
                <Row>
                    <Col sm={7}>
                        <div className="timeline-slider__content">
                            {
                                timeline && timeline?.length > 0 &&

                                <Slick {...sliderSettings} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                                    {
                                        timeline?.map((element) => {
                                            return (
                                                <div className='timeline-slider__content__single'
                                                     key={element?.data?.id}>
                                                    {ReactHtmlParser(element?.data?.description)}
                                                </div>
                                            )
                                        })
                                    }
                                </Slick>
                            }

                        </div>
                    </Col>

                </Row>

                <div className="timeline-slider__dots">
                    <ul>
                        {
                            timeline && timeline?.length > 0 &&

                            <Slick asNavFor={nav1}
                                   ref={(slider2) => setNav2(slider2)}  {...dotSettings}>
                                {
                                    timeline?.map((element) => {
                                        return (
                                            <li><span/><p>{element?.data?.subtitle}</p></li>

                                        )
                                    })
                                }

                            </Slick>
                        }


                    </ul>
                </div>


            </div>

        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  height: 80vh;
  position: relative;
  overflow: hidden;
  @media (min-width: 1024px) {
    height: 90vh;

  }

  .container {
    position: relative;
    height: 100%;
    z-index: 2;
  }

  .timeline-slider__content {
    margin-top: 120px;
    position: relative;
    z-index: 5;

    &__single {
      opacity: 0;
      padding: 40px;
      border: 1px solid #FFF;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(34, 34, 34, 0.1) 100%);
      backdrop-filter: blur(30px) saturate(100%);
      //backdrop-filter: blur(30px) brightness(0) opacity(1) saturate(150%);
      transition: opacity .3s ease;
      transition-delay: .2s;

      ul {
        margin: 0;

        li {
          color: #ffffff;
          ${body_ms14};
          font-weight: 500;
          border-bottom: 1px solid rgba(255, 255, 255, 0.30);
          margin-bottom: 15px;

          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }

          //&:nth-of-type(n+3) {
          //  display: none;
          //}

        }


      }

      @media (min-width: 1550px) {
        padding: 70px 40px;

      }
    }

    .slick-active {
      .timeline-slider__content__single {
        opacity: 1;
        transition-delay: 0s;
      }
    }

  }

  .timeline-slider__dots {
    position: absolute;
    bottom: 60px;
    width: 100%;
    //padding-left: 15px;

    ul {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: 200vw;
        left: -50vw;
        right: 0;
        background-color: #ffffff;
        height: 1px;
        bottom: 21px;
        z-index: -1;
      }

      li {
        position: relative;
        height: 100px;

        span {
          height: 40px;
          width: 40px;
          background-color: #fff;
          display: block;
          border-radius: 50%;
          position: absolute;
          bottom: -5px;
          z-index: 2;
          left: 0;
          right: 0;
          margin: auto;
          cursor: pointer;

          &:after {
            content: '';
            position: absolute;
            height: 10px;
            width: 10px;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background: ${gradientColor};
            border-radius: 50%;
          }
        }

        p {
          ${title_ms20};
          color: #ffffff;
          position: absolute;
          bottom: 38px;
          width: 100%;
          text-align: center;
          transition: all .4s ease-out;
        }
      }

      .slick-current {
        li p {
          font-size: 60px;
          font-weight: 600;
          -webkit-text-stroke: 1px #FFF;
          color: transparent;
          bottom: 50px;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    .col-sm-7 {
      min-width: 70%;
    }
  }

  @media (max-width: 768px) {
    height: 90vh;
    .timeline-slider__content {
      margin-top: 80px;

      //&__single ul li:nth-last-of-type(n+3) {
      //  display: none;
      //}
    }


    .timeline-slider__dots ul {
      .slick-current li p {
        font-size: 45px;
        line-height: 45px;
      }

      li span {
        width: 30px;
        height: 30px;
        bottom: 0;
      }
    }


  }
`;

export default MyComponent;
