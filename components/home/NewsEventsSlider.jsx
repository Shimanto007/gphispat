import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../Title";
import 'swiper/css/swiper.min.css';
import Swiper from 'react-id-swiper';
import NewsEvents from "../NewsEvents";
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';
import img3 from "../../public/images/dynamic/news&events/event3.jpg";


import {text} from "../../styles/globalStyleVars";
import Button from "../Button";

const MyComponent = ({data}) => {

    let leftRef = useRef();
    let leftRefM = useRef();
    let rightRef = useRef();
    let rightRefM = useRef();
    let mLeftRef = useRef();
    let mRightRef = useRef();
    let containerRef = useRef();
    let sliderRef2 = useRef();

    let [offset, setOffset] = useState(90)
    let [theWidth, SetTheWidth] = useState(0)
    let [activeNumber, setActiveNumber] = useState(1)
    let [totalNumber, setTotalNumber] = useState(1)
    let [innerWidth, setInnerWidth] = useState(0)


    let navigation = true;

    useEffect(() => {
        setOffset(containerRef.current?.offsetLeft)
        setInnerWidth(window.innerWidth)
        window.addEventListener('resize', () => {
            setOffset(containerRef.current?.offsetLeft)
            SetTheWidth(window.innerWidth)
        })

        if ((sliderRef2.current?.swiper.slideNext() == false) && (sliderRef2.current?.swiper.slidePrev() == false)) {
            setActiveNumber(0)
        }
    }, [sliderRef2])


    // slider setting
    let sliderParams = {
        slidesPerView: 1, spaceBetween: 20, // observer: true,
        loop: false,
        // autoplay: {
        //     delay: 5000, // disableOnInteraction: true,
        //     autoplay: false
        // },
        autoplay: false,
        pagination: true,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            1099: {
                spaceBetween: 30, slidesPerView: 3,
            }, 768: {
                spaceBetween: 30, slidesPerView: 2,
            }, 600: {
                spaceBetween: 30, slidesPerView: 1,
            }

        },

    };


    // slider next prev action

    const NewsgoNext = () => {
        if (sliderRef2.current && sliderRef2.current.swiper) {

            sliderRef2.current.swiper.slideNext()
            if (sliderRef2.current.swiper.slideNext() == false) {
                document.getElementById('new_go_next').classList.add('disabled');
                document.getElementById('new_go_next_mobile').classList.add('disabled');
                document.getElementById('new_go_prev').classList.remove('disabled');
                document.getElementById('new_go_prev_mobile').classList.remove('disabled');
            } else {
                document.getElementById('new_go_prev').classList.remove('disabled');
                document.getElementById('new_go_prev_mobile').classList.remove('disabled');
            }

        }
    };

    const NewsgoPrev = () => {
        if (sliderRef2.current && sliderRef2.current.swiper) {

            sliderRef2.current.swiper.slidePrev()
            if (sliderRef2.current.swiper.slidePrev() == false) {
                document.getElementById('new_go_prev').classList.add('disabled');

                document.getElementById('new_go_prev_mobile').classList.add('disabled');
                document.getElementById('new_go_next').classList.remove('disabled');
                document.getElementById('new_go_next_mobile').classList.remove('disabled');

            } else {
                document.getElementById('new_go_next').classList.remove('disabled');
                document.getElementById('new_go_next_mobile').classList.remove('disabled');


            }

        }
    };


    return (
        <StyledComponent offset={offset} navigation={navigation}
                         className='media-event-slider asNewsOnly pt-150 pb-150'>

            <Container ref={containerRef}>
                <Row>
                    <Col>
                        <Title margin={'0 0 40px 0'} text={'News & Events'}/>

                        {
                            (() => {
                                if (activeNumber == 0) {

                                } else {
                                    return (
                                        <div className="slider-nav top">
                                            <ul>
                                                <li className={'hover disabled'} id={'new_go_prev'}
                                                    onClick={NewsgoPrev}><BsChevronLeft/></li>
                                                <li className={'hover'} id={'new_go_next'} onClick={NewsgoNext}>
                                                    <BsChevronRight/></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            })()
                        }


                    </Col>
                </Row>


            </Container>

            {data?.list?.length > 0 &&
                <Swiper {...sliderParams} ref={sliderRef2}>
                    {data?.list?.map(item => (
                        <div>
                            <NewsEvents
                                data={item?.page_data} src={item?.images?.list?.[0]?.full_path}/>
                        </div>
                    ))}


                </Swiper>
            }


            <Container className='bottom-button'>
                <Button margin={'30px 0 0 0'} text={'Explore All'} src={'/media-events/news-events'}/>
                {
                    (() => {
                        if (activeNumber == 0) {

                        } else {
                            return (
                                <div className="slider-nav">
                                    <ul>
                                        <li className={'hover disabled'} id={'new_go_prev_mobile'} onClick={NewsgoPrev}>
                                            <BsChevronLeft/></li>
                                        <li className={'hover'} id={'new_go_next_mobile'} onClick={NewsgoNext}>
                                            <BsChevronRight/></li>
                                    </ul>
                                </div>
                            )
                        }
                    })()
                }

            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: #F9F9F9;

  .hover {
    &.disabled {
      background-color: transparent !important;
      border: 1px solid #222222 !important;
      cursor: default;
      opacity: 0.9;

      &:after {
        display: none;
      }

      svg {
        path {
          fill: #222222;
        }
      }
    }

  }

  .slider-nav {
    position: absolute;
    top: 7px;
    right: 15px;

    ul {
      display: flex;
    }

    li {
      height: 50px;
      width: 50px;
      background-color: ${text};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;

      &:nth-of-type(1) {
        margin-right: 20px;
      }

      svg {
        color: #ffffff;
        z-index: 2;
        font-size: 20px;
      }
    }
  }

  @media (min-width: 600px) {
    .swiper-container {
      margin-left: ${props => props.offset + 15}px;
      padding-right: ${props => props.offset + 15}px;
    }
  }


  .bottom-button {
    position: relative;
    @media (min-width: 768px) {
      .slider-nav {
        display: none;
      }
    }

    .slider-nav {
      top: auto;
      bottom: 10px;
      right: 15px;

      li:nth-of-type(1) {
        margin-right: 14px;
      }

      .hover {
        height: 40px;
        width: 40px;

        svg {
          font-size: 17px;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .top {
      display: none;
    }

  }

  @media (max-width: 599px) {
    .swiper-container {
      margin-left: 15px;
      padding-right: 15px;
    }

    .presslist__single__content {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  // @media (max-width: 767px) {
  //   .swiper-container {
    //     padding-right: ${props => props.offset + 20}px;
  //   }
  // }

`;

export default MyComponent;
