import React, {useState} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from 'react-bootstrap';
import {Img} from "./Img";
import {body_ms18, title_ms24, title_ms40} from "../styles/globalStyleVars";
import ReactHtmlParser from 'react-html-parser';
import Title from "./Title";
import Link from "./Link";
import Popup from './Popup';

const TextWithImage = ({
                           variation,
                           text_one,
                           img,
                           double_link,
                           getData,
                           background,
                           reverse,
                           text_two,
                           padding,
                           link,
                           title,
                           rnd,
                           popup_data,
                           qualityTestData,
                           pdf
                       }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    if (variation == 'one') {
        return (

            <StyledTextWithImage background={background} className='m-0 about_text_grid fade-up'>
                <Container>
                    <Row className='fade-up'>
                        {ReactHtmlParser(text_one)}
                    </Row>
                </Container>
            </StyledTextWithImage>
        );
    } else {
        return (
            <StyledTextWithImage background={background}
                                 className={`about_image_with_text fade-up ${padding ? 'pt-150 pb-150 m-0' : ''}`}>
                <Container>
                    <Row className={` ${reverse ? 'flex-row-reverse' : ''}`}>

                        {
                            (() => {
                                if (img) {
                                    return (
                                        <Col
                                            md={rnd ? {span: 6, offset: 1} : reverse ? {span: 5, offset: 1} : {span: 6}}
                                            className='left_col'>
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
                                                        if (text_one) {
                                                            return (
                                                                <div onClick={handleShow}>
                                                                    <Link link="javascript:void(0)" className="mt-40"
                                                                          text="Learn More"/>

                                                                </div>
                                                            )
                                                        }

                                                    } else if (double_link) {
                                                        return (
                                                            <div className="d-flex button_wrap">
                                                                <div className="button_div" onClick={handleShow}>
                                                                    <Link link="javascript:void(0)" text="Learn More"/>
                                                                </div>
                                                                <div className="button_div">
                                                                    <Link hoverColor="#EE1B24"
                                                                          link={`${pdf}`}
                                                                          text="Download Report"
                                                                          target={'_blank'}
                                                                         
                                                                    >

                                                                    </Link>

                                                                    {/*<Link hoverColor="#EE1B24" link="javascript:void(0)"*/}
                                                                    {/*      text="Download Report"/>*/}
                                                                </div>
                                                            </div>

                                                        )
                                                    } else {

                                                    }
                                                })()
                                            }
                                        </Col>
                                    )
                                } else {
                                    return (
                                        <Col md={12}
                                             className='left_col'>
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
                                                        if (text_one) {
                                                            return (
                                                                <div onClick={handleShow}>
                                                                    <Link link="javascript:void(0)" className="mt-40"
                                                                          text="Learn More"/>

                                                                </div>
                                                            )
                                                        }

                                                    } else if (double_link) {
                                                        return (
                                                            <div className="d-flex button_wrap">
                                                                <div className="button_div" onClick={handleShow}>
                                                                    <Link link="javascript:void(0)" text="Learn More"/>

                                                                </div>
                                                                <div className="button_div" onClick={handleShow}>
                                                                    <Link hoverColor="#EE1B24" link="javascript:void(0)"
                                                                          text="Download Report"/>

                                                                </div>
                                                            </div>

                                                        )
                                                    } else {

                                                    }
                                                })()
                                            }
                                        </Col>
                                    )
                                }
                            })()
                        }
                        {
                            (() => {
                                if (img) {
                                    return (
                                        <Col md={rnd ? {span: 5} : reverse ? {span: 6} : {span: 5, offset: 1}}
                                             className='right_col'>
                                            <div className='right_col_image_wrapper'>
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
                <Popup show={show} item={popup_data} handleClose={handleClose}/>

            </StyledTextWithImage>

        );
    }
};


const StyledTextWithImage = styled.div`
  margin-bottom: 60px;
  background: ${props => props.background || '#E9E9E9'};

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
      padding-left: 15px;
      @media (max-width: 767px) {
        padding-left: 15px;

      }
    }

    .right_col {
      padding-left: 15px;

      .right_col_image_wrapper {
        position: relative;
        padding-top: calc(350 / 570 * 100%);
      }
    }
  }

  .left_col {
    p {
      font-weight: 400;

      ${body_ms18}
      span {
        color: #FB030C;
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
      }

      b {
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
      }
    }
  }

  .right_col {
    padding-left: 15px;
    @media (max-width: 767px) {
      padding-left: 15px;

    }

    p {
      font-weight: 400;

      ${body_ms18}
      span {
        color: #FB030C;
        font-size: 18px;
        //font-size: 20px;
        font-weight: 500;
        line-height: 30px;
      }

      b {
        font-size: 18px;
        font-weight: 500;
        line-height: 30px;
      }
    }

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

  .director_message {
    .right_col {
      padding-left: 100px;
    }

    .right_col_image_wrapper {
      position: relative;
      padding-top: calc(550 / 470 * 100%);
    }
  }


  @media (max-width: 767px) {
    .flex-row-reverse {
      flex-direction: column-reverse !important;
    }

    .row {
      flex-direction: column-reverse;

      .right_col {
        .right_col_image_wrapper {
          margin-bottom: 40px;
        }
      }
    }

    .director_message {
      .right_col {
        padding-left: 15px;
      }

    }
  }

  .button_wrap {
    margin-top: 40px;

    .button_div {
      position: relative;

      &:first-child {
        padding-right: 20px;

        &:after {
          width: 2px;
          height: calc(100% - 3px);
          background: #DDDDDD;
          position: absolute;
          right: 0;
          content: "";
          top: 5px;
          bottom: 0;
          margin: auto 0;
        }
      }

      &:last-child {
        padding-left: 20px;

        .dc-link {
          a {
            color: #EE1B24;
          }
        }
      }

      .dc-link {
        margin: 0;
      }
    }
  }
`;


export default TextWithImage;
