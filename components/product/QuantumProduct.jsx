import React, {useEffect} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {Img} from "../Img";
import Title from "../Title";
import TextWithIcon from "../TextWithIcon";
import ReactHtmlParser from "react-html-parser";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import quantumbg from '../../public/images/static/qbg.svg'

gsap.registerPlugin(ScrollTrigger);


const QuantumProduct = ({getFirstSectionData}) => {

    // animation
    ScrollTrigger.refresh()
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
    }, [])

    const firstSectionDes = getFirstSectionData?.page_data?.description;
    return (
        <StyledQuantumProduct className='pt-120 pb-60 quantum fade-up' id={'to-here'}>
            <div className="bg_one">
                <img src={quantumbg} alt=""/>
            </div>
            <Container>
                <Row>
                    <Col sm={{span: 4, offset: 4}}>
                        <div className="quantum__img fade-up">
                            <Img src={getFirstSectionData?.images?.list[0]?.full_path}/>
                        </div>
                    </Col>

                    <Col sm={{span: 6}} className='quantum__content fade-up'>
                        <Title margin={'0 0 60px 0'} text={getFirstSectionData?.page_data?.subtitle}/>
                        <p>{getFirstSectionData?.page_data?.short_desc}</p>


                    </Col>
                    <Col sm={{span: 5, offset: 1}} className='fade-up'>
                        {ReactHtmlParser(firstSectionDes)}
                    </Col>


                    <div className="quantum__content__icon d-flex row m-0 fade-up">
                        {
                            getFirstSectionData?.posts?.list?.map(data => (
                                <Col key={data?.data?.id} sm={3}>
                                    <TextWithIcon title={data?.data?.subtitle} img={data?.images[0].full_path}/>
                                </Col>

                            ))}

                    </div>

                </Row>

            </Container>
        </StyledQuantumProduct>
    );
};

const StyledQuantumProduct = styled.section`
  position: relative;
  overflow: hidden;
  .bg_one{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    img{
      filter: blur(50px);
      object-fit: cover;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
  }
  .quantum__img {
    padding-top: calc(454 / 402 * 100%);
    position: relative;
    margin: 0 0 40px;
  }

  .list {
    margin-top: 40px;
  }

  .quantum__content__icon {
    flex-wrap: wrap;
    width: 100%;
 
    div {
      margin-bottom: 60px ;
      display: flex;
      flex-direction: column;
      max-width: 100%;
      text-align: center;
      justify-content: center;
      align-items: center;

      .text-width-icon {
        margin-bottom: 0px;
      }

      @media (max-width: 992px) {
        margin-bottom: 40px ;
        flex: 0 0 50%;
        max-width: 50%;
        .text-width-icon {
          flex: unset;
          max-width: unset;
        }
      }
    }
  }

  .quantum__content {
    &__icon {
      margin-top: 80px !important;

      .col-sm-4 {
        &:nth-of-type(1) {
          padding-left: 0;
        }
      }
    }
  }

  @media (min-width: 1550px) {
    .quantum__content__icon {
      margin-top: 80px !important;
    }

    .dc-btn {
      margin-top: 60px;
    }
  }

  @media (max-width: 991px) {
    .col-sm-5, .col-sm-6 {
      min-width: 100%;
      margin: 0;
    }
    .quantum__content__icon .col-sm-4 {
      min-width: 50%;

      &:nth-of-type(n+3) {
        display: none;
      }
    }

  }
  @media (max-width: 767px) {
    .quantum__content__icon {
      margin-top: 0px !important;
    }
  }
  
`;

export default QuantumProduct;
