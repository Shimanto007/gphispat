import React from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {Img} from "../Img";
import {body_ms18, title_ms30, title_ms24, title_ms20, body_ms16} from "../../styles/globalStyleVars";
import ReactHtmlParser from 'react-html-parser';
import TextList from "../TextList";
import image from "../../public/images/dynamic/about/gph-power.png";
import eco from "../../public/images/dynamic/about/logo2.png";
import chittagong from "../../public/images/dynamic/about/logothree.jpg";
import jahangir from "../../public/images/dynamic/about/jahangir.png";
import brothers from "../../public/images/dynamic/about/brothers.png";
import crown from "../../public/images/dynamic/about/crown.png";
import Title from "../Title";


const ListWithLogo = ({background, col, title, images}) => {

    return (
        <StyledListWithLogo background={background} className="pt-150 pb-150 logoList">

            <Container>
                <Row>
                    <Col md={12}>
                        <Title margin="0 0 40px" text={ReactHtmlParser(title)}/>
                    </Col>
                </Row>
                <Row>
                    {
                        images && images?.length > 0 &&
                        images?.map((element) => {
                            return (
                                <Col md={col} key={element?.data?.id}>
                                    <div className="logoList__single_item_wrapper fade-up">
                                        <div className="image_wrapper">
                                            <img src={element.full_path} alt=""/>
                                        </div>
                                        <p>{element.short_title}</p>
                                    </div>
                                </Col>
                            );
                        })}

                </Row>
            </Container>
        </StyledListWithLogo>
    );
};


const StyledListWithLogo = styled.section`
  background: ${props => props.background ? props.background : '#FFFFFF'};

  .logoList__single_item_wrapper {
    .image_wrapper {
      padding-top: calc(250 / 370 * 100%);
      background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(233, 233, 233, 1) 100%);
      position: relative;

      img {
        //position: absolute;
        //left: 50%;
        //top: 50%;
        //transform: translate(-50%, -50%);
        //object-fit: contain;
        //height: auto;
        //width: auto;
        position: absolute;
        left: 0;
        top: 0;
        transform: none;
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }

    p {
      margin: 15px 0 0;
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(34, 34, 34, 0.3);
    }

    margin-bottom: 20px;

  }

`;


export default ListWithLogo;


