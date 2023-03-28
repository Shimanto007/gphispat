import React from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {Img} from "../Img";
import {body_ms18, title_ms24} from "../../styles/globalStyleVars";
import ReactHtmlParser from 'react-html-parser';
import TextList from "../TextList";

const DirectorMessage = ({
                             bgColor,
                             text_one,
                             des,
                             img,
                             col,
                             reverse,
                             text_two,
                             director_name,
                             designation,
                             profileInfo,
                             padding

                         }) => {

    const profile = profileInfo?.posts?.list[0];
    const profileActivity = profileInfo?.posts?.list[1];

    return (
        <StyledTextWithImage bgColor={bgColor}
                             className={`${reverse ? 'directors_message' : ''} director_message_section ${padding ? padding : 'pt-150 pb-150'}  fade-up`}>
            <Container>
                <Row className={`${reverse ? 'director_message' : ''}`}>
                    <Col md={reverse ? {span: 5, offset: 1} : {span: 6}} className='left_col fade-up'>
                        <p>{ReactHtmlParser(profile?.data?.description)}</p>
                    </Col>
                    <Col md={reverse ? {span: 6} : {span: 5, offset: 1}} className='right_col fade-up'>
                        <div className='right_col_image_wrapper'>
                            <svg width="95.667" height="82" viewBox="0 0 95.667 82">
                                <defs>
                                    <linearGradient id="linear-gradient" x2="0.962" y2="1"
                                                    gradientUnits="objectBoundingBox">
                                        <stop offset="0" stop-color="#ad0000"/>
                                        <stop offset="1" stop-color="red"/>
                                    </linearGradient>
                                </defs>
                                <path id="blockquote-symbol"
                                      d="M94.085,82V42.852H76.164L95.667,0H75.11L53.236,39.942V82ZM40.849,82V42.852H22.928L42.431,0H21.874L0,39.942V82Z"
                                      fill="url(#linear-gradient)"/>
                            </svg>

                            <Img src={profile?.images[0]?.full_path} alt=""/>

                            <div className="content">
                                <h5>{ReactHtmlParser(profile?.data?.subtitle)}</h5>
                                <p>{ReactHtmlParser(profile?.data?.short_desc)}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='text_list'>
                        <TextList text={profileActivity?.data?.description}/>
                    </div>
                </Row>
            </Container>

        </StyledTextWithImage>
    );
};


const StyledTextWithImage = styled.div`
  background: ${props => props.bgColor || '#E9E9E9'};


  .left_col {
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
    padding-left: 15px;
    @media (max-width: 767px) {
      padding-left: 15px;

    }

    .right_col_image_wrapper {
      position: relative;
      padding-top: calc(550 / 470 * 100%);

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
      padding-left: 15px;
    }

    .right_col_image_wrapper {
      position: relative;
      padding-top: calc(550 / 470 * 100%);

      svg {
        position: absolute;
        top: -50px;
        left: -20px;
        @media (max-width: 767px) {

          top: -40px;
          left: -20px;
          height: 60px;

        }
      }

    }
  }

  .text_list {
    margin-top: 60px;
    ul{
      margin: 0px 0px 30px;
      //li{
      //  :last-child {
      //    margin: 30px 0px 0px;
      //  }
      //  :nth-last-child(2) {
      //    
      //  }
      //}
    }
    p{
    :last-child{
      margin: 0px;
    }
      
    }
    @media (max-width: 767px) {
      margin-top: 40px;
    }
  }

  &.directors_message {
    background: #222222;

    p, li {
      color: white;
    }

    ul {
      li {
        border-color: rgba(255, 255, 255, 0.8);
        
      }
    }

    .director_message {
      flex-direction: row-reverse;

      .right_col {
        padding-right: 15px;
        padding-left: 15px;
      }

      .right_col_image_wrapper {
        position: relative;
        padding-top: calc(550 / 470 * 100%);
      }

      .text_list {
        margin-top: 60px;
        @media (max-width: 767px) {
          margin-top: 40px;
        }
      }
    }

  }

  @media (max-width: 767px) {
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

    &.directors_message {
      .director_message {
        flex-direction: column-reverse;

        .right_col {
          padding-right: 15px;
        }
      }
    }
  }
`;


export default DirectorMessage;
