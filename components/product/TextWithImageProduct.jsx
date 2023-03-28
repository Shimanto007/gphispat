import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {Img} from "../Img";
import {body_ms18, title_ms24, title_ms40} from "../../styles/globalStyleVars";
import ReactHtmlParser from 'react-html-parser';
import Title from "../Title";
import Link from "../Link";
import {Code} from "react-content-loader";
import Popup from '../Popup';

const TextWithImageProduct = ({text_one, img, background, reverse, padding, link, title}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <StyledTextWithImage background={background}
                             className={`about_image_with_text ${padding ? 'pt-150 pb-150 m-0' : ''}`}>
            <Container>
                <Row className={` ${reverse ? 'flex-row-reverse' : ''}`}>
                    <Col md={7} className='left_col fade-up'>
                        {
                            (() => {
                                if (title) {
                                    return (
                                        <Title margin="0 0 60px"
                                               text={title ? title : 'New product <br> development'}/>

                                    )
                                } else {

                                }
                            })()
                        }
                        <p>{ReactHtmlParser(text_one)}</p>
                        {
                            (() => {
                                if (link) {
                                    return (
                                        <div onClick={handleShow}>
                                            <Link link="javascript:void(0)" className="mt-40" text="Learn More"/>

                                        </div>
                                    )
                                } else {

                                }
                            })()
                        }
                    </Col>
                    {
                        (() => {
                            if (img) {
                                return (
                                    <Col md={5} className='right_col'>
                                        <div className='right_col_image_wrapper fade-up'>
                                            <Img src={img} alt=""/>
                                        </div>
                                    </Col>
                                )
                            } else {

                            }
                        })()
                    }
                </Row>

            </Container>
            <Popup show={show} handleClose={handleClose}/>

        </StyledTextWithImage>

    );
};


const StyledTextWithImage = styled.div`
  margin-bottom: 60px;

  .title {
    font-weight: 600;
    color: #222222;
    ${title_ms40}
  }

  .dc-link {
    margin-top: 40px;
  }

  .flex-row-reverse {
    .left_col {
      @media (max-width: 767px) {
        padding: 0 15px;


      }
    }

    .right_col {

      .right_col_image_wrapper {
        position: relative;
        padding-top: calc(350 / 570 * 100%);
      }

      @media (max-width: 767px) {
        padding-left: 15px;

      }
    }
  }

  .left_col {
    background: ${props => props.background || '#E9E9E9'};

    padding: 80px 60px;
    @media (max-width: 767px) {
      padding: 0 15px;
    }

    p {
      font-weight: 400;

      ${body_ms18}
      span {
        color: #FB030C;
      }

      b {
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
      }
    }
  }

  .right_col {
    padding: 0;
 
    .right_col_image_wrapper {
      position: relative;
      padding-top: calc(600 / 530 * 100%);

      svg {
        position: absolute;
        top: -50px;
        right: -20px;
        @media (max-width: 767px) {

          top: -40px;
          right: -20px;
          height: 60px;

        }
      }

      .content {
        background: linear-gradient(120deg, rgba(173, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 100%);
        position: absolute;
        z-index: 1;
        left: -30px;
        bottom: 30px;
        padding: 30px;
        width: 100%;

        h5 {
          font-weight: 600;
          margin: 0 0 10px;
          color: #FFFFFF;
          ${title_ms24}
        }

        p {
          font-weight: 400;
          color: #FFFFFF;
          ${body_ms18}
        }

        @media (max-width: 767px) {
          left: 0;
          bottom: 0;
          padding: 20px 30px;
        }
      }
    }

    &.default_padding {
      padding-left: 15px;
    }


  }



  @media (max-width: 767px) {
    .title {
      margin: 0 0 40px;
    }

    .flex-row-reverse {
      flex-direction: column-reverse !important;
    }

    .container {
      padding: 0;
    }

    .row {
      flex-direction: column-reverse;
      margin: 0 15px;

      .right_col {
        padding: 0;

        .right_col_image_wrapper {
        }
      }

      .left_col {
        padding: 40px 15px;
        margin: 0;

      }
    }

  
  }
`;


export default TextWithImageProduct;
