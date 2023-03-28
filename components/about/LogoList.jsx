import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import image from '../../public/images/dynamic/about/gph-power.png'
import Title from "../Title";
import ReactHtmlParser from "react-html-parser";

const LogoList = (title) => {
    return (
        <StyledMissionVision >
            <Container>
                <Row>
                    <Col md={12}>
                        <Title margin="0 0 40px" text={ReactHtmlParser(title)}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="sister_concern_logo_list__single_item_wrapper">
                            <div className="image_wrapper">
                                <img src={image} alt=""/>
                            </div>
                            <p>GPH Power Generation Limited</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledMissionVision>
    );
};

const StyledMissionVision = styled.div

;

export default LogoList;


