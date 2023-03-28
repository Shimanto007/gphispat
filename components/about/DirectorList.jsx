import React, {useState, useRef, useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from 'react-bootstrap';
import {body_ms18, title_ms30, title_ms60} from "../../styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";
import {Img} from "../Img";
import directors_img from "../../public/images/dynamic/about/ma.jpg";
import chairman from "../../public/images/dynamic/about/aa.jpg";
import md from "../../public/images/dynamic/about/ah.jpg";
import Title from "../Title";
import Button from 'react-bootstrap/Button';
import Popup from '../Popup';


const DirectorList = ({title, bgColor, background_color, content_color, auditCommitteeList}) => {


    const [show, setShow] = useState(false);
    const [BgHeight, setBgHeight] = useState();
    const [item, setItem] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setShow(true);
        setItem(item);
    }

    const ref = useRef();

    useEffect(() => {
        setBgHeight(ref?.current?.offsetHeight + 149);
    }, [bgColor, BgHeight]);

    return (
        <StyledDirectorList BgHeight={BgHeight} content_color={content_color} background_color={background_color}
                            bgColor={bgColor} className='directors_list_section pt-150 pb-120'>
            <Container>
                <Row>
                    <Col md={12}>
                        <Title margin="0 0 40px" text={ReactHtmlParser(title)}/>
                    </Col>
                </Row>
                <Row>

                    {
                        auditCommitteeList && auditCommitteeList?.length > 0 &&
                        auditCommitteeList?.map((element) => {
                            return (
                                <Col md={4} className='fade-up'>
                                    <div onClick={() => handleShow(element)} className="directors_single">
                                        <div className="directors_single__img_wrapper">
                                            <Img src={element?.images?.[0].full_path} alt=""/>
                                        </div>
                                        <div ref={ref} className="directors_single__content">
                                            <p>{element?.data?.short_desc}</p>
                                            <h3>{element?.data?.subtitle}</h3>
                                        </div>
                                    </div>

                                </Col>
                            );
                        })}
                </Row>
            </Container>
            <Popup auditCommitteeList={auditCommitteeList} show={show} item={item} handleClose={handleClose}/>
        </StyledDirectorList>

    );
};


const StyledDirectorList = styled.div`
  background: ${props => props.background_color ? props.background_color : '#FFFFFF'};
  position: relative;
  @media (max-width: 767px) {
    .container {
      overflow: unset;
    }
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
      height: 100%;
      top: 0;
    }
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .directors_single {
    cursor: pointer;
    margin: 0 0 30px;

    &__img_wrapper {
      position: relative;
      padding-top: calc(350 / 370 * 100%);
      overflow: hidden;

      img {
        transition: 0.7s all ease;
        transform: scale(1.01);
      }
    }

    &__content {
      background: ${props => props.content_color ? props.content_color : '#F9F9F9'};
      padding: 30px;

      p {
        color: #FB030C;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        margin: 0 0 15px;
        @media(min-width: 1500px ){
          font-size: 14px;
        }
      }

      h3 {
        transition: 0.7s all ease;
        color: #222222;
        margin: 0;
        font-weight: 500;
        min-height: 55px;
        ${body_ms18}
      }
    }

    &:hover {
      .directors_single__img_wrapper {
        img {
          transform: scale(1.04);

        }
      }

      .directors_single__content {
        h3 {
          color: #FB030C;
        }
      }
    }
  }
`;


export default DirectorList;
