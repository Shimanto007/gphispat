import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from "react-bootstrap";
import Title from "./Title";
import Box from "./Box";

const BoxWidthGrid = ({style, text, titletable, bg_img, whyPostData}) => {
    titletable = "Why Gph quantum technology best in Making Construction Steel";

    return (

        <StyledBoxWidthGrid bg_img={bg_img} className={`gph_box_width_grid pt-150 pb-120 fade-up`}>
            <Container>
                <Row>
                    <Col md={12}>
                        <Title margin="0 0 60px" color="#FFFFFF"
                               text="Why Gph quantum technology best in Making Construction Steel"/>

                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    {
                        whyPostData?.posts?.list?.map((data, index) => (
                            <Col md={4} className="single_box">
                                <Box text={data?.data?.short_desc} learn_more={whyPostData?.posts?.list?.[index]}
                                     title={data?.data?.subtitle}/>
                            </Col>
                        ))
                    }
                </Row>
            </Container>

        </StyledBoxWidthGrid>

    )
};


const StyledBoxWidthGrid = styled.div`
  background-image: url("${props => props.bg_img}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .single_box {
    margin: 0 0 30px;
  }

  @media (max-width: 767px) {
    .title {
      margin-bottom: 40px;
    }
  }
`;


export default BoxWidthGrid;














