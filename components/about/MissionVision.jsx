import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from 'react-bootstrap';
import {body_ms18, gradient, title_ms30, title_ms60} from "../../styles/globalStyleVars";
import Title from "../Title";
import {Img} from "../Img";
import ReactHtmlParser from "react-html-parser";
import reburimg from '../../public/images/dynamic/about/Rebar.png'

const MissionVision = ({bgColor, title, missionVissionList, missionVissionTextImg}) => {
    const [BgHeight, setBgHeight] = useState(false);
    const ref = useRef(null);
    const refMinus = useRef(null);

    useEffect(() => {
        let height = refMinus.current.offsetHeight / 2;
        height = ref.current.offsetHeight - height;

        if (window.innerWidth < 767) {
            setBgHeight(height - 80);

        } else {
            setBgHeight(height - 150);

        }


    }, []);

    return (
        <StyledMissionVision ref={ref} BgHeight={BgHeight}>
            <Container>
                <Row ref={refMinus}>
                    {
                        missionVissionList && missionVissionList?.length > 0 &&
                        missionVissionList?.map((element) => {
                            return (
                                <Col className="mission_vision_single fade-up" md={6} key={element?.data?.id}>
                                    <div className="content_wrapper">
                                        <h3>{element?.data?.subtitle}</h3>
                                        <p>{element?.data?.short_desc}</p>

                                    </div>
                                </Col>
                            );
                        })}
                </Row>
                <Row>
                    <div className="our_values">
                        <Col md={12}>
                            <Title className='title' margin="0 0 40px" text="Value"/>
                        </Col>

                    </div>

                    <div className="d-flex values">
                        <Col md={6}>
                            <div className="content_wrapper fade-up">
                                {ReactHtmlParser(missionVissionTextImg?.page_data?.description)}

                            </div>
                        </Col>
                        <Col md={6} className="values__image fade-up">
                            <div className="image_wrapper Loader">
                                <Img src={missionVissionTextImg?.images?.list[0]?.full_path}/>

                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </StyledMissionVision>
    );
};

const StyledMissionVision = styled.section`
  background: #F9F9F9;
  padding: 150px 0;
  position: relative;
  @media (max-width: 767px) {
    padding: 80px 0;

  }

  &:after {
    background: ${props => props.bgColor ? props.bgColor : '#E9E9E9'};
    content: "";
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
    position: absolute;
    height: ${props => props.BgHeight}px;
    @media (max-width: 767px) {
      //height:100%;
      //top: 0;
      //bottom: -10px;
    }
  }

  .content_wrapper {
    //background:linear-gradient(140deg, rgba(173,0,0,1) 0%, rgba(255,0,0,1) 100%);
    ${gradient};
    padding: 100px 60px 75px;
    height: 100%;

    h3 {
      color: #FFFFFF;
      font-weight: 600;
      margin: 0 0 40px;
      text-transform: uppercase;
      ${title_ms30}
    }

    p {
      font-weight: 500;
      color: #FFFFFF;
      ${body_ms18}
    }
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .our_values {
    margin: 100px 0 0;

    .title {
      h2 {
        color: #222222;
        font-weight: 600;
        margin: 0 0 60px;
        ${title_ms60}
      }
    }
  }

  .values {
    width: 100%;

    .content_wrapper {
      background: transparent;
      padding: 0;
    }


    .image_wrapper {
      position: relative;
      padding-top: calc(500 / 500 * 100%);

      @media (min-width: 1550px) {
        padding-top: 50% !important;
        width: 100%;
      }
    }

    &__image {
      padding-left: 70px;
      @media (min-width: 1550px) {
        display: flex;
        
      }
      @media(max-width: 767px){
        padding-left: 15px;
        margin-bottom: 40px;
      }
    }

    p {
      color: #222222;
      font-size: 20px;
      font-weight: 500;
      line-height: 30px;
      margin: 0 0 60px;
      @media (max-width: 767px) {
        margin: 0px 0 40px;


      }
    }

    ul {
      padding-left: 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 0 0 60px;

      li {

        position: relative;
        counter-increment: count;
        padding: 0 0px 20px 0px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        margin: 0 0 30px;
        display: block;
        width: 100%;
        font-weight: 500;
        line-height: 27px;
        span {
          color: #FB030C;
          font-size: 27px;
        }
        ${body_ms18}

        &:last-child{
          margin-bottom: 0;
        }
      }

      @media (max-width: 767px) {
        margin: 0 0 40px;
        &:last-child {
          margin-bottom: 0;
        }
        li {
          flex: 0 0 100%;

          &:last-child {
            margin-bottom: 0;
          }
        }

      }
    }
  }


  @media (max-width: 767px) {
    .content_wrapper {
      padding: 60px 20px;
    }

    .mission_vision_single {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .values {
      flex-direction: column-reverse;

      .image_wrapper {
        padding-top: calc(350 / 375 * 100%);
     
      }
    }
  }
`;

export default MissionVision;
